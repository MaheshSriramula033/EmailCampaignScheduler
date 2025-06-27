const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');
const path = require('path');

// Home page 
router.get('/', (req, res) => {
  res.render('create');
});

// POST /campaigns 
router.post('/campaigns', async (req, res) => {
  const { title, message, recipients, scheduledTime } = req.body;

  try {
    const campaign = new Campaign({
      title,
      message,
      recipients: recipients.split(',').map(email => email.trim()),
      scheduledTime
    });

    await campaign.save();
    res.redirect('/campaigns');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating campaign');
  }
});

// GET /campaigns - List campaigns
router.get('/campaigns', async (req, res) => {
  try {
   const campaigns = await Campaign.find().sort({ scheduledTime: -1 }).lean(); // 👈 ADD .lean()
res.render('list', { campaigns });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading campaigns');
  }
});

module.exports = router;
