import axios from "axios";
import type { Item } from "../types/item";

const API_URL = "http://localhost:3000";

export const getItems = async (): Promise<Item[]> => {
  const res = await axios.get(`${API_URL}/items`);
  return res.data;
};

export const getItem = async (id: number): Promise<Item> => {
  const res = await axios.get(`${API_URL}/items/${id}`);
  return res.data;
};

export const createItem = async (item: Omit<Item, "id">): Promise<Item> => {
  const res = await axios.post(`${API_URL}/items`, item);
  return res.data;
};

export const updateItem = async (id: number, item: Omit<Item, "id">): Promise<Item> => {
  const res = await axios.put(`${API_URL}/items/${id}`, item);
  return res.data;
};

export const deleteItem = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/items/${id}`);
};
