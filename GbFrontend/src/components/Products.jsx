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
      <div className="products">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {data && (
          <ul>
            {data.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
};

export default Products;
