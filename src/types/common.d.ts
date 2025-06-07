export type Room = {
  id: string;
  name: string;
  location: {
    title: string;
    link: string;
  };
  description: string;
  images: string[];
  amenities: string[];
  rating: number;
  count: number;
  price: {
    amount: number;
    tax: number;
    currency: string;
    breakdown: {
      title: string;
      amount: number;
    }[];
  };
  types: {
    [key: string]: number;
  };
};

export type RoomTypes =
  | 'single'
  | 'double'
  | 'queen'
  | 'king'
  | 'triple'
  | 'quad';

export type BoardTypes = 'full board' | 'half board' | 'bed and breakfast';

export type Status = {
  on: boolean;
  type: 'loading' | 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message?: string;
  action: {
    title?: string;
    callback: () => void;
  };
};

export type User = {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  country: string;
  city: string;
  paymentMethods: PaymentMethod[];
};

export type PaymentMethod = {
  method: 'card' | 'mpesa' | 'paypal';
  card?: {
    name: string;
    number: string;
    expiry: string;
    cvv?: string;
  };
  mpesa?: {
    number: string;
  };
  paypal?: {
    email: string;
  };
};

export type PaymentModalType =
  | 'card'
  | 'paypal'
  | 'mpesa'
  | 'cash'
  | 'add'
  | null;
