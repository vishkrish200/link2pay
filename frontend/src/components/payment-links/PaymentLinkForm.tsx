'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { CreatePaymentLinkData, paymentLinkAPI, UpdatePaymentLinkData } from '@/utils/api';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

interface PaymentLinkFormProps {
  initialData?: UpdatePaymentLinkData & { linkId?: string };
  isEditing?: boolean;
}

const PaymentLinkForm: React.FC<PaymentLinkFormProps> = ({ 
  initialData, 
  isEditing = false 
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once the component is mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { register, handleSubmit, control, formState: { errors } } = useForm<CreatePaymentLinkData>({
    defaultValues: initialData || {
      blockchain: 'ethereum',
      currency: 'ETH',
    }
  });

  const blockchainOptions = [
    { value: 'ethereum', label: 'Ethereum' },
    { value: 'bitcoin', label: 'Bitcoin' },
    { value: 'solana', label: 'Solana' },
    { value: 'polygon', label: 'Polygon' },
    { value: 'bnb', label: 'BNB Chain' },
    { value: 'avalanche', label: 'Avalanche' },
  ];

  const onSubmit = async (data: CreatePaymentLinkData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (isEditing && initialData?.linkId) {
        await paymentLinkAPI.update(initialData.linkId, data);
      } else {
        await paymentLinkAPI.create(data);
      }
      
      // Navigate back to dashboard on success
      if (isClient) {
        router.push('/');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to save payment link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isClient) {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Title"
          placeholder="Payment for services"
          {...register('title', { required: 'Title is required' })}
          error={errors.title?.message}
        />

        <Input
          label="Wallet Address"
          placeholder="Your crypto wallet address"
          {...register('walletAddress', { required: 'Wallet address is required' })}
          error={errors.walletAddress?.message}
        />

        <Controller
          name="blockchain"
          control={control}
          rules={{ required: 'Blockchain is required' }}
          render={({ field }) => (
            <Select
              label="Blockchain"
              options={blockchainOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.blockchain?.message}
            />
          )}
        />

        <Input
          label="Currency"
          placeholder="ETH, BTC, SOL, etc."
          {...register('currency', { required: 'Currency is required' })}
          error={errors.currency?.message}
        />

        <Input
          label="Amount (Optional)"
          type="number"
          step="any"
          placeholder="0.01"
          {...register('amount', { 
            valueAsNumber: true,
            min: { value: 0, message: 'Amount must be positive' } 
          })}
          error={errors.amount?.message}
        />

        <Input
          label="Memo (Optional)"
          placeholder="Invoice #12345"
          {...register('memo')}
          error={errors.memo?.message}
        />
      </div>

      <Textarea
        label="Description (Optional)"
        placeholder="Detailed information about this payment"
        rows={4}
        {...register('description')}
        error={errors.description?.message}
      />

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          {isEditing ? 'Update' : 'Create'} Payment Link
        </Button>
      </div>
    </form>
  );
};

export default PaymentLinkForm; 