import axios from "axios";
import type { Stock } from "../models/stockModel";
import type { SyncResponse } from "../models/syncResponseModel";

const API_URL = import.meta.env.VITE_STOCK_RATING_API_URL;

export async function fetchStocks(): Promise<Stock[]> {
  const response = await axios.get(`${API_URL}/stocks`);
  return response.data.map((stock: Stock) => ({
    ...stock,
    growth: ((stock.target_to - stock.target_from)/stock.target_from)*100,
  }));
}

export async function fetchBestStock(): Promise<Stock|null> {
  const response = await axios.get(`${API_URL}/stocks/recommendation`);

  if(response.data!=null){
    let dataTmp= response.data
    response.data.growth=((dataTmp.target_to - dataTmp.target_from)/dataTmp.target_from)*100
  }

  return response.data;
}

export async function syncBd(token:String): Promise<SyncResponse> { 
  const response = await axios.post<SyncResponse>(
    `${API_URL}/stocks/sync`,
    {}, // Cuerpo vacío porque es una solicitud POST sin payload
    {
        headers: {
            Authorization: `Bearer ${token}`, // Token en el header
        },
    });
  return response.data;
}

