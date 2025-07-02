const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const campaignRoutes = require('./routes/campaignRoutes');
const Campaign = require('./models/campaign');
const EmailLog = require('./models/emailLog');
const cron = require('node-cron');
const sendEmail = require('./utils/sendEmail');

dotenv.config();
const app = express();


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 20000 // 20 seconds instead of 10
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Routes
app.use('/', campaignRoutes);


// Run every minute
cron.schedule('* * * * *', async () => {
  console.log('Checking for pending campaigns...');

  const now = new Date();
  const pendingCampaigns = await Campaign.find({
    scheduledTime: { $lte: now },
    status: 'pending',
  });

  for (const campaign of pendingCampaigns) {
    let allSuccess = true;

    for (const recipient of campaign.recipients) {
        console.log(`📤 Attempting to send email to: ${recipient}`);
      const { success, error } = await sendEmail(
        recipient,
        campaign.title,
        campaign.message
      );

      // Log status for recipient
      await EmailLog.create({
        campaignId: campaign._id,
        recipient,
        status: success ? 'success' : 'failure',
        error: error || '',
      });

      if (!success){
      allSuccess = false;
      console.log(`❌ Failed to send to ${recipient}: ${error}`);
      }
      else {
    console.log(`✅ Sent to ${recipient}`);
  }
    }

    // Update campaign status
    campaign.status = allSuccess ? 'sent' : 'failed';
    await campaign.save();
    console.log(`Campaign "${campaign.title}" sent. Status: ${campaign.status}`);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
