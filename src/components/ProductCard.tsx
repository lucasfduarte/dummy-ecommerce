import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Product } from "../types/types";
import { useNavigate } from "react-router-dom";
import ProductPrice from "./ProductPrice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useFavorite from "../hooks/useFavorite";
import useCart from "../hooks/useCart";
import { getProductPrice } from "../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import useMediaQuery from "@material-ui/core/useMediaQuery";
//import { useTheme } from "@material-ui/core/styles";

const ProductCard = ({
  id,
  title,
  brand,
  rating,
  thumbnail,
  price,
  discountPercentage,
  stock
}: Partial<Product>) => {
  //const theme = useTheme();
  //const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { isFavorite, toggleProductAsFavorite } = useFavorite();
  const { addToCart } = useCart();

  const onPressSeeMoreButton = () => {
    navigate(`/product?id=${id}`);
  };

  const onPressAddToCart = () => {
    if (!id || !price) return;
    addToCart({
      id: id?.toString(),
      qty: 1,
      productName: title,
      unitPrice: Number(getProductPrice(price, discountPercentage))
    });
    toast("Added to the cart!");
  };

  return (
    <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: 320 }} style={{ marginTop: 16 }}>
        <CardMedia sx={{ height: 160 }} image={thumbnail} title={title} />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            <Rating
              name="half-rating-read"
              value={rating}
              precision={0.5}
              size="small"
              readOnly
            />
            <Typography variant="body2" component="div" ml={0.5}>
              {rating}
            </Typography>
          </Box>
          <Typography variant="h6" component="p" mt={2}>
            {title}
          </Typography>
          <Typography variant="body2" component="p">
            {`${brand} | Stock: ${stock}`}
          </Typography>
          <ProductPrice price={price} discountPercentage={discountPercentage} />
        </CardContent>
        <CardActions
          className="card-bottom"
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <IconButton
            color="primary"
            aria-label="favorite"
            onClick={() => toggleProductAsFavorite(id)}
          >
            {isFavorite(id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Button size="small" onClick={onPressSeeMoreButton}>
            See More
          </Button>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={onPressAddToCart}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
      <ToastContainer />
    </Grid>
  );
};

export default ProductCard;
