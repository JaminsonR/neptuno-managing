import { Item } from "./Item";

export class Sale {
  _id: any;
  client_id: string;
  date: string;
  client_name: string;
  client_phone: string;
  client_address: string;
  items: Item[];
  subtotal: number;
  tax: number;
  discount: number; // percentage
  total: number;
  status: string;
  due_date: string;
}
