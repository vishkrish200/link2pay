'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PaymentLink, paymentLinkAPI } from '@/utils/api';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface PaymentLinkCardProps {
  paymentLink: PaymentLink;
  onDelete?: () => void;
}

const PaymentLinkCard: React.FC<PaymentLinkCardProps> = ({ 
  paymentLink,
  onDelete
}) => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once the component is mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get formatted date
  const createdDate = new Date(paymentLink.createdAt).toLocaleDateString();
  
  // Format blockchain name
  const formatBlockchainName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  
  // Copy payment URL to clipboard
  const copyToClipboard = () => {
    if (!isClient) return;
    
    // Get the actual URL that's being displayed
    const urlToCopy = paymentLink.paymentUrl || `${window.location.origin}/pay/${paymentLink.linkId}`;
    
    navigator.clipboard.writeText(urlToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy URL. Please try manually selecting and copying the URL.');
      });
  };
  
  // Handle edit button click
  const handleEdit = () => {
    if (!isClient) return;
    router.push(`/edit/${paymentLink.linkId}`);
  };
  
  // Handle delete button click
  const handleDelete = async () => {
    if (!isClient) return;
    
    if (window.confirm('Are you sure you want to delete this payment link?')) {
      try {
        setIsDeleting(true);
        await paymentLinkAPI.delete(paymentLink.linkId);
        if (onDelete) {
          onDelete();
        }
      } catch (err) {
        console.error('Error deleting payment link:', err);
        alert('Failed to delete payment link. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{paymentLink.title}</CardTitle>
          <span className={`px-2 py-1 text-xs rounded-full ${
            paymentLink.status === 'active' ? 'bg-green-100 text-green-800' :
            paymentLink.status === 'expired' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {paymentLink.status.charAt(0).toUpperCase() + paymentLink.status.slice(1)}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Blockchain</p>
            <p className="text-sm text-gray-900">{formatBlockchainName(paymentLink.blockchain)}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Currency</p>
            <p className="text-sm text-gray-900">{paymentLink.currency}</p>
          </div>
          
          {paymentLink.amount && (
            <div>
              <p className="text-sm font-medium text-gray-500">Amount</p>
              <p className="text-sm text-gray-900">{paymentLink.amount} {paymentLink.currency}</p>
            </div>
          )}
          
          <div>
            <p className="text-sm font-medium text-gray-500">Created</p>
            <p className="text-sm text-gray-900">{createdDate}</p>
          </div>
        </div>
        
        {paymentLink.description && (
          <div>
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p className="text-sm text-gray-900">{paymentLink.description}</p>
          </div>
        )}
        
        <div className="pt-2">
          <div className="text-sm font-medium text-gray-500 mb-1">Payment URL</div>
          <div className="flex items-center">
            <div className="bg-gray-100 rounded p-2 text-sm text-gray-800 overflow-hidden overflow-ellipsis flex-1">
              {paymentLink.paymentUrl || (isClient ? `${window.location.origin}/pay/${paymentLink.linkId}` : `/pay/${paymentLink.linkId}`)}
            </div>
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
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <p className="text-sm text-gray-500">Clicks: {paymentLink.clicks}</p>
        <div className="space-x-2">
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PaymentLinkCard; 