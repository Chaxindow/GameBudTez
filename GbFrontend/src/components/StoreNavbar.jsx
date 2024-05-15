import React from 'react';
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from "react-router-dom";


const Container = styled.div`
  height: 60px;
  
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
 
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  
`;

const StoreNavbar = () => {
  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>TR</Language>
                <SearchContainer>
                    <Input placeholder="Bul beni..." />
                    <SearchOutlinedIcon style={{ color: "gray", fontSize: 16 }}/>
                </SearchContainer>
            </Left>
            <Center>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Logo>GameBud</Logo>
                </Link>
            </Center>
            <Right>
                
                <MenuItem>
                
                    <ShoppingCartOutlined />
                    
                </MenuItem>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default StoreNavbar