import React, { useState } from "react";

const ChatBotMessageForm = (props) => {
  return (
    <>
      {props.message}
      <div style={{ position: "relative" }}>
        <h1 className="bottom-count">
          {props.remaining}/{props.total}
        </h1>
        <label
          className={
            Number(props.remaining) <= 0
              ? "bottom-count-danger"
              : "bottom-count-success"
          }
        >
          {" "}
        </label>
      </div>
    </>
  );
};

export default ChatBotMessageForm;
