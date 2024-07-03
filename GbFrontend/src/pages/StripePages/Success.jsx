import React from "react";
import { useNavigate } from "react-router-dom";
import "./Success.scss";

const Success = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/store");
  };

  return (
    <div className="success-container">
      <div className="success-content" onClick={handleClick}>
        <h2>Ödeme İşlemi Başarılı</h2>
        <p>Satın alımınız için teşekkürler</p>
        <div>Mağazaya Dön</div>
      </div>
    </div>
  );
};

export default Success;
