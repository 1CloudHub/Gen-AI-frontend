import React, { useEffect, useRef } from "react";
import { useChatContext } from "react-chatbot-kit";

function CustomChatInput() {
  const { state, setState, triggerSubmit } = useChatContext();
  const inputRef = useRef(null);

  useEffect(() => {
    // Set the default content when the component mounts
    setState((prevState) => ({
      ...prevState,
      userInput: "Default content",
    }));
  }, [setState]);

  const handleInputChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      userInput: event.target.value,
    }));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      triggerSubmit();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      type="text"
      ref={inputRef}
      value={state.userInput}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
}

export default CustomChatInput;
