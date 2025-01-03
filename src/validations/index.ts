import { defaultErrorsForm } from "../data";
import { IProduct } from "../interfaces";

export const ProductFormValidation = (product: IProduct) => {
  const errors = { ...defaultErrorsForm };
  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Title must be between 10 and 80 characters";
  }
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.title.length > 900
  ) {
    errors.description = "Description must be between 10 and 900 characters";
  }
  const isValidURl = /^(https?:\/\/.*\.(?:[a-zA-Z0-9]+)|https?:\/\/.*)$/i.test(
    product.imageURL
  );
  if (!product.imageURL.trim() || !isValidURl) {
    errors.imageURL = "Image URL must be a valid URL";
  }
  if (!product.price.trim() || isNaN(+product.price) || +product.price < 0) {
    errors.price = "Price must be a valid number greater than or equal 0";
  }
  if (product.colors.length === 0) {
    errors.colors = "Please select at least one color";
  }
  if (!product.category.name.trim()) {
    errors.category = "Please select a category";
  }
  return errors;
};
