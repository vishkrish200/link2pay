'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { PaymentLink, paymentLinkAPI } from '@/utils/api';
import Layout from '@/components/Layout';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function PaymentDetails() {
  const params = useParams();
  const linkId = params.linkId as string;
  
  const [paymentLink, setPaymentLink] = useState<PaymentLink | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [walletOpened, setWalletOpened] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const fetchPaymentLink = async () => {
      if (!linkId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const link = await paymentLinkAPI.getById(linkId);
        setPaymentLink(link);
      } catch (err) {
        console.error('Error fetching payment link:', err);
        setError('This payment link does not exist or has been removed.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentLink();
  }, [linkId]);

  // Format blockchain name
  const formatBlockchainName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Copy address to clipboard
  const copyToClipboard = () => {
    if (!isClient || !paymentLink?.walletAddress) return;
    
    navigator.clipboard.writeText(paymentLink.walletAddress)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy address:', err);
        alert('Failed to copy address. Please try selecting and copying manually.');
      });
  };

  // Get wallet app name based on blockchain
  const getWalletAppName = (blockchain: string): string => {
    switch (blockchain.toLowerCase()) {
      case 'ethereum':
        return 'MetaMask or any Ethereum wallet';
      case 'bitcoin':
        return 'Bitcoin wallet';
      case 'solana':
        return 'Phantom or any Solana wallet';
      case 'polygon':
        return 'MetaMask or any Polygon-compatible wallet';
      case 'bnb':
        return 'Trust Wallet or any BNB Chain wallet';
      case 'avalanche':
        return 'MetaMask or any Avalanche-compatible wallet';
      default:
        return 'cryptocurrency wallet';
    }
  };

  // Handle payment button click - open wallet if available
  const handlePayment = () => {
    if (!isClient || !paymentLink?.paymentUrl) return;
    
    try {
      // Set a flag to indicate we attempted to open the wallet
      setWalletOpened(true);
      
      // Open the payment URL which should trigger the wallet app
      window.location.href = paymentLink.paymentUrl;
      
      // After a short delay, show a message if the wallet didn't open
      setTimeout(() => {
        // If we're still on the same page, likely the wallet didn't open
        const walletName = getWalletAppName(paymentLink.blockchain);
        alert(`If your ${walletName} didn't open, you may need to install it first or copy the address manually.`);
      }, 2000);
    } catch (err) {
      console.error('Error opening wallet:', err);
      alert('Failed to open wallet. You may need to install a compatible wallet app first.');
    }
  };

  // Function to generate a fallback payment URL if one isn't provided
  const getPaymentUrl = (): string => {
    if (!paymentLink) return '';
    
    if (paymentLink.paymentUrl) return paymentLink.paymentUrl;
    
    // Generate a fallback URL based on the blockchain and address
    const { blockchain, walletAddress } = paymentLink;
    return `${blockchain.toLowerCase()}:${walletAddress}`;
  };

  // Download QR code as image
  const downloadQRCode = () => {
    if (!isClient) return;
    
    try {
      // Get the SVG element
      const svgElement = document.querySelector('.qr-code-container svg');
      if (!svgElement) return;
      
      // Create a canvas to convert SVG to image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set canvas size to match SVG with some padding
      canvas.width = 200;
      canvas.height = 200;
      
      // Fill white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Convert SVG to image data
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const img = new Image();
      
      img.onload = () => {
        // Center the image on the canvas
        ctx.drawImage(img, 20, 20, 160, 160);
        
        // Convert to PNG and trigger download
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        
        downloadLink.download = `payment-qr-${paymentLink?.blockchain || 'crypto'}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    } catch (err) {
      console.error('Error downloading QR code:', err);
      alert('Failed to download QR code.');
    }
  };

  // Generate QR code for the payment
  const QRCodeComponent = () => {
    if (!paymentLink) return null;
    
    // Use payment URL if available, otherwise use the direct wallet address
    const qrValue = paymentLink.paymentUrl || `${paymentLink.blockchain}:${paymentLink.walletAddress}`;
    
    return (
      <div className="mx-auto mb-2 bg-white p-4 rounded-lg inline-block qr-code-container">
        <QRCodeSVG 
          value={qrValue}
          size={160}
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="L"
          includeMargin={false}
        />
      </div>
    );
  };

  // Get block explorer URL based on blockchain and address
  const getBlockExplorerUrl = (): string => {
    if (!paymentLink) return '';
    
    const { blockchain, walletAddress } = paymentLink;
    
    switch (blockchain.toLowerCase()) {
      case 'ethereum':
        return `https://etherscan.io/address/${walletAddress}`;
      case 'bitcoin':
        return `https://www.blockchain.com/explorer/addresses/btc/${walletAddress}`;
      case 'solana':
        return `https://explorer.solana.com/address/${walletAddress}`;
      case 'polygon':
        return `https://polygonscan.com/address/${walletAddress}`;
      case 'bnb':
        return `https://bscscan.com/address/${walletAddress}`;
      case 'avalanche':
        return `https://snowtrace.io/address/${walletAddress}`;
      default:
        return '';
    }
  };
  
  // Open block explorer
  const openBlockExplorer = () => {
    if (!isClient) return;
    
    const url = getBlockExplorerUrl();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Handle sharing the payment link
  const handleShare = async () => {
    if (!isClient || !paymentLink) return;
    
    const shareUrl = window.location.href;
    const shareTitle = `Payment request: ${paymentLink.title}`;
    const shareText = `Please send ${paymentLink.amount ? `${paymentLink.amount} ${paymentLink.currency}` : paymentLink.currency} to my ${formatBlockchainName(paymentLink.blockchain)} wallet`;
    
    try {
      if (navigator.share) {
        // Use Web Share API if available (mainly mobile devices)
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl);
        alert('Payment link copied to clipboard! You can now paste it to share.');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h3 className="text-lg font-medium text-red-600 mb-2">Error</h3>
              <p className="text-gray-500 mb-6">{error}</p>
            </CardContent>
          </Card>
        ) : paymentLink ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">{paymentLink.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center">
                <QRCodeComponent />
                
                <button 
                  onClick={downloadQRCode}
                  className="text-blue-600 text-sm hover:text-blue-800 mb-4 inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download QR Code
                </button>
                
                <p className="text-gray-600 mb-4">
                  {paymentLink.description || 'Make a payment using the details below.'}
                </p>
              </div>
              
              <div className="grid gap-4">
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <p className="text-sm font-medium text-gray-500 mb-1">Send To:</p>
                  <div className="flex items-center">
                    <p className="font-mono text-sm break-all flex-1">{paymentLink.walletAddress}</p>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="ml-2" 
                      onClick={copyToClipboard}
                    >
                      {isCopied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Blockchain</p>
                    <p className="text-gray-900">{formatBlockchainName(paymentLink.blockchain)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Currency</p>
                    <p className="text-gray-900">{paymentLink.currency}</p>
                  </div>
                  
                  {paymentLink.amount && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Amount</p>
                      <p className="text-gray-900 font-bold">{paymentLink.amount} {paymentLink.currency}</p>
                    </div>
                  )}
                  
                  {paymentLink.memo && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Memo</p>
                      <p className="text-gray-900">{paymentLink.memo}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  fullWidth 
                  size="lg" 
                  onClick={handlePayment}
                >
                  Open in Wallet
                </Button>
                <p className="text-center text-xs text-gray-500 mt-2">
                  This will attempt to open your {paymentLink ? getWalletAppName(paymentLink.blockchain) : 'crypto wallet'} if installed
                </p>
                
                <div className="mt-4">
                  <Button 
                    fullWidth 
                    variant="secondary" 
                    onClick={openBlockExplorer}
                  >
                    View in Block Explorer
                  </Button>
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Check address details on the blockchain
                  </p>
                </div>
                
                <div className="mt-4">
                  <Button 
                    fullWidth 
                    variant="ghost" 
                    onClick={handleShare}
                  >
                    Share Payment Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </Layout>
  );
} 