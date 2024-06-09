import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import StoreNavbar from "../components/StoreNavbar";
import Newsletter from "../components/Newsletter";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid red;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const { productId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);

  const { isLoading, error, data } = useQuery({
    queryKey: ["product", productId],
    queryFn: () =>
      makeRequest.get(`/products/find/${productId}`).then((res) => {
        return res.data[0];
      }),
  });

  const handleAddToCart = async () => {
    try {
      console.log(currentUser.id);
      console.log(productId);

      const response = await makeRequest.post("/cart/add", {
        userId: currentUser.id,
        productId: productId,
        quantity: quantity,
      });
      // window.location.href = "/sepet";
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <Container>
      <StoreNavbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>{data && <Image src={data.img} />}</ImgContainer>
        <InfoContainer>
          <Title> {data && data.title} </Title>
          <Desc>{data && data.description}</Desc>
          <Price>{data && data.price}</Price>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={decrement} />
              <Amount>{quantity}</Amount>
              <AddIcon onClick={increment} />
            </AmountContainer>
            <Button onClick={handleAddToCart}>Sepete Ekle</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
