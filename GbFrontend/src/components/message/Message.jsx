import React, { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { AuthContext } from "../../context/authContext";
import "./message.scss";
import { makeRequest } from "../../axios";

export default function Message({ message, own }) {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        // Assuming message.sender is directly the senderId
        const friendId =
          message.sender !== currentUser.id ? message.sender : null;
        if (friendId) {
          const res = await makeRequest.get(`/users/find/${friendId}`);
          setUser(res.data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    getUser();
  }, [currentUser, message]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            own
              ? `/upload/${currentUser.profilePic}`
              : user
              ? `/upload/${user.profilePic}`
              : "/images/pngegg.png"
          }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
