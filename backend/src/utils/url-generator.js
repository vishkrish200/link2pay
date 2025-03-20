/**
 * Generates standardized payment URLs for different blockchains
 */

/**
 * Generate a crypto payment URL based on the blockchain, address, amount, and other parameters
 * 
 * @param {Object} params - The payment parameters
 * @returns {String} The formatted payment URL
 */
const generatePaymentUrl = (params) => {
  const { blockchain, walletAddress, amount, currency, memo } = params;
  
  switch (blockchain.toLowerCase()) {
    case 'ethereum':
      return generateEthereumUrl(walletAddress, amount, currency, memo);
    case 'bitcoin':
      return generateBitcoinUrl(walletAddress, amount, memo);
    case 'solana':
      return generateSolanaUrl(walletAddress, amount, currency, memo);
    case 'polygon':
      return generatePolygonUrl(walletAddress, amount, currency, memo);
    case 'bnb':
      return generateBnbUrl(walletAddress, amount, currency, memo);
    case 'avalanche':
      return generateAvalancheUrl(walletAddress, amount, currency, memo);
    default:
      throw new Error(`Unsupported blockchain: ${blockchain}`);
  }
};

/**
 * Generate Ethereum payment URL
 */
const generateEthereumUrl = (address, amount, currency, memo) => {
  let url = `ethereum:${address}`;
  
  // Add parameters if they exist
  const params = new URLSearchParams();
  
  if (amount && !isNaN(amount)) {
    params.append('value', amount);
  }
  
  if (currency && currency.toLowerCase() !== 'eth') {
    // For ERC-20 tokens, use different approach
    params.append('token', currency.toUpperCase());
  }
  
  if (memo) {
    params.append('memo', memo);
  }
  
  const paramString = params.toString();
  if (paramString) {
    url += `?${paramString}`;
  }
  
  return url;
};

/**
 * Generate Bitcoin payment URL
 */
const generateBitcoinUrl = (address, amount, memo) => {
  let url = `bitcoin:${address}`;
  
  // Add parameters if they exist
  const params = new URLSearchParams();
  
  if (amount && !isNaN(amount)) {
    params.append('amount', amount);
  }
  
  if (memo) {
    params.append('message', memo);
  }
  
  const paramString = params.toString();
  if (paramString) {
    url += `?${paramString}`;
  }
  
  return url;
};

/**
 * Generate Solana payment URL
 */
const generateSolanaUrl = (address, amount, currency, memo) => {
  let url = `solana:${address}`;
  
  // Add parameters if they exist
  const params = new URLSearchParams();
  
  if (amount && !isNaN(amount)) {
    params.append('amount', amount);
  }
  
  if (currency && currency.toLowerCase() !== 'sol') {
    params.append('spl-token', currency);
  }
  
  if (memo) {
    params.append('memo', memo);
  }
  
  const paramString = params.toString();
  if (paramString) {
    url += `?${paramString}`;
  }
  
  return url;
};

/**
 * Generate Polygon payment URL (similar to Ethereum)
 */
const generatePolygonUrl = (address, amount, currency, memo) => {
  let url = `polygon:${address}`;
  
  // Add parameters if they exist
  const params = new URLSearchParams();
  
  if (amount && !isNaN(amount)) {
    params.append('value', amount);
  }
  
  if (currency && currency.toLowerCase() !== 'matic') {
    params.append('token', currency.toUpperCase());
  }
  
  if (memo) {
    params.append('memo', memo);
  }
  
  const paramString = params.toString();
  if (paramString) {
    url += `?${paramString}`;
  }
  
  return url;
};

/**
 * Generate BNB Chain payment URL
 */
const generateBnbUrl = (address, amount, currency, memo) => {
  let url = `bnb:${address}`;
  
  // Add parameters if they exist
  const params = new URLSearchParams();
  
  if (amount && !isNaN(amount)) {
    params.append('value', amount);
  }
  
  if (currency && currency.toLowerCase() !== 'bnb') {
    params.append('token', currency.toUpperCase());
  }
  
  if (memo) {
    params.append('memo', memo);
  }
  
  const paramString = params.toString();
  if (paramString) {
    url += `?${paramString}`;
  }
  
  return url;
};

/**
 * Generate Avalanche payment URL
 */
const generateAvalancheUrl = (address, amount, currency, memo) => {
  let url = `avalanche:${address}`;
  
  // Add parameters if they exist
  const params = new URLSearchParams();
  
  if (amount && !isNaN(amount)) {
    params.append('value', amount);
  }
  
  if (currency && currency.toLowerCase() !== 'avax') {
    params.append('token', currency.toUpperCase());
  }
  
  if (memo) {
    params.append('memo', memo);
  }
  
  const paramString = params.toString();
  if (paramString) {
    url += `?${paramString}`;
  }
  
  return url;
};

module.exports = {
  generatePaymentUrl,
}; 