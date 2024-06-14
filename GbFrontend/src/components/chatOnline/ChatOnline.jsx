import { useEffect, useState } from "react";
import "./chatOnline.scss";
import { makeRequest } from "../../axios";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  /*useEffect(() => {
    const getFriends = async () => {
      const res = await makeRequest.get("/users/find/friends/" + currentId);
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  //console.log(onlineUsers); */

  return (
    <div className="chatOnline">
      {onlineUsers.map((o) => (
        <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o.profilePic ? "/upload/" + o.profilePic : "/images/pngegg.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.name}</span>
        </div>
      ))}
    </div>
  );
}
