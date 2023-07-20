import React from "react";
import "./chatbot.css";

export const Loading = () => {
  return (
    <div className="bouncing-loader">
      <div className="dots"></div>
      <div className="dots"></div>
      <div className="dots"></div>
    </div>
  );
};

export default Loading;
