// in config.js
import { createChatBotMessage, createCustomMessage } from "react-chatbot-kit";
import MybotAvatar from "./MybotAvatar";
import OptionList from "./widgets/OptionList";
import "./chatbot.css";
import Credits from "./MessageTemplates/Credits";
import Prompts from "./Templates/Prompts";

// const botName = "F.R.I.D.A.Y";

const botName = "Cost Whisperer";

const config = {
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}`, {
      loading: true,
      terminateLoading: true,
      withAvatar: true,
      // widget: "Loader"
    }),
    createChatBotMessage("How can I help you?", {
      withAvatar: true,
      delay: 400,
      widget: "OptionList",
      loading: true,
      terminateLoading: true,
    }),
  ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#555556",
    },
    chatButton: {
      backgroundColor: "#141416",
    },
  },
  state: {
    myCustomProperty: "Bikershorts",
  },
  customComponents: {
    botAvatar: (props) => <MybotAvatar {...props} />,
    header: () => (
      <div className="header">
        <p className="header-text">Conversation with {botName}</p>
        {/* <FaHistory className='history-icon'/> */}
      </div>
    ),
  },
  widgets: [
    {
      widgetName: "OptionList",
      widgetFunc: (props) => <OptionList {...props} />,
      mapStateToProps: ["messages"],
    },
    {
      widgetName: "messageParser",
      widgetFunc: (props) => <Prompts {...props} />,
      mapStateToProps: ["gist", "infoBox"],
    },
  ],
};

export default config;
