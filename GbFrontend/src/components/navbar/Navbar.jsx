import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Button } from "@mui/material";
import { makeRequest } from "../../axios";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await makeRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>GameBud</span>
        </Link>

        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <HomeOutlinedIcon style={{ color: "inherit", marginTop: "6px" }} />
        </Link>

        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} cursor="pointer" />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} cursor="pointer" />
        )}
        <GridViewOutlinedIcon />
        <StoreOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Bul beni..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src={"/upload/" + currentUser.profilePic} alt="" />
          <Link
            to={`/profile/${currentUser.userId}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span>{currentUser.name}</span>
          </Link>
          <Button color="inherit" onClick={handleLogout}>
            Çıkış
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
