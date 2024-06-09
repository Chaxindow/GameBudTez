import { useEffect, useRef, useState } from "react";
import "./chats.scss";
import EmojiPicker from "emoji-picker-react";
import { Link } from "react-router-dom";

export const Chats = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className="chats">
      <div className="top">
        <div className="user">
          <img src="../../../images/metepp.jpg" alt="pp" />
          <div className="texts">
            <span>Mete</span>
            <p>ME GUSTALO Vİ ANDA GUSTAS</p>
          </div>
        </div>

        <div className="icons">
          <img src="../../../images/call.png" alt="" />
          <img src="../../../images/video.png" alt="" />
          <img src="../../../images/info.png" alt="" />
        </div>
      </div>

      <div className="center">
        <div className="message">
          <img src="../../../images/info.png" />
          <div className="texts">
            <p>
              Merhaba mete bugun live chatt app yapıyorsun ve ço
              ksıcakkkkkkkkkkk
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message">
          <img src="../../../images/info.png" />
          <div className="texts">
            <p>
              Merhaba mete bugun live chatt app yapıyorsun ve ço
              ksıcakkkkkkkkkkk
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message">
          <img src="../../../images/info.png" />
          <div className="texts">
            <p>
              Merhaba mete bugun live chatt app yapıyorsun ve ço
              ksıcakkkkkkkkkkk
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <img src="../../../images/info.png" />
          <div className="texts">
            <p>
              Merhaba mete bugun live chatt app yapıyorsun ve ço
              ksıcakkkkkkkkkkk
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message">
          <img src="../../../images/info.png" />
          <div className="texts">
            <p>
              Merhaba mete bugun live chatt app yapıyorsun ve ço
              ksıcakkkkkkkkkkk
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <img src="../../../images/info.png" />
          <div className="texts">
            <p>
              Merhaba mete bugun live chatt app yapıyorsun ve ço
              ksıcakkkkkkkkkkk
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="../../../images/galery.png" alt="" />
          <img src="../../../images/phorograph.png" alt="" />
          <img src="../../../images/microphone.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Tpype a messsages"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="../../../images/emoji.png"
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chats;
