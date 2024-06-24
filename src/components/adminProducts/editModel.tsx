import { useState, useEffect, Fragment } from "react";
import axios from "../../../backendService";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { useDropzone } from "react-dropzone";

type Product = {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  inStock: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onEditProduct: (updatedProduct: Product) => void;
  product: Product | null;
  fetchData: any;
};

const EditModel = ({ isOpen, onClose, onEditProduct, product, fetchData }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setInStock(product.inStock);
      setImage(product.image);
    }
  }, [product]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      handleImageUpload(acceptedFiles);
    },
  });

  // const handleImageUpload = async (acceptedFiles: File[]) => {
  //   const file = acceptedFiles[0];
  //   if (file) {
  //     try {
  //       const options = {
  //         maxWidthOrHeight: 800,
  //         useWebWorker: true,
  //         maxSizeMB: 1,
  //       };
  //       const compressedFile = await imageCompression(file, options);
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         const base64String = reader.result as string;
  //         setImage(base64String);
  //         setErrors({ ...errors, image: "" });
  //       };
  //       reader.readAsDataURL(compressedFile);
  //     } catch (error) {
  //       console.error("Error compressing the image: ", error);
  //       toast.error("Failed to upload the image. Please try again.");
  //     }
  //   }
  // };

  const handleImageUpload = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        setErrors({ ...errors, image: "" });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (price <= 0) {
      newErrors.price = "Price must be greater than zero";
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!image) {
      newErrors.image = "Image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const updatedProduct: Product = {
          _id: product!._id,
          name,
          price,
          description,
          inStock,
          img: image,
        };

        await axios.put(`/api/products/${product!._id}`, updatedProduct);
        fetchData()
        onEditProduct(updatedProduct);
        onClose();
        toast.success("Product updated successfully!");
      } catch (error) {
        console.error("Error updating product:", error);
        toast.error("Failed to update the product. Please try again.");
      }
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="my-8 inline-block w-full max-w-3xl transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="mb-4 text-2xl font-semibold leading-6 text-gray-900"
            >
              Edit Product
            </Dialog.Title>

            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label htmlFor="name" className="mb-1 block font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full rounded-md border px-4 py-2 focus:outline-none ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="price" className="mb-1 block font-semibold">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500">₹</span>
                  </span>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className={`w-full rounded-md border pl-8 pr-4 py-2 focus:outline-none ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              <div>
                <label htmlFor="inStock" className="mb-1 block font-semibold">
                  Availability
                </label>
                <div className="flex items-center mb-4 mt-3">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="inStock"
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                      className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="inStock"
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>
                  <span className="text-gray-700 font-medium pl-5">
                    {inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="mb-1 block font-semibold"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full rounded-md border px-4 py-2 focus:outline-none ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <label className="mb-1 block font-semibold">Image</label>
                <div
                  {...getRootProps()}
                  className={`flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-4 ${
                    isDragActive
                      ? "border-blue-500"
                      : errors.image
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <input {...getInputProps()} />
                  {image ? (
                    <div className="relative">
                      <img
                        src={image}
                        alt="Product"
                        className="max-h-28 object-contain"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 mt-2 mr-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                        onClick={() => setImage("")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mt-1 text-sm text-gray-600">
                        {isDragActive
                          ? "Drop the image here"
                          : "Drag and drop an image here, or click to select an image"}
                      </p>
                    </div>
                  )}
                </div>
                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none ${
                  Object.values(errors).some((error) => error !== "")
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleSubmit}
                disabled={Object.values(errors).some((error) => error !== "")}
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditModel;