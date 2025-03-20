'use client';

import React from 'react';
import Layout from '@/components/Layout';
import PaymentLinkForm from '@/components/payment-links/PaymentLinkForm';

export default function CreatePaymentLink() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Payment Link</h1>
        <p className="text-gray-500 mt-1">
          Generate a new crypto payment link that you can share with others.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <PaymentLinkForm />
      </div>
    </Layout>
  );
} 