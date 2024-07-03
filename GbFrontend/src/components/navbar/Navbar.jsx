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
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Button } from "@mui/material";
import { makeRequest } from "../../axios";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      return;
    }

    try {
      // API isteği yapılıyor
      const response = await makeRequest.get(`/users/find/name/${searchTerm}`);
      if (response.data) {
        // Kullanıcı bulunduysa
        const userId = response.data.id;
        // Kullanıcı profil sayfasına yönlendirme yapılıyor
        window.location.href = `/profile/${userId}`;
      } else {
        // Kullanıcı bulunamazsa uygun bir mesaj gösterilebilir
        console.log("Kullanıcı bulunamadı");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  console.log(searchTerm);

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
        <Link to="/store" style={{ textDecoration: "none", color: "inherit" }}>
          <StoreOutlinedIcon style={{ color: "inherit", marginTop: "6px" }} />
        </Link>

        <div className="search">
          <SearchOutlinedIcon />
          <input
            type="text"
            placeholder="Bul beni..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button variant="contained" onClick={handleSearch}>
            Ara
          </Button>
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <Link
          to="/messenger"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <EmailOutlinedIcon style={{ color: "inherit", marginTop: "6px" }} />
        </Link>
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src={"/upload/" + currentUser.profilePic} alt="" />
          <Link
            to={`/profile/${currentUser.id}`}
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
