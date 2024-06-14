import React, { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { AuthContext } from "../../context/authContext";
import "./message.scss";
import { makeRequest } from "../../axios";

export default function Message({ message, own }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            own
              ? `/upload/${currentUser.profilePic}` // Eğer mesaj currentUser tarafından gönderilmişse
              : `/upload/${message.profilePic}` // Eğer mesaj başkası tarafından gönderilmişse (ör. message içinde sender id'si varsa)
          }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
