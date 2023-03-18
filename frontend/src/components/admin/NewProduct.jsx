import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { clearErrors } from "../../actions/productActions";
import { newAdminProduct } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import Sidebar from "./Sidebar";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  console.log(category);

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.newAdminProduct
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/products");
      alert.success("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success, navigate]);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });

    console.log(formData);
    dispatch(newAdminProduct(formData));
  };

  const uploadFilesHandler = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"New Product"} />
      <div className="row">
        <Sidebar />
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="container container-fluid">
              <div className="wrapper my-5">
                <form
                  className="shadow-lg"
                  onSubmit={submitHandler}
                  encType="multipart/form-data"
                >
                  <h1 className="mb-4">New Product</h1>

                  <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input
                      type="text"
                      id="name_field"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price_field">Price</label>
                    <input
                      type="number"
                      id="price_field"
                      className="form-control"
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description_field">Description</label>
                    <textarea
                      className="form-control"
                      id="description_field"
                      rows="8"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="category_field">Category</label>
                    <select
                      className="form-control"
                      id="category_field"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((category) => {
                        return (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="stock_field">Stock</label>
                    <input
                      type="number"
                      id="stock_field"
                      min={0}
                      className="form-control"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="seller_field">Seller Name</label>
                    <input
                      type="text"
                      id="seller_field"
                      className="form-control"
                      value={seller}
                      onChange={(e) => setSeller(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Images</label>

                    <div className="custom-file">
                      <input
                        type="file"
                        name="product_images"
                        className="custom-file-input"
                        id="customFile"
                        multiple
                        onChange={uploadFilesHandler}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose Images
                      </label>
                    </div>
                    {imagesPreview.map((img) => {
                      return (
                        <img
                          key={img}
                          src={img}
                          className="mt-3 mr-2"
                          alt="Images Preview"
                          width="55"
                          height="52"
                        />
                      );
                    })}
                  </div>

                  <button
                    id="login_button"
                    type="submit"
                    className="btn btn-block py-3"
                    disabled={loading ? true : false}
                  >
                    CREATE
                  </button>
                </form>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;