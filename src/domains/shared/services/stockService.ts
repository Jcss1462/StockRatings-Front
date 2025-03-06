import axios from "axios";
import type { Stock } from "../models/stockModel";

const API_URL = import.meta.env.VITE_STOCK_RATING_API_URL; 

export async function fetchStocks(): Promise<Stock[]> {
  const response = await axios.get(`${API_URL}/stocks`);
  return response.data.map((stock: Stock) => ({
    ...stock,
    growth: stock.target_to - stock.target_from,
  }));;
}

export async function fetchBestStock(): Promise<Stock | null> {
  const response = await axios.get(`${API_URL}/recommendation`);
  return response.data || null;
}
