import styled from "styled-components";
  import FacebookIcon from '@mui/icons-material/Facebook';
  import InstagramIcon from '@mui/icons-material/Instagram';
  import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
  import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import PhoneAndroidOutlined from "@mui/icons-material/PhoneAndroidOutlined";
import MailOutlined from "@mui/icons-material/MailOutlined";
import { Link } from "react-router-dom";
  
  const Container = styled.div`
    display: flex;
    
  `;
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;
  
  const Logo = styled.h1``;
  
  const Desc = styled.p`
    margin: 20px 0px;
  `;
  
  const SocialContainer = styled.div`
    display: flex;
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
    
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
  `;
  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
   
  
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  
  const Payment = styled.img`
      width: 50%;
  `;
  
  const Footer = () => {
    return (
      <Container>
        <Left>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Logo>GameBud</Logo>
                </Link>
          <Desc>
            
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <FacebookIcon />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <InstagramIcon />
            </SocialIcon>
            
          </SocialContainer>
          <Date></Date>
        </Left>
        <Center>
          <Title>Linkler</Title>
          <List>
            <Link to="/store" style={{ textDecoration: "none", color: "inherit", }}>
            <ListItem style={{ paddingRight: "174px" }}>Mağaza</ListItem>
            </Link>
            
            <ListItem>Sepet</ListItem>

            <ListItem>Sosyal</ListItem>
            <ListItem>Favoriler</ListItem>
            
          </List>
          
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <PhoneAndroidOutlined style={{marginRight:"10px"}}/> +90 535 213 5465
          </ContactItem>
          <ContactItem>
            <MailOutlined style={{marginRight:"10px"}} /> gamebud77@gmail.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />

          
        </Right>
      </Container>
    );
  };
  
  export default Footer;