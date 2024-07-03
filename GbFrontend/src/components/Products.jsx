import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProductItem = styled.div`
  flex: 1 1 650px;
  margin: 10px;
`;

const Products = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      makeRequest.get("/products").then((res) => {
        return res.data;
      }),
  });

  return (
    <Container>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data &&
        data.map((product) => (
          <ProductItem key={product.id}>
            <Product product={product} />
          </ProductItem>
        ))}
    </Container>
  );
};

export default Products;
