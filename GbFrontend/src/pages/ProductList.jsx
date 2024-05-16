import styled from "styled-components";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import StoreNavbar from "../components/StoreNavbar";

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
  return (
    <Container>
      <StoreNavbar />
      <Announcement />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtre:</FilterText>
          
          <Select>
            <Option disabled selected>
              Oyunlar
            </Option>
            <Option>EA FC 24</Option>
            <Option>CS GO</Option>
            <Option>ROCKET LEAGUE</Option>
            <Option>COD</Option>
            <Option>PUBG</Option>
            <Option>VALORANT</Option>
            <Option>FORTNITE</Option>
            <Option>APEX</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sırala:</FilterText>
          <Select>
            <Option selected>En yeni</Option>
            <Option>Fiyat (artan)</Option>
            <Option>Fiyat (azalan)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;