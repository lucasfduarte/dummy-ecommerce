import "./styles.css";
import Grid from "@mui/material/Grid";
import ButtonAppBar from "../components/ButtonAppBar";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

export default function Home() {
  const { products } = useProducts();

  return (
    <div className="App">
      <ButtonAppBar />

      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 9
        }}
      >
        {products &&
          products.length &&
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </Grid>
    </div>
  );
}
