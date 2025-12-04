import { db } from "./db";
import { Item } from "../models/item.model";

export interface ItemDTO {
  title: string;
  city: string;
  price: number;
  surface: number;
}


export const ItemService = {
  getItems: async (): Promise<Item[]> => {
    const [rows] = await db.query("SELECT * FROM items");
    return rows as Item[];
  },

  getItem: async (id: number): Promise<Item | null> => {
    const [rows] = await db.query("SELECT * FROM items WHERE id = ?", [id]);
    const items = rows as Item[];
    return items[0] || null;
  },

  createItem: async (data: ItemDTO): Promise<Item> => {
    const [result] = await db.query(
      "INSERT INTO items (title, city, price, surface) VALUES (?, ?, ?, ?)",
      [data.title, data.city, data.price, data.surface]
    );
    const insertId = (result as any).insertId;
    return { id: insertId, ...data };
  },

  updateItem: async (id: number, data: ItemDTO): Promise<Item | null> => {
    const [result] = await db.query(
      "UPDATE items SET title=?, city=?, price=?, surface=? WHERE id=?",
      [data.title, data.city, data.price, data.surface, id]
    );
    const affectedRows = (result as any).affectedRows;
    if (affectedRows === 0) return null;
    return { id, ...data };
  },

  deleteItem: async (id: number): Promise<boolean> => {
    const [result] = await db.query("DELETE FROM items WHERE id=?", [id]);
    return (result as any).affectedRows > 0;
  }
};
