import List from "../../components/list/list";
import Chats from "../../components/chats/Chats";
import "./chat.scss";
import Detail from "../../components/detail/Detail";

const Chat = () => {
  return (
    <div className="chat">
      <div className="subchat">
        <List />
        <Chats />
        <Detail />
      </div>
    </div>
  );
};

export default Chat;
