import { number } from 'zod';

interface TransactionRequest {
  nftId: number;
  quantity: number;
  price: number;
  walletAddress: string | null;
  userId: string | undefined;
}

interface TransactionDto {
  id: string;
  nftId: number;
  quantity: number;
  price: number;
  transactionDate: Date;
  walletAddress: string | null;
  userId: string | undefined;
}
