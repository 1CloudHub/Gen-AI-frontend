// in MessageParser.js
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes("delete")) {
      actions.deleteRecord();
    } else if (message === "Prompts Library") {
      actions.promptsLibrary();
    } else {
      actions.handleCustom(message, children.props.botName);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
