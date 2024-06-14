import { useEffect, useState } from "react";
import "./chatOnline.scss";
import { makeRequest } from "../../axios";

export default function ChatOnline({
  onlineUsers,
  currentId,
  setCurrentChat,
  conversations,
}) {
  const handleClick = async (user) => {
    try {
      const res = await makeRequest.get(
        `/conversations/find/${currentId}/${user.id}`
      );

      const convDataId = res.data[0].id;

      console.log(convDataId);
      console.log(conversations);

      const matchedConversation = res.data.find(
        (conv) => conv.id === convDataId
      );

      console.log(matchedConversation);

      setCurrentChat(matchedConversation);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatOnline">
      {onlineUsers.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
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
