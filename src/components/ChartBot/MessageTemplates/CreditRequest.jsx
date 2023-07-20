import React, { useState, setState } from "react";
// import { useDispatch } from "react-redux";
// import { requestCredits } from "../ChatbotApiCalls";
import { createChatBotMessage } from "react-chatbot-kit";

const CreditRequest = (props) => {
  // const dispatch = useDispatch();
  const sendRequest = () => {
    const userId = localStorage.getItem("CognitoIdentityServiceProvider.auth");
    props.handleLoader();
    // console.log(userId);
    // dispatch(requestCredits(userId))
    //   .unwrap()
    //   .then(({ data }) => {
    //     console.log(data);
    //     props.ChatbotMessage(
    //       "Your request has been sent successfuly. Our executive will get contact you soon."
    //     );
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <>
      {props.message}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "coloumn",
          margin: "10px 0px 0px 0px",
        }}
      >
        <button
          style={{ width: "120px", borderradius: "10px", border: "none" }}
          onClick={() => sendRequest()}
        >
          Request Credit
        </button>
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
            style={{ top: "10px" }}
          >
            {" "}
          </label>
        </div>
      </div>
    </>
  );
};

export default CreditRequest;
