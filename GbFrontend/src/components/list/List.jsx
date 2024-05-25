import "./list.scss";
import ChatList from "./chatList/ChatList";
import UserInfo from "./userInfo/UserInfo";

export const List = () => {
  return (
    <div className="list">
      <UserInfo />
      <ChatList />
    </div>
  );
};

export default List;
