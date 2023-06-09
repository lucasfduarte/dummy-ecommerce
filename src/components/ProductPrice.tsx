import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { getProductPrice } from "../utils";

interface ProductPriceProps {
  price?: number;
  discountPercentage?: number;
}

const ProductPrice = ({ price, discountPercentage }: ProductPriceProps) => {
  const formatPrice = () => {
    if (price) {
      if (!discountPercentage) {
        return (
          <Typography variant="h6" component="p">
            {`$${getProductPrice(price)}`}
          </Typography>
        );
      } else {
        const afterDiscount = getProductPrice(price, discountPercentage);
        return (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center"
              }}
            >
              <Typography variant="body2" component="div" mr={0.5}>
                {`${discountPercentage.toFixed()}% off:`}
              </Typography>
              <Typography variant="body1" component="div">
                <s>{`$${price.toFixed(2)}`}</s>
              </Typography>
            </Box>
            <Typography variant="h6" component="div">
              <b>{`$${afterDiscount}`}</b>
            </Typography>
          </>
        );
      }
    }
  };

  return <>{formatPrice()}</>;
};

export default ProductPrice;
