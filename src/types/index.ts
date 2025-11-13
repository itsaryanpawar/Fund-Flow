export interface LoginForm {
  email: string;
  password: string;
}

export interface FinancialForm {
  name: string;
  phone: string;
  annualIncome: number;
  employed: 'Yes' | 'No';
  cibilScore: number;
}