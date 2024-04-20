export enum PaymentStatus {
    expired = "expired",
    unpaid = "unpaid",
    paid = "paid",
  }
  
  export interface Invoice {
    label: string;
    bolt11: string;
    payment_hash: string;
    amount_msat: number;
    status: PaymentStatus;
    description: string;
    expires_at: number;
    created_index: number;
    updated_index: number;
  }