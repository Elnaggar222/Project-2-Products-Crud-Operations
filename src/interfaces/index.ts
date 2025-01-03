export interface IProduct {
  id?: string;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}
export interface IFormInput {
  name: "title" | "description" | "price" | "imageURL";
  type: string;
  id: string;
  label: string;
}
export interface ICategory {
  id?: string;
  name: string;
  imageURL: string;
}
export interface IErrorsForm {
  title: string;
  description: string;
  price: string;
  imageURL: string;
  colors: string;
  category: string;
}
