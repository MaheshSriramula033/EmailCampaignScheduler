const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  recipient: { type: String, required: true },
  status: { type: String, enum: ['success', 'failure'], required: true },
  error: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('EmailLog', emailLogSchema);
