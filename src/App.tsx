import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Modal from "./components/ui/Modal";
import {
  categories,
  colors,
  defaultErrorsForm,
  defaultProductForm,
  FormInputList,
  productList,
} from "./data";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { ICategory, IProduct } from "./interfaces";
import { ProductFormValidation } from "./validations";
import ErrorMsg from "./components/ErrorMsg";
import ColorItem from "./components/ColorItem";
import ColorSelected from "./components/ColorSelected";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import toast, { Toaster } from "react-hot-toast";
const App = () => {
  /*________________States________________*/
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState(productList);
  const [productForm, setProductForm] = useState<IProduct>({
    ...defaultProductForm,
  });
  const [errors, setErrors] = useState({ ...defaultErrorsForm });
  //! we have 3 operations: (add, edit, delete) and we need to know which operation we are doing
  //^ By default, we are adding a new product
  const [operation, setOperation] = useState("add");
  /*_______________Handlers______________*/
  const handleSetSelected = useCallback((value: ICategory) => {
    setErrors((prev) => ({ ...prev, category: "" }));
    setProductForm((prev) => ({ ...prev, category: value }));
  }, []);
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleColorSelect = useCallback(
    (color: string): void => {
      setErrors((prev) => ({ ...prev, colors: "" }));
      const isColorExist = productForm.colors.includes(color);
      if (isColorExist) {
        setProductForm((prev) => ({
          ...prev,
          colors: prev.colors.filter((c) => c !== color),
        }));
      } else {
        setProductForm((prev) => ({
          ...prev,
          colors: [...prev.colors, color],
        }));
      }
    },
    [productForm.colors]
  );
  const handleAddProduct = useCallback(() => {
    setOperation("add");
    setProductForm({ ...defaultProductForm });
    setErrors({ ...defaultErrorsForm });
    openModal();
  }, [openModal]);
  const handleCanel = useCallback(() => {
    setProductForm({ ...defaultProductForm });
    setErrors({ ...defaultErrorsForm });
    closeModal();
  }, []);
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);
  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (operation === "delete") {
      setProducts((prev) =>
        prev.filter((product) => product.id !== productForm.id)
      );
      toast.success("Product Deleted Successfully!");
      setProductForm({ ...defaultProductForm });
      closeModal();
      return;
    }
    const errors = ProductFormValidation({ ...productForm });
    setErrors({ ...errors });
    const isValidForm = Object.values(errors).every((error) => error === "");
    if (!isValidForm) {
      toast.error("Please fill the form correctly!");
      return;
    } else {
      if (operation === "edit") {
        setProducts((prev) =>
          prev.map((product) =>
            product.id === productForm.id ? productForm : product
          )
        );
        toast.success("Product Updated Successfully!");
      } else if (operation === "add") {
        setProducts((prev) => [{ ...productForm, id: uuid() }, ...prev]);
        toast.success("Product Added Successfully!");
      }
    }
    setProductForm({ ...defaultProductForm });
    closeModal();
  };
  /*______________Renders________________*/
  const renderProductList = () => {
    return products.map((product) => (
      <ProductCard
        product={product}
        key={product.id}
        setProductForm={setProductForm}
        openModal={openModal}
        setOperation={setOperation}
        setErrors={setErrors}
      />
    ));
  };
  const renderFormInputList = FormInputList.map((input) => (
    <div key={input.id} className=" flex flex-col">
      <label
        className="mb-[2px] font-medium text-sm text-gray-700"
        htmlFor={input.id}
      >
        {input.label}
      </label>
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        onChange={onChangeHandler}
        value={productForm[input.name]}
      />
      {<ErrorMsg msg={errors[input.name]} />}
    </div>
  ));
  const renderFormColorsList = () => (
    <div className="flex flex-wrap items-center gap-[3px]">
      {colors.map((color) => (
        <ColorItem
          key={color}
          color={color}
          onClick={() => handleColorSelect(color)}
        />
      ))}
    </div>
  );
  const renderSelectedColors = () => (
    <div className="flex flex-wrap items-center gap-[3px]">
      {productForm.colors.map((color) => (
        <ColorSelected key={color} color={color} />
      ))}
    </div>
  );
  return (
    <div className="container mx-auto my-6">
      <Button
        width="w-fit"
        onClick={handleAddProduct}
        className="bg-indigo-900 my-6 ml-[50%] translate-x-[-50%]"
      >
        Add New Product
      </Button>
      <div className="gap-4 rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {renderProductList()}
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        title={
          operation === "add"
            ? "Add New Product"
            : operation === "edit"
            ? "Edit Product"
            : "Are you sure you want to remove this Product from your Store?"
        }
        operating={operation}
      >
        <form className="space-y-3" onSubmit={handleOnSubmit}>
          {operation === "add" || operation === "edit" ? (
            <>
              {renderFormInputList}
              <div>
                <Select
                  categories={categories}
                  selected={productForm.category}
                  setSelected={handleSetSelected}
                />
                <ErrorMsg msg={errors.category} />
              </div>
              <div>
                {renderSelectedColors()}
                {renderFormColorsList()}
                <ErrorMsg msg={errors.colors} />
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">
              Deleting this product will remove it permanently from your
              inventory,Any associated data,sales,history,and other related
              information will also be deleted. Please make sure this is the
              intended action.
            </p>
          )}
          <div className="flex justify-between items-center space-x-3">
            <Button
              className={`${
                operation === "delete"
                  ? "bg-red-700 hover:bg-red-800"
                  : "bg-indigo-700 hover:bg-indigo-800"
              }`}
            >
              {operation === "add"
                ? "Add"
                : operation === "edit"
                ? "Edit"
                : "Delete"}
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500"
              type="button"
              onClick={handleCanel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Toaster
        toastOptions={{
          style: {
            background: "black",
            color: "white",
            borderRadius: "8px",
          },
        }}
      />
    </div>
  );
};
export default App;
