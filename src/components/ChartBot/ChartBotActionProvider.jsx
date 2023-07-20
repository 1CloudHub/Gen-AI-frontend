// in ActionProvider.jsx
import React, { useContext, useState } from "react";
import { smallCase } from "../custom_hook/CustomHook";
import { useChatContext } from "react-chatbot-kit";
import { createCustomMessage } from "react-chatbot-kit";
import Credits from "./MessageTemplates/Credits";
import CreditRequest from "./MessageTemplates/CreditRequest";
import Loading from "./Loading";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const deleteRecord = () => {
    // children.props.children.props.state.messages.pop();
    // const botMessage = children.props.children.props.state.messages;
    setState((prev) => ({
      ...prev,
      messages: prev.messages.slice(0, -1),
    }));
  };

  const cloudCustomPrompts = (message) => {
    console.log("testing");
  };

  const handleLoader = () => {
    const botMessage = createChatBotMessage(<Loading />);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const ChatbotMessage = (message) => {
    deleteRecord();
    const botMessage = createChatBotMessage(message, {
      loading: true,
      terminateLoading: true,
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  function generateTransactionId(length) {
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let transactionId = "";

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      transactionId += characters.charAt(randomIndex);
    }

    return transactionId;
  }
  const promptsLibrary = () => {
    const messages = createChatBotMessage(
      "Prompts library to open on the right side",
      { widget: "messageParser", withAvatar: true }
    );
    addMessageToBotState(messages);
  };
  const addMessageToBotState = (messages, newState) => {
    if (Array.isArray(messages)) {
      setState((state) => ({
        ...state,
        ...newState,
        messages: [...state.messages, ...messages],
        gist: "",
        infoBox: "",
      }));
    } else {
      setState((state) => ({
        ...state,
        ...newState,
        messages: [...state.messages, messages],
        gist: "",
        infoBox: "",
      }));
    }
  };
  const handleCustom = (message, botName) => {
    if (message === "Prompts Library") {
      promptsLibrary();
    } else {
      handleLoader();
      const companyName = "tvs";
      // console.log(companyName);
      //limit
      var myHeaders = new Headers();
      myHeaders.append("X-API-Key", "AIzaSyCeySsUPu30lQw3sHUZ3ugMDuTyehZy3q0");
      myHeaders.append("Content-Type", "application/json");
      // myHeaders.append(
      //   "Origin",
      //   "https://staging2.d1a9gn85io583z.amplifyapp.com"
      // );
      // myHeaders.append(
      //   "Authorization",
      //   "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjkzNDFkZWRlZWUyZDE4NjliNjU3ZmE5MzAzMDAwODJmZTI2YjNkOTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA1NDY5OTkwOTk2MzQzNTMzMjU5IiwiaGQiOiIxY2xvdWRodWIuY29tIiwiZW1haWwiOiJyYWplZXZAMWNsb3VkaHViLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiTTlSenB1NzNmelpBRGR0YWZYV2EtQSIsIm5iZiI6MTY4ODk2OTM5MiwiaWF0IjoxNjg4OTY5NjkyLCJleHAiOjE2ODg5NzMyOTIsImp0aSI6Ijc2YWFjNjdiNGQ2YjIzZmIyYzcxOTliODFiYjkxNWIyYWQzMDljOTAifQ.kG2oTEnN2YRnav5D_Ck5Evsn5Q_MO4hzhNNiZZBKZBf0V5ONNHmAoeRLu5eR6kUpZmbC2XxcahTRzxcoMjEmesvNWuBT8gWlVNJJW6mhpntD_bFi386Pnxnxae1qZV85mVpU7R8YPzSu9zeRCsKXr0Qa7nrqDuHJVYUTqaos3yiHUHKrvQkIl9-05CmI1dRbKhz1d2dIna4Vh7UiI9_FnNdFmyZXRFjYXgA2jVdCtW7puF5sSl64uaUkiTDDyKFI2CziB95ECqJ9BSL0IjqUq1zmpl66cg0ZQLYKG9kgRH4UwONkt0zTboucfvqeaqnKtmLJou7mZbqfgKfWuWVcSw"
      // );
      myHeaders.append(
        "Access-Control-Allow-Origin",
        "https://demo2-cloudstudio.1cloudhub.com"
      );
      var raw = JSON.stringify({
        event_type: "credit_check",
        user_name: "demo_user",
        schema: companyName,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(
        "https://chatbot-vnew-5zs2afac.an.gateway.dev/chatbot",
        requestOptions
      )
        .then((response) => response.text())
        .then((data) => {
          var data_count = data;
          console.log(data_count);
          const total = JSON.parse(data_count).credits;
          const remaining = JSON.parse(data_count).remaining_credits;
          console.log(total);
          console.log(remaining);

          if (remaining <= 0) {
            deleteRecord();
            const botMessage = createChatBotMessage(
              <CreditRequest
                message="We have reached our limit for the day and are unable to accept further messages at the moment."
                total={total}
                remaining={0}
                ChatbotMessage={ChatbotMessage}
                handleLoader={handleLoader}
              />,
              {
                botAvatar: true,
                loading: true,
                terminateLoading: true,
              }
            );
            setState((prev) => ({
              ...prev,
              messages: [...prev.messages, botMessage],
            }));
          } else {
            var myHeaders2 = new Headers();
            myHeaders2.append(
              "x-api-key",
              "AIzaSyCeySsUPu30lQw3sHUZ3ugMDuTyehZy3q0"
            );
            myHeaders2.append("Content-Type", "application/json");

            var raw2 = JSON.stringify({
              event_type: "chat",
              user_name: "demo_user",
              schema: "tvs",
              date_time: `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()}`,
              user_session: generateTransactionId(20),
              query: message,
              ai: "vertexai",
            });

            var requestOptions2 = {
              method: "POST",
              headers: myHeaders2,
              body: raw2,
              redirect: "follow",
            };

            fetch(
              "https://chatbot-vnew-5zs2afac.an.gateway.dev/chatbot",
              requestOptions2
            )
              .then((response) => response.text())
              .then((result) => {
                var chatbot_message = JSON.parse(result).chat;
                console.log(chatbot_message);
                var myHeaders3 = new Headers();
                myHeaders3.append(
                  "x-api-key",
                  "AIzaSyCeySsUPu30lQw3sHUZ3ugMDuTyehZy3q0"
                );
                myHeaders3.append("Content-Type", "application/json");

                var raw3 = JSON.stringify({
                  event_type: "credit_check",
                  user_name: "demo_user",
                  schema: companyName,
                });

                var requestOptions3 = {
                  method: "POST",
                  headers: myHeaders3,
                  body: raw3,
                  redirect: "follow",
                };
                fetch(
                  "https://chatbot-vnew-5zs2afac.an.gateway.dev/chatbot",
                  requestOptions3
                )
                  .then((response) => response.text())
                  .then((data2) => {
                    var limit_data = data2;
                    console.log(limit_data);
                    const total = JSON.parse(limit_data).credits;
                    const remaining = JSON.parse(limit_data).remaining_credits;
                    // const total = 100;
                    // const remaining = 99;
                    deleteRecord();
                    const botMessage = createChatBotMessage(
                      <Credits
                        message={chatbot_message}
                        total={total}
                        remaining={remaining}
                      />,
                      {
                        botAvatar: true,
                        loading: true,
                        terminateLoading: true,
                      }
                    );
                    setState((prev) => ({
                      ...prev,
                      messages: [...prev.messages, botMessage],
                    }));
                  })
                  .catch((error) => console.log("error", error));
              })
              .catch((error) => {
                deleteRecord();
                const botMessage = createChatBotMessage(
                  "I'm sorry, I'm unable to comprehend your question. Can you please provide more specific information or ask a different question?",
                  {
                    loading: true,
                    terminateLoading: false,
                  }
                );
                setState((prev) => ({
                  ...prev,
                  messages: [...prev.messages, botMessage],
                }));
              });
          }
        })
        .catch((error) => {
          deleteRecord();
          console.log(error);
        });
    }
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleCustom,
            // handleHello,
            promptsLibrary,
            handleLoader,
            deleteRecord,
            ChatbotMessage,
            cloudCustomPrompts,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
