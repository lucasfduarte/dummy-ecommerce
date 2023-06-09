import React, { useEffect, useState } from "react";
import ButtonAppBar from "../components/ButtonAppBar";
import useCart from "../hooks/useCart";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Modal from "../components/Modal";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography/Typography";

const Cart = () => {
  const [total, setTotal] = useState<number>(0);
  const [currentId, setCurrentId] = useState(0);
  const [currentQty, setCurrentQty] = useState(0);
  const [removalModal, setRemovalModal] = useState<boolean>(false);
  const [editionModal, setEditionModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [clearModal, setClearModal] = useState<boolean>(false);
  const { cart, removeFromCart, setNewQty, clearCart } = useCart();

  const openRemovalModal = (id: string) => {
    setCurrentId(Number(id));
    setRemovalModal(true);
  };
  const handleCloseRemovalModal = () => {
    setRemovalModal(false);
  };
  const onConfirmRemoval = () => {
    removeFromCart(currentId);
  };

  const openEditionModal = (id: string) => {
    setCurrentId(Number(id));
    setEditionModal(true);
  };
  const handleCloseEditionModal = () => {
    setEditionModal(false);
  };
  const onConfirmEdit = () => {
    setEditMode(true);
    setCurrentQty(cart[currentId].qty || 0);
  };
  const onChangeQty = (newQty: number) => {
    setCurrentQty(newQty);
  };
  const handleQtyActionButton = (key: string) => {
    if (editMode) {
      setNewQty(currentId, currentQty);
      setEditMode(false);
    } else {
      openEditionModal(key);
    }
  };

  const openClearModal = () => {
    setClearModal(true);
  };
  const handleCloseClearModal = () => {
    setClearModal(false);
  };
  const onConfirmClear = () => {
    clearCart();
  };

  useEffect(() => {
    const sumOfPrices = Object.entries(cart).reduce(
      (acc, [_key, item]) =>
        acc + (item?.qty && item?.unitPrice ? item.qty * item.unitPrice : 0),
      0
    );
    setTotal(sumOfPrices);
  }, [cart]);

  return (
    <div className="App">
      <ButtonAppBar backButton backRoute={"/"} hideCartButton />

      <div className="page cart">
        <Modal
          open={removalModal}
          actionCallback={onConfirmRemoval}
          handleClose={handleCloseRemovalModal}
          title={"Item removal"}
          mainText={
            "Are you sure you want to remove this item from the cart? This action can't be undone."
          }
        />
        <Modal
          open={editionModal}
          actionCallback={onConfirmEdit}
          handleClose={handleCloseEditionModal}
          title={"Item quantity edition"}
          mainText={
            "Are you sure you want to edit the quantity of this item? The total price will be affected by this action."
          }
        />
        <Modal
          open={clearModal}
          actionCallback={onConfirmClear}
          handleClose={handleCloseClearModal}
          title={"Clear cart"}
          mainText={
            "Are you sure you want to clear the cart? This action can't be undone."
          }
        />
        <div>
          {Object.entries(cart).length ? (
            <>
              <table className="cart-data">
                <tr>
                  <th>Qty</th>
                  <th>Product Name</th>
                  <th>Unit price</th>
                  <th>Total Price</th>
                </tr>
                {Object.entries(cart).map(([key, item]) => (
                  <tr>
                    <td>
                      <TextField
                        id="product-qty"
                        type="number"
                        variant="standard"
                        value={
                          editMode && currentId === Number(key)
                            ? currentQty
                            : item.qty
                        }
                        onChange={(e) => onChangeQty(Number(e.target.value))}
                        InputProps={{
                          readOnly: !editMode
                        }}
                        sx={{ width: 48 }}
                      />
                      <IconButton
                        onClick={() => handleQtyActionButton(key)}
                        disabled={editMode && currentId !== Number(key)}
                        color="primary"
                        aria-label="add to shopping cart"
                      >
                        {editMode ? <CheckCircleOutlineIcon /> : <EditIcon />}
                      </IconButton>
                    </td>
                    <td>{item.productName}</td>
                    <td>{`$ ${item.unitPrice?.toFixed(2)}`}</td>
                    <td>
                      {item.qty &&
                        item.unitPrice &&
                        `$ ${(item?.qty * item?.unitPrice).toFixed(2)}`}
                    </td>
                    <td>
                      <IconButton
                        onClick={() => openRemovalModal(key)}
                        color="primary"
                        aria-label="add to shopping cart"
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td />
                  <td />
                  <td>
                    <b>Total:</b>
                  </td>
                  <td>
                    <b>{`$ ${total.toFixed(2)}`}</b>
                  </td>
                </tr>
              </table>
              <Box sx={{ justifyItems: "right" }}>
                <Button
                  onClick={openClearModal}
                  variant="outlined"
                  sx={{ marginRight: 2 }}
                >
                  Clear Cart
                </Button>
                <Button variant="contained">Finish Purchase</Button>
              </Box>
            </>
          ) : (
            <Typography variant="h5" component="p" mt={2}>
              You haven't added any product to the cart yet
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
