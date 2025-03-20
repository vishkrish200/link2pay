const express = require('express');
const router = express.Router();

const {
  createPaymentLink,
  getPaymentLink,
  getAllPaymentLinks,
  updatePaymentLink,
  deletePaymentLink,
} = require('../controllers/payment.controller');

const {
  validateCreatePaymentLink,
  validateUpdatePaymentLink,
} = require('../utils/validation');

// Create a new payment link
router.post('/', validateCreatePaymentLink, createPaymentLink);

// Get all payment links
router.get('/', getAllPaymentLinks);

// Get a specific payment link by linkId
router.get('/:linkId', getPaymentLink);

// Update a payment link
router.put('/:linkId', validateUpdatePaymentLink, updatePaymentLink);

// Delete a payment link
router.delete('/:linkId', deletePaymentLink);

module.exports = router; 