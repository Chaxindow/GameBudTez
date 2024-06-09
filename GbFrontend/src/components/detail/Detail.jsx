import { Link } from "react-router-dom";
import "./detail.scss";

export const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src="../../../images/metepp.jpg" alt="" />
        <h2>Mete pp</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Setting</span>
            <img src="../../../images/arrowUP.png" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="../../../images/arrowUP.png" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="../../../images/arrowDown.png" />
          </div>
        </div>
        <button>Block user</button>
        <button className="logout">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <span>Back GameBud</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Detail;
