export const getProductPrice = (price: number, discountRate?: number) => {
  if (!discountRate) return price.toFixed(2);
  return ((1 - discountRate / 100) * price).toFixed(2);
};
