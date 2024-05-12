import "./leftBar.scss";
import Friends from "/images/1.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={"/upload/" + currentUser.profilePic} alt="" />
            <Link
              to={`/profile/${currentUser.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span>{currentUser.name}</span>
            </Link>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
