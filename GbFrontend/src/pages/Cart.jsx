import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import StoreNavbar from "../components/StoreNavbar";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  margin: 0px 5px;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const { currentUser } = useContext(AuthContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    isLoading: cartLoading,
    error: cartError,
    data: cartItems,
  } = useQuery({
    queryKey: ["cart", currentUser.id],
    queryFn: async () => {
      try {
        const response = await makeRequest.get(`/cart/${currentUser.id}`);
        return response.data;
      } catch (error) {
        throw new Error("Error fetching cart items");
      }
    },
  });

  const {
    isLoading: detailsLoading,
    error: detailsError,
    data: productDetails,
  } = useQuery({
    queryKey: ["productDetails"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/products");
        // ProductDetails'ı productId'lerine göre düzenlemek için bir objeye dönüştürüyoruz
        const detailsMap = {};
        response.data.forEach((product) => {
          detailsMap[product.id] = product;
        });
        return detailsMap;
      } catch (error) {
        throw new Error("Error fetching product details");
      }
    },
  });

  const calculateTotalPrice = () => {
    if (!cartItems || !productDetails) return 0;
    let total = 0;
    cartItems.forEach((item) => {
      const product = productDetails[item.productId];
      if (product) {
        total += parseInt(item.quantity) * parseInt(product.price);
      }
    });
    return total;
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cartItems, productDetails]);

  const stripePromise = loadStripe(
    "pk_test_51OTiP7JqZiK5gb9STAFpgaUTATZsHyp4EDM0bplApuXUMZoGe5fKoJ5Gx5YhB4y1eXk5Lv67jACjeAh9yfLvp8fN00RmyRjI7A"
  );

  const handleCheckout = async () => {
    try {
      if (!cartItems || cartItems.length === 0) {
        throw new Error("Sepetiniz boş.");
      }

      const stripe = await stripePromise;

      // Line items oluşturma
      const lineItems = cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: productDetails[item.productId].title,
            description: productDetails[item.productId].description,
            images: [productDetails[item.productId].img], // Opsiyonel: Ürün resmi
          },
          unit_amount: parseInt(productDetails[item.productId].price) * 100,
        },
        quantity: parseInt(item.quantity),
      }));

      console.log(lineItems);

      // API endpoint'i ve istek
      const response = await fetch(
        "http://localhost:8800/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lineItems }),
        }
      );

      // Yanıtı JSON olarak al
      const data = await response.json();

      // Stripe checkout sayfasına yönlendirme
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <Container>
      <StoreNavbar />
      <Announcement />
      <Wrapper>
        <Title>Sepetiniz</Title>
        {cartItems && cartItems.length === 0 ? (
          <Top>Sepetinize ürün yok</Top>
        ) : (
          <Top>
            <TopButton>Alışverişe Devam Et</TopButton>

            <TopTexts>
              <TopText>Sepetiniz({cartItems ? cartItems.length : 0})</TopText>
            </TopTexts>
          </Top>
        )}
        <Bottom>
          <Info>
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => {
                const product = productDetails[item.productId];
                return (
                  <Product key={item.productId}>
                    <ProductDetail>
                      <Image src={product.img} />
                      <Details>
                        <ProductName>
                          <b>Oyun:</b> {product.title}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product.id}08217423
                        </ProductId>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <ProductAmount>{item.quantity} Adet</ProductAmount>
                      </ProductAmountContainer>
                      <ProductPrice>{product.price}</ProductPrice>
                    </PriceDetail>
                  </Product>
                );
              })}
          </Info>

          <Summary>
            <SummaryTitle>Sipariş Özeti</SummaryTitle>
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => {
                const product = productDetails[item.productId];
                const productTotalPrice =
                  parseInt(item.quantity) * parseInt(product.price);

                return (
                  <SummaryItem key={item.productId}>
                    <SummaryItemText>
                      {product.title} x {item.quantity}
                    </SummaryItemText>
                    <SummaryItemPrice>{productTotalPrice} TL</SummaryItemPrice>
                  </SummaryItem>
                );
              })}

            <SummaryItem type="total">
              <SummaryItemText>Toplam</SummaryItemText>
              <SummaryItemPrice>{totalPrice} TL</SummaryItemPrice>
            </SummaryItem>
            <Button style={{ cursor: "pointer" }} onClick={handleCheckout}>
              Ödeme Yap
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
