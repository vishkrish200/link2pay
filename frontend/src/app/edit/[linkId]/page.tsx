'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PaymentLink, paymentLinkAPI, UpdatePaymentLinkData } from '@/utils/api';
import Layout from '@/components/Layout';
import PaymentLinkForm from '@/components/payment-links/PaymentLinkForm';

export default function EditPaymentLink() {
  const router = useRouter();
  const params = useParams();
  const linkId = params.linkId as string;
  
  const [paymentLink, setPaymentLink] = useState<PaymentLink | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentLink = async () => {
      if (!linkId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const link = await paymentLinkAPI.getById(linkId);
        setPaymentLink(link);
      } catch (err) {
        console.error('Error fetching payment link:', err);
        setError('Failed to load payment link. It may have been deleted or does not exist.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentLink();
  }, [linkId]);

  // Convert payment link data to properly typed form data
  const prepareFormData = (link: PaymentLink): UpdatePaymentLinkData & { linkId: string } => {
    const blockchain = link.blockchain as 'ethereum' | 'bitcoin' | 'solana' | 'polygon' | 'bnb' | 'avalanche';
    return {
      linkId: link.linkId,
      walletAddress: link.walletAddress,
      blockchain: blockchain,
      currency: link.currency,
      amount: link.amount,
      memo: link.memo,
      title: link.title,
      description: link.description,
      expiresAt: link.expiresAt,
      status: link.status
    };
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Payment Link</h1>
        <p className="text-gray-500 mt-1">
          Update your crypto payment link details.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : paymentLink ? (
          <PaymentLinkForm 
            initialData={prepareFormData(paymentLink)}
            isEditing={true}
          />
        ) : (
          <div className="text-center py-6">
            <p>Payment link not found.</p>
          </div>
        )}
      </div>
    </Layout>
  );
} 