import { memo, useState } from "react";
// import Chatbot from "react-chatbot-kit";
import Chatbot from "react-chatbot-kit";
import config from "./chartbotconfig";
import actionProvider from "./ChartBotActionProvider.jsx";
import messageParser from "./ChatBotMessageParser.jsx";
import "react-chatbot-kit/build/main.css";
import "./chatbot.css";
import { Icon } from "@iconify/react";

const ChartBot = () => {
  const [showBot, toggleBot] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <div className="App">
        <div style={{ textAlign: "right" }}>
          <Icon
            icon="material-symbols:logout"
            className="logout-btn"
            onClick={() => handleLogout()}
          />
        </div>
        {showBot && (
          <div className="chatbot">
            <Chatbot
              config={config}
              actionProvider={actionProvider}
              messageParser={messageParser}
              messageHandler={true}
            />
          </div>
        )}
        <div className="chatbutton">
          {!showBot ? (
            <Icon
              icon="simple-icons:chatbot"
              className="chat-icon"
              onClick={() => toggleBot((prev) => !prev)}
            />
          ) : (
            <Icon
              icon="fontisto:close"
              className="chat-icon"
              onClick={() => toggleBot((prev) => !prev)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default memo(ChartBot);
