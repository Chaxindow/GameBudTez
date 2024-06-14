import React, { useContext, useEffect, useRef, useState } from "react";
import "./messenger.scss";
import Conversation from "../../components/conversations/Conversation";
import MessengerNavbar from "../../components/messangerNavbars/MessengerNavbar";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const { currentUser } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();
  const [tempFriends, setTempfriends] = useState([]);

  //console.log(currentUser.id);

  useEffect(() => {
    const getUsersFriends = async () => {
      try {
        const res = await makeRequest.get(
          "/users/find/friends/" + currentUser.id
        );
        setTempfriends(res.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    getUsersFriends();
  }, [currentUser.id]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  //console.log(tempFriends);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.memberIds.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // console.log(tempFriends);
  // console.log(currentUser.id); // friendsler geldi şu anki userın

  useEffect(() => {
    socket.current.emit("addUser", currentUser.id);
    socket.current.on("getUsers", (users) => {
      const filteredOnlineUsers = tempFriends.filter((f) =>
        users.some((u) => u.userId == f.id)
      );
      setOnlineUsers(filteredOnlineUsers);
      console.log(filteredOnlineUsers); // Güncellenmiş onlineUsers değerini doğrudan burada kullanabilirsiniz
    });
  }, [currentUser.id, tempFriends]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await makeRequest.get("/conversations/" + currentUser.id);
        //console.log(res);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [currentUser.id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await makeRequest.get("/messages/" + currentChat?.id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  //console.log(currentChat);

  const sendMessage = async () => {
    const message = {
      conversationId: currentChat.id,
      senderId: currentUser.id,
      text: newMessage,
    };

    // hata olabilir 1
    const receiverId = currentChat.memberIds.find(
      (member) => member !== currentUser.id
    );

    socket.current.emit("sendMessage", {
      senderId: currentUser.id,
      receiverId,
      text: newMessage,
    });

    try {
      const response = await makeRequest.post("/messages", message);

      if (!response.data || !response.data.senderId) {
        console.error(
          "Response data does not contain senderId:",
          response.data
        );
        return;
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { ...response.data, sender: response.data.senderId },
      ]);

      setNewMessage("");

      // console.log("Message sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (messages.length > 0 && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <>
      <MessengerNavbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div key={c.id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={currentUser} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  <div ref={scrollRef}>
                    {messages.map((msg) => {
                      if (!msg.sender) {
                        console.error(
                          `msg.sender is undefined or null for message with id ${msg.id}`
                        );
                      }
                      return (
                        <Message
                          key={msg.id}
                          message={msg}
                          own={msg.sender === currentUser.id}
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <span className="noConversationText">Chat Olustur</span>
            )}
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="Write something ..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
            <button className="chatSubmitButton" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={currentUser.id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
