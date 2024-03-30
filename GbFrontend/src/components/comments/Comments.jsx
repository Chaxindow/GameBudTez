import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { Link } from 'react-router-dom';

const Comments = () => {
  const { currentUser } = useContext(AuthContext);
  //Temporary
  const comments = [
    {
      id: 1,
      desc: "Best game ever",
      name: "Yiğit Sağlam",
      userId: 1,
      profilePicture:
        "../images/yigitpp.jpg",
    },
    {
      id: 2,
      desc: "You're so lucky",
      name: "Mete Çalışkan",
      userId: 2,
      profilePicture:
        "../images/metepp.jpg",
    },
  ];
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="yorum yaz..." />
        <button>Gönder</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
          <Link to={`/profile/${comment.userId}`} style={{textDecoration:"none",color:"inherit" }}>
            <span>{comment.name}</span>
          </Link>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 dakika önce</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;