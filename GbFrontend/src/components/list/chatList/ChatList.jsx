import { useState } from "react";
import "./chatlist.scss";
import AddUser from "./addUser/addUser";

export const ChatList = () => {
  const [addMode, setAddMode] = useState(false);

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="../../../../images/search.png" alt="more" />
          <input type="text" placeholder="Search"></input>
        </div>
        <img
          src={
            addMode
              ? "../../../../images/minus.png"
              : "../../../../images/plus.png"
          }
          onClick={() => setAddMode((prev) => !prev)}
          alt="more"
          className="add"
        />
      </div>
      <div className="item">
        <img src="../../../../images/yigitpp.jpg" />
        <div className="texts">
          <span>joe doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="../../../../images/yigitpp.jpg" />
        <div className="texts">
          <span>joe doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="item">
        <img src="../../../../images/yigitpp.jpg" />
        <div className="texts">
          <span>joe doe</span>
          <p>Hello</p>
        </div>
      </div>
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
