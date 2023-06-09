import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import ButtonAppBar from "../components/ButtonAppBar";
import useProducts from "../hooks/useProducts";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ProductPrice from "../components/ProductPrice";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useFavorite from "../hooks/useFavorite";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useCart from "../hooks/useCart";
import { getProductPrice } from "../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinearProgress from "@mui/material/LinearProgress";

const ProductDetail = () => {
  const { fetchSingleProduct, singleProduct } = useProducts();
  const { isFavorite, toggleProductAsFavorite } = useFavorite();
  const { addToCart } = useCart();

  const [id, setId] = useState<string>();
  const [qty, setQty] = useState<number>(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const paramId = searchParams.get("id");

    if (!paramId) return;
    setId(paramId);
  }, []);

  useEffect(() => {
    if (id) {
      fetchSingleProduct(id);
    }
  }, [id]);

  const isAddToCartDisabled =
    !singleProduct?.stock || qty > singleProduct?.stock;

  const rating = singleProduct?.rating;

  const onAddToCard = () => {
    if (!singleProduct?.id || !singleProduct?.price) return;
    addToCart({
      id: singleProduct?.id.toString(),
      qty,
      productName: singleProduct?.title,
      unitPrice: Number(
        getProductPrice(singleProduct?.price, singleProduct.discountPercentage)
      )
    });
    toast("Added to the cart!");
  };

  if (!singleProduct) {
    return (
      <div className="App">
        <ButtonAppBar backButton backRoute={"/"} />
        <div className="page">
          <LinearProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <ButtonAppBar backButton backRoute={"/"} />
      <div className="page">
        {singleProduct?.images?.length && (
          <Carousel autoPlay showArrows showThumbs={false}>
            {singleProduct?.images?.map((item) => (
              <div>
                <img
                  key={item}
                  className="carousel-item"
                  src={item}
                  alt={singleProduct?.title}
                />
              </div>
            ))}
          </Carousel>
        )}
      </div>
      <Box my={2}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {rating && (
            <Rating
              name="half-rating-read"
              value={singleProduct?.rating}
              precision={0.5}
              size="small"
              readOnly
            />
          )}
          <Typography variant="body2" component="div" ml={0.5}>
            {singleProduct?.rating}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <IconButton
            color="primary"
            aria-label="favorite"
            onClick={() => toggleProductAsFavorite(Number(id))}
          >
            {isFavorite(Number(id)) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="h6" component="p">
            {singleProduct?.title}
          </Typography>
        </Box>
        <Typography variant="body2" component="p">
          {`${singleProduct?.brand} | Stock: ${singleProduct?.stock}`}
        </Typography>
        <Typography variant="body1" component="p" my={2}>
          {singleProduct?.description}
        </Typography>
      </Box>
      <ProductPrice
        price={singleProduct?.price}
        discountPercentage={singleProduct?.discountPercentage}
      />
      <Box
        mt={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "end"
        }}
      >
        <TextField
          id="product-qty"
          label="Qty"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          variant="standard"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
        <IconButton
          disabled={isAddToCartDisabled}
          color="primary"
          aria-label="add to shopping cart"
          onClick={onAddToCard}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
