import { useEffect, useState } from "react";
import "./conversation.scss";
import { makeRequest } from "../../axios";

export default function Conversation({ conversation, currentUser }) {
  const defaultPicture = "/images/pngegg.png";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.memberIds.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await makeRequest.get("/users/find/" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation" key={conversation.id}>
      <img
        className="conversationImg"
        src={
          user && "/upload/" + user.profilePic
            ? "/upload/" + user.profilePic
            : defaultPicture
        }
        alt=""
      />
      <span className="conversationName">{user && user.name}</span>
    </div>
  );
}
