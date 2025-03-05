export interface Stock {
    id: number;
    ticker: string;
    company: string;
    action: string;
    brokerage: string;
    rating_from: string;
    rating_to: string;
    target_from: number;
    target_to: number;
    time: string;
  }