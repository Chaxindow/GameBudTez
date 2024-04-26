import "./leftBar.scss";
import Friends from "/images/1.png";
import Groups from "/images/2.png";
import Market from "/images/3.png";
import Watch from "/images/4.png";
import Memories from "/images/5.png";
import Events from "/images/6.png";
import Gaming from "/images/7.png";
import Gallery from "/images/8.png";
import Videos from "/images/9.png";
import Messages from "/images/10.png";
import Tutorials from "/images/11.png";
import Courses from "/images/12.png";
import Fund from "/images/13.png";
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
            <img src={currentUser.profilePic} alt="" />
            <Link
              to={`/profile/${currentUser.userId}`}
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
