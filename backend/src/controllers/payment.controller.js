const PaymentLink = require('../models/payment.model');
const { generatePaymentUrl } = require('../utils/url-generator');

/**
 * Create a new payment link
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createPaymentLink = async (req, res) => {
  try {
    const paymentLinkData = { ...req.body };
    
    // Create new payment link
    const newPaymentLink = new PaymentLink(paymentLinkData);
    await newPaymentLink.save();
    
    // Generate payment URL
    const paymentUrl = generatePaymentUrl({
      blockchain: newPaymentLink.blockchain,
      walletAddress: newPaymentLink.walletAddress,
      amount: newPaymentLink.amount,
      currency: newPaymentLink.currency,
      memo: newPaymentLink.memo,
    });
    
    // Return success response
    return res.status(201).json({
      status: 'success',
      message: 'Payment link created successfully',
      data: {
        ...newPaymentLink.toObject(),
        paymentUrl,
      },
    });
  } catch (error) {
    console.error('Error creating payment link:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to create payment link',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * Get a payment link by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPaymentLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    
    // Find the payment link
    const paymentLink = await PaymentLink.findOne({ linkId });
    
    if (!paymentLink) {
      return res.status(404).json({
        status: 'error',
        message: 'Payment link not found',
      });
    }
    
    // Update click count
    paymentLink.clicks += 1;
    await paymentLink.save();
    
    // Generate payment URL
    const paymentUrl = generatePaymentUrl({
      blockchain: paymentLink.blockchain,
      walletAddress: paymentLink.walletAddress,
      amount: paymentLink.amount,
      currency: paymentLink.currency,
      memo: paymentLink.memo,
    });
    
    // Return success response
    return res.status(200).json({
      status: 'success',
      data: {
        ...paymentLink.toObject(),
        paymentUrl,
      },
    });
  } catch (error) {
    console.error('Error fetching payment link:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch payment link',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * Get all payment links
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllPaymentLinks = async (req, res) => {
  try {
    // Find all active payment links
    const paymentLinks = await PaymentLink.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(100); // Limit to 100 records
    
    // Return success response
    return res.status(200).json({
      status: 'success',
      count: paymentLinks.length,
      data: paymentLinks,
    });
  } catch (error) {
    console.error('Error fetching payment links:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch payment links',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * Update a payment link
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updatePaymentLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    const updateData = { ...req.body };
    
    // Find and update the payment link
    const updatedPaymentLink = await PaymentLink.findOneAndUpdate(
      { linkId },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedPaymentLink) {
      return res.status(404).json({
        status: 'error',
        message: 'Payment link not found',
      });
    }
    
    // Generate payment URL
    const paymentUrl = generatePaymentUrl({
      blockchain: updatedPaymentLink.blockchain,
      walletAddress: updatedPaymentLink.walletAddress,
      amount: updatedPaymentLink.amount,
      currency: updatedPaymentLink.currency,
      memo: updatedPaymentLink.memo,
    });
    
    // Return success response
    return res.status(200).json({
      status: 'success',
      message: 'Payment link updated successfully',
      data: {
        ...updatedPaymentLink.toObject(),
        paymentUrl,
      },
    });
  } catch (error) {
    console.error('Error updating payment link:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to update payment link',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * Delete a payment link
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deletePaymentLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    
    // Find and delete the payment link
    const deletedPaymentLink = await PaymentLink.findOneAndDelete({ linkId });
    
    if (!deletedPaymentLink) {
      return res.status(404).json({
        status: 'error',
        message: 'Payment link not found',
      });
    }
    
    // Return success response
    return res.status(200).json({
      status: 'success',
      message: 'Payment link deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting payment link:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to delete payment link',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

module.exports = {
  createPaymentLink,
  getPaymentLink,
  getAllPaymentLinks,
  updatePaymentLink,
  deletePaymentLink,
}; 