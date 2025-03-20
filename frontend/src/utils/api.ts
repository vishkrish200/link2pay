import axios from 'axios';

// Create an axios instance with default configs
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for our payment links
export interface PaymentLink {
  _id: string;
  linkId: string;
  walletAddress: string;
  blockchain: string;
  currency: string;
  amount?: number;
  memo?: string;
  title: string;
  description?: string;
  expiresAt?: string;
  status: 'active' | 'expired' | 'disabled';
  clicks: number;
  createdAt: string;
  updatedAt: string;
  paymentUrl?: string;
}

export interface CreatePaymentLinkData {
  walletAddress: string;
  blockchain: 'ethereum' | 'bitcoin' | 'solana' | 'polygon' | 'bnb' | 'avalanche';
  currency: string;
  amount?: number;
  memo?: string;
  title: string;
  description?: string;
  expiresAt?: string;
}

export interface UpdatePaymentLinkData {
  walletAddress?: string;
  blockchain?: 'ethereum' | 'bitcoin' | 'solana' | 'polygon' | 'bnb' | 'avalanche';
  currency?: string;
  amount?: number;
  memo?: string;
  title?: string;
  description?: string;
  expiresAt?: string;
  status?: 'active' | 'expired' | 'disabled';
}

// API functions for payment links
export const paymentLinkAPI = {
  // Get all payment links
  getAll: async (): Promise<PaymentLink[]> => {
    const response = await api.get('/payments');
    return response.data.data;
  },

  // Get a single payment link by ID
  getById: async (linkId: string): Promise<PaymentLink> => {
    const response = await api.get(`/payments/${linkId}`);
    return response.data.data;
  },

  // Create a new payment link
  create: async (data: CreatePaymentLinkData): Promise<PaymentLink> => {
    const response = await api.post('/payments', data);
    return response.data.data;
  },

  // Update a payment link
  update: async (linkId: string, data: UpdatePaymentLinkData): Promise<PaymentLink> => {
    const response = await api.put(`/payments/${linkId}`, data);
    return response.data.data;
  },

  // Delete a payment link
  delete: async (linkId: string): Promise<void> => {
    await api.delete(`/payments/${linkId}`);
  },
};

export default api; 