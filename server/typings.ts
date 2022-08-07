interface Product {
  imageUrl: string;
  name: string;
  Quantity: string;
  Description: string;
  price: number;
  size: string;
  type: string;
}

interface Cart {
  _id?: string;
  imageUrl: string;
  Name: string;
  Quantity: number;
  Price: string;
  "Total Price": number;
}

interface AgentProduct {
  _id?: string;
  imageUrl: string;
  Name: string;
  Quantity: number;
  Price: string;
  "Total Price": number;
}
