import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

interface AppBarProps {
  backButton?: boolean;
  backRoute?: string;
  hideCartButton?: boolean;
}

export default function ButtonAppBar({
  backButton,
  backRoute,
  hideCartButton
}: AppBarProps) {
  const navigate = useNavigate();

  const onPressGoBack = () => {
    if (backRoute) {
      navigate(backRoute);
    }
  };

  const onPressCartButton = () => {
    navigate("/cart");
  };

  return (
    <div className="app-bar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {backButton && (
              <IconButton
                color="inherit"
                aria-label="go back"
                onClick={onPressGoBack}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dummy e-commerce
            </Typography>
            {!hideCartButton && (
              <IconButton
                color="inherit"
                aria-label="go to shopping cart"
                onClick={onPressCartButton}
              >
                <ShoppingCartCheckoutIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
