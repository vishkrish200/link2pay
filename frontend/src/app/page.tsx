'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PaymentLink, paymentLinkAPI } from '@/utils/api';
import Layout from '@/components/Layout';
import PaymentLinkCard from '@/components/payment-links/PaymentLinkCard';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function Home() {
  const router = useRouter();
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPaymentLinks = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const links = await paymentLinkAPI.getAll();
      setPaymentLinks(links);
    } catch (err) {
      console.error('Error fetching payment links:', err);
      setError('Failed to load payment links. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentLinks();
  }, []);

  const handleCreateNew = () => {
    router.push('/create');
  };

  const handleDelete = () => {
    fetchPaymentLinks();
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Payment Links</h1>
        <Button onClick={handleCreateNew}>Create New Link</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : paymentLinks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payment links yet</h3>
            <p className="text-gray-500 mb-6">Create your first payment link to get started</p>
            <Button onClick={handleCreateNew}>Create Payment Link</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentLinks.map((link) => (
            <PaymentLinkCard 
              key={link.linkId} 
              paymentLink={link} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
