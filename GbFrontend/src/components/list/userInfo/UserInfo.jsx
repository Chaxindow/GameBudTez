import "./userInfo.scss";

export const UserInfo = () => {
  return (
    <div className="userInfo">
      <div className="user">
        <img src="../../../../images/dummy_avatar.png" alt="resim" />
        <h2>Mete</h2>
      </div>
      <div className="icons">
        <img src="../../../../images/more.png" alt="more" />
        <img src="../../../../images/video.png" alt="video" />
        <img src="../../../../images/edit.png" alt="edit" />
      </div>
    </div>
  );
};

export default UserInfo;
