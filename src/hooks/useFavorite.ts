import { useEffect, useState } from "react";

const FAVORITE_PRODUCTS_KEY = "FAVORITE_PRODUCTS";

function useFavorite() {
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);
  const [shouldRefreshData, setShouldRefreshData] = useState<boolean>(true);

  const getFavoriteProducts = () => {
    const favProductsFromStorage = sessionStorage.getItem(
      FAVORITE_PRODUCTS_KEY
    );
    if (!favProductsFromStorage) return [];

    setShouldRefreshData(false);

    return JSON.parse(favProductsFromStorage);
  };

  const isFavorite: (id: number | undefined) => boolean = (
    id: number | undefined
  ) => {
    if (!id) return false;
    return favoriteProducts.includes(id);
  };

  const toggleProductAsFavorite = (id: number | undefined) => {
    if (!id) return;
    if (isFavorite(id)) {
      const newFavorite = JSON.stringify([
        ...favoriteProducts.filter((item: number) => item !== id)
      ]);
      sessionStorage.setItem(FAVORITE_PRODUCTS_KEY, newFavorite);
    } else {
      const newFavorite = JSON.stringify([...favoriteProducts, id]);
      sessionStorage.setItem(FAVORITE_PRODUCTS_KEY, newFavorite);
    }
    setShouldRefreshData(true);
  };

  useEffect(() => {
    if (shouldRefreshData) {
      setFavoriteProducts(getFavoriteProducts());
    }
  }, [shouldRefreshData]);

  return {
    isFavorite,
    toggleProductAsFavorite
  };
}

export default useFavorite;
