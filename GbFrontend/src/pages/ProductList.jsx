import styled from "styled-components";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import StoreNavbar from "../components/StoreNavbar";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const ProductList = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      makeRequest.get("/products").then((res) => {
        return res.data;
      }),
  });

  return (
    <Container>
      <StoreNavbar />
      <Announcement />
      <Title>Oyunlar </Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtre:</FilterText>
          {data && (
            <Select>
              {data.map((product) => (
                <Option key={product.id} value={product.title}>
                  {product.title}
                </Option>
              ))}
            </Select>
          )}
        </Filter>
        <Filter></Filter>
      </FilterContainer>
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
