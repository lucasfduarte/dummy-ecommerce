import { useEffect, useState } from "react";

const CART_KEY = "CART";

type Cart = {
  [key: string]: Partial<CartItem>;
};

interface CartItem {
  id: string;
  qty: number;
  productName?: string;
  unitPrice?: number;
}

function useCart() {
  const [cart, setCart] = useState<Cart>({});
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(true);

  const getCartFromStorage = () => {
    const cartFromStorage = sessionStorage.getItem(CART_KEY);
    setShouldRefreshData(false);

    if (!cartFromStorage) return {};

    return JSON.parse(cartFromStorage);
  };

  useEffect(() => {
    if (shouldRefreshData) {
      setCart(getCartFromStorage());
    }
  }, [shouldRefreshData]);

  const updateStorage = (value: string) => {
    setShouldRefreshData(true);
    sessionStorage.setItem(CART_KEY, value);
  };

  const addToCart = ({ id, qty, productName, unitPrice }: CartItem) => {
    if (!cart[id]) {
      const newCart = {
        ...cart,
        [id]: {
          qty,
          productName,
          unitPrice
        }
      };
      updateStorage(JSON.stringify(newCart));
    } else {
      cart[id].qty = (cart[id].qty || 0) + qty;
      updateStorage(JSON.stringify(cart));
    }
  };

  const setNewQty = (id: number, qty: number) => {
    if (id && cart[id]) {
      cart[id].qty = qty;
      updateStorage(JSON.stringify(cart));
    }
  };

  const removeFromCart = (id: number) => {
    delete cart[id];
    updateStorage(JSON.stringify(cart));
  };

  const clearCart = () => {
    updateStorage(JSON.stringify({}));
  };

  return {
    addToCart,
    cart,
    removeFromCart,
    setNewQty,
    clearCart
  };
}

export default useCart;
