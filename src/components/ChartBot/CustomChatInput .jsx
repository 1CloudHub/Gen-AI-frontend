import React, { useState } from "react";

const CustomChatInput = ({ onMessageSubmit }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the user message to the onMessageSubmit function in the parent component
    onMessageSubmit(message);
    // Clear the input field after submission
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type your message here..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default CustomChatInput;
