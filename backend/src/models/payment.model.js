const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const paymentLinkSchema = new mongoose.Schema({
  linkId: {
    type: String,
    default: () => uuidv4(),
    unique: true,
    required: true,
  },
  walletAddress: {
    type: String,
    required: [true, 'Wallet address is required'],
    trim: true,
  },
  blockchain: {
    type: String,
    required: [true, 'Blockchain is required'],
    enum: ['ethereum', 'bitcoin', 'solana', 'polygon', 'bnb', 'avalanche'],
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    trim: true,
  },
  amount: {
    type: Number,
    required: false, // Optional - can be left for user to decide
  },
  memo: {
    type: String,
    required: false,
    trim: true,
    maxlength: [200, 'Memo cannot be more than 200 characters'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  expiresAt: {
    type: Date,
    required: false,
  },
  createdBy: {
    type: String, // User ID if we implement authentication later
    required: false,
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'disabled'],
    default: 'active',
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the 'updatedAt' field on save
paymentLinkSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('PaymentLink', paymentLinkSchema); 