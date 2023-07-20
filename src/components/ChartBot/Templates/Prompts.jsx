import React, { useEffect, useState } from "react";
import { FadeIn } from "react-anim-kit";
import { ConditionallyRender } from "react-util-kit";
import { useChatContext, createChatBotMessage } from "react-chatbot-kit";
// import { ReactComponent as MessageParserOverview } from "../../../../../assets/img/message-parser-overview.svg";

import styles from "./InformationBox/InformationBox.module.css";
import InformationBox from "./InformationBox/InformationBox";
import CreditRequest from "../MessageTemplates/CreditRequest";
import Credits from "../MessageTemplates/Credits";
import Loading from "../Loading";

const Prompts = ({ infoBox, setState }) => {
  const [cloudstatus, setCloudStatus] = useState(true);
  const [cloudtype, setCloudType] = useState("");
  const [promptslist, setPromptsList] = useState("");
  //   const { setState } = useChatContext();

  useEffect(() => {
    setState((state) => ({
      ...state,
      infoBox: "messageParser",
    }));
  }, [setState]);

  const onclickCloudtype = (type) => {
    setCloudStatus(false);
    setCloudType(type);
  };

  const onclickCloudPrompts = (message) => {
    handleLoader();
    const companyName = "tvs";
    // console.log(companyName);
    //limit
    var myHeaders = new Headers();
    myHeaders.append("X-API-Key", "AIzaSyCeySsUPu30lQw3sHUZ3ugMDuTyehZy3q0");
    myHeaders.append("Content-Type", "application/json");
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

          const message_1 = createChatBotMessage(
            <CreditRequest
              message="We have reached our limit for the day and are unable to accept further messages at the moment."
              total={total}
              remaining={0}
              ChatbotMessage={ChatbotMessage}
              handleLoader={handleLoader}
            />
          );
          addMessageToBotState(message_1);
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
                  deleteRecord();
                  var limit_data = data2;
                  const total = JSON.parse(limit_data).credits;
                  const remaining = JSON.parse(limit_data).remaining_credits;
                  // const total = 100;
                  // const remaining = 99;
                  const message_1 = createChatBotMessage(
                    <Credits
                      message={chatbot_message}
                      total={total}
                      remaining={remaining}
                    />
                  );
                  addMessageToBotState(message_1);
                })
                .catch((error) => console.log("error", error));
            })
            .catch((error) => {
              deleteRecord();

              const message_1 = createChatBotMessage(
                "I'm sorry, I'm unable to comprehend your question. Can you please provide more specific information or ask a different question?"
              );
              addMessageToBotState(message_1);
            });
        }
      })
      .catch((error) => {
        deleteRecord();

        const message_1 = createChatBotMessage(
          "I'm sorry, I'm unable to comprehend your question. Can you please provide more specific information or ask a different question?"
        );
        addMessageToBotState(message_1);
      });
  };
  const ChatbotMessage = (message) => {
    const message_1 = createChatBotMessage(message);
    addMessageToBotState(message_1);
  };
  const addMessageToBotState = (message) => {
    setState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  };
  const handleLoader = () => {
    const message_1 = createChatBotMessage(<Loading />);
    addMessageToBotState(message_1);
  };

  const deleteRecord = () => {
    setState((prev) => ({
      ...prev,
      messages: prev.messages.slice(0, -1),
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
  const showMessageParserInfoBox = infoBox === "messageParser";

  return (
    <div className={styles.overview}>
      <FadeIn left by={250}>
        {/* <MessageParserOverview className={styles.overviewSVG} /> */}
      </FadeIn>

      <ConditionallyRender
        ifTrue={showMessageParserInfoBox}
        show={
          <InformationBox setState={setState}>
            <h1 className={styles.prompts_title}>Prompts Library</h1>
            {cloudstatus ? (
              <>
                {" "}
                <button
                  className={styles.button_6}
                  onClick={() => onclickCloudtype("gcp")}
                >
                  GCP
                </button>
                <button
                  className={styles.button_6}
                  onClick={() => onclickCloudtype("aws")}
                >
                  AWS
                </button>
              </>
            ) : (
              <>
                {cloudtype === "gcp" ? (
                  <>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "Give me the top 3 resourcename ,recommendations and potential savings that i can save based on my recommendations?"
                        )
                      }
                    >
                      Give me the top 3 resourcename ,recommendations and
                      potential savings that i can save based on my
                      recommendations?
                    </button>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "Give me top 3 applications and its cost by spend for the month june?"
                        )
                      }
                    >
                      Give me top 3 applications and its cost by spend for the
                      month june?
                    </button>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "Give me the account names which have used compute engine service?"
                        )
                      }
                    >
                      Give me the account names which have used compute engine
                      service?
                    </button>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "Give me the total spend for the service CloudStorage in TVS-GCP-Prod account for june month?"
                        )
                      }
                    >
                      Give me the total spend for the service CloudStorage in
                      TVS-GCP-Prod account for june month?
                    </button>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "Give me the total spend for the services other than Cloud Storage in TVS-GCP-Prod account for june month?"
                        )
                      }
                    >
                      Give me the total spend for the services other than Cloud
                      Storage in TVS-GCP-Prod account for june month?
                    </button>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "Give me the recommendations and potential savings available for my application ERP?"
                        )
                      }
                    >
                      Give me the recommendations and potential savings
                      available for my application ERP?
                    </button>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "What are the total cost of productcode Compute Engine by its categories and sort by highest to lowest?"
                        )
                      }
                    >
                      What are the total cost of productcode Compute Engine by
                      its categories and sort by highest to lowest?
                    </button>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "Give me the total spend for the services other than CloudStorage in TVS-GCP-Prod account for june month?"
                        )
                      }
                    >
                      Give me the total spend for the services other than
                      CloudStorage in TVS-GCP-Prod account for june month?
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "Give me top 3 applications and its cost by spend for the month june?"
                        )
                      }
                    >
                      Give me top 3 applications and its cost by spend for the
                      month june?
                    </button>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "Give me the regions of the application finnone?"
                        )
                      }
                    >
                      Give me the regions of the application finnone?
                    </button>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "Give me the account names which have used AmazonEc2 service?"
                        )
                      }
                    >
                      give me the account names which have used AmazonEc2
                      service?
                    </button>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "Give me the names of service used in the account fs-prod-business for the month june?"
                        )
                      }
                    >
                      Give me the names of service used in the account
                      fs-prod-business for the month june?
                    </button>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "Give me the total spend for the service S3 in fs-prod-business account for june month?"
                        )
                      }
                    >
                      Give me the total spend for the service S3 in
                      fs-prod-business account for june month?
                    </button>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "Give me the total spend for the services other than S3 in fs-prod-business account for june month?"
                        )
                      }
                    >
                      Give me the total spend for the services other than S3 in
                      fs-prod-business account for june month?
                    </button>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "Give me the recommendations and potential savings available for my application finnone?"
                        )
                      }
                    >
                      Give me the recommendations and potential savings
                      available for my application finnone?
                    </button>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "Give me the top 3 resourcename ,recommendations based on potential savings for the month may?"
                        )
                      }
                    >
                      Give me the top 3 resourcename ,recommendations based on
                      potential savings for the month may?
                    </button>
                    <button
                      className={styles.button_6}
                      onClick={() =>
                        onclickCloudPrompts(
                          "What are the total cost of productcode Amazon EC2 by its categories and sort by highest to lowest?"
                        )
                      }
                    >
                      What are the total cost of productcode Amazon EC2 by its
                      categories and sort by highest to lowest?
                    </button>
                  </>
                )}
              </>
            )}
          </InformationBox>
        }
      />
    </div>
  );
};

export default Prompts;
