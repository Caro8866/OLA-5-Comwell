export type Package = {
  _id: string;
  name: string;
  type: string;
  tags: string[];
  description: string;
  price: number;
  image: string;
  discount?: number;
};
