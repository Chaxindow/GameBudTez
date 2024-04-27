import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  //Temp
  const stories = [
    {
      id: 1,
      name: "Yiğit Sağlam",
      img: "./images/Eafc24ultimate.jpg",
    },
    {
      id: 2,
      name: "Yiğit Sağlam",
      img: "./images/Eafc24ultimate.jpg",
    },
    {
      id: 3,
      name: "Yiğit Sağlam",
      img: "./images/Eafc24ultimate.jpg",
    },
    {
      id: 4,
      name: "Yiğit Sağlam",
      img: "./images/Eafc24ultimate.jpg",
    },
  ];
  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
