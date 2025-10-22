export interface FormData {
  personal: {
    phone: string;
    firstName: string;
    lastName: string;
    gender: string;
  };
  addressWork: {
    workplace: string;
    address: string;
  };
  loan: {
    amount: number;
    term: number;
  };
}

export interface FormErrors {
  [key: string]: string;
} 