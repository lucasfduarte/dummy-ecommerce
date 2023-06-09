import { useEffect, useState } from "react";
import { Product } from "../types/types";

function useProducts() {
  const [products, setProducts] = useState<Product[]>();
  const [singleProduct, setSingleProduct] = useState<Product>();

  useEffect(() => {
    fetch(
      "https://dummyjson.com/products?limit=10&select=id,title,brand,rating,thumbnail,price,discountPercentage,stock"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const fetchSingleProduct = (productId: string) => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setSingleProduct(data));
  };

  return { products, fetchSingleProduct, singleProduct };
}

export default useProducts;
