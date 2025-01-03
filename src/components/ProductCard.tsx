import Button from "./ui/Button";
import Image from "./ui/Image";
import { IErrorsForm, IProduct } from "../interfaces";
import { formatPriceWithCommas, txtSlicer } from "../utils/functions";
import ColorItem from "./ColorItem";
import { defaultErrorsForm } from "../data";
interface IProductCard {
  product: IProduct;
  setProductForm: (product: IProduct) => void;
  openModal: () => void;
  setOperation: (operation: string) => void;
  setErrors: (errors: IErrorsForm) => void;
}
const ProductCard = ({
  product,
  setProductForm,
  openModal,
  setOperation,
  setErrors,
}: IProductCard) => {
  const { title, price, imageURL, category, colors, description } = product;

  /*________________Renders________________*/

  const renderFormColorsList = () => {
    return colors.length ? (
      <div className="flex items-center my-3 gap-1 flex-wrap overflow-auto sm:max-h-6">
        {colors.map((color) => (
          <ColorItem key={color} color={color} />
        ))}
      </div>
    ) : (
      <span className="text-red-600 my-3">No Colors Added Yet!</span>
    );
  };
  /*________________Handlers________________*/
  const handleEdit = () => {
    setProductForm(product);
    setErrors({ ...defaultErrorsForm });
    setOperation("edit");
    openModal();
  };
  const handleDelete = () => {
    setProductForm(product);
    setOperation("delete");
    openModal();
  };
  return (
    <div className="w-full max-w-sm mx-auto rounded-lg flex flex-col">
      <Image
        className="rounded-lg mb-2 w-full min-h-60 object-cover"
        alt={title}
        src={imageURL}
      />
      <h3 className="text-md font-medium">{txtSlicer(title, 20)}</h3>
      <p className="text-sm text-gray-500 max-h-10">{txtSlicer(description)}</p>
      {renderFormColorsList()}
      <div className="flex justify-between items-center">
        <span className="text-blue-700 font-bold">
          ${formatPriceWithCommas(price)}
        </span>
        <Image
          className="w-10 h-10 rounded-full object-cover"
          alt={category.name}
          src={category.imageURL}
        />
      </div>
      <div className="flex items-center justify-between space-x-2 mt-3">
        <Button
          className="bg-indigo-700 hover:bg-indigo-800"
          onClick={handleEdit}
        >
          EDIT
        </Button>
        <Button className="bg-red-700 hover:bg-red-800" onClick={handleDelete}>
          DELETE
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
