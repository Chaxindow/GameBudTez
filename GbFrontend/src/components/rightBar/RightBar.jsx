import "./rightBar.scss";

const RightBar = () => {
  return <div className="rightBar">
    <div className="container">
      <div className="item">
        <span>Tanıyor olabileceğin kişiler</span>
        <div className="user">
          <div className="userInfo">
            <img src="/images/metepp.jpg" alt="" />
            <span>Mete Çalışkan</span>
          </div>
          <div className="buttons">
            <button>takip et</button>
            <button>reddet</button>
          </div>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src="/images/metepp.jpg" alt="" />
            <span>Mete Çalışkan</span>
          </div>
          <div className="buttons">
            <button>takip et</button>
            <button>reddet</button>
          </div>
        </div>
      </div>
      <div className="item">
        <span>Son Hareketler</span>
        <div className="user">
          <div className="userInfo">
            <img src="/images/metepp.jpg" alt="" />
            <p>
              <span>Mete Çalışkan </span> profil fotoğrafını güncelledi
            </p>
          </div>
          <span>1 dk önce</span>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src="/images/metepp.jpg" alt="" />
            <p>
              <span>Mete Çalışkan </span> profil fotoğrafını güncelledi
            </p>
          </div>
          <span>1 dk önce</span>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src="/images/metepp.jpg" alt="" />
            <p>
              <span>Mete Çalışkan </span> profil fotoğrafını güncelledi
            </p>
          </div>
          <span>1 dk önce</span>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src="/images/metepp.jpg" alt="" />
            <p>
              <span>Mete Çalışkan </span> profil fotoğrafını güncelledi
            </p>
          </div>
          <span>1 dk önce</span>
        </div>
      </div>
      <div className="item">
        <span>Çevrimiçi</span>
        <div className="user">
          <div className="userInfo">
            <img src="/images/metepp.jpg" alt="" />
              <div className="online"/>
              <span>Mete Çalışkan </span>
          </div>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src="/images/metepp.jpg" alt="" />
              <div className="online"/>
              <span>Mete Çalışkan </span>
          </div>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src="/images/metepp.jpg" alt="" />
              <div className="online"/>
              <span>Mete Çalışkan </span>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default RightBar;
