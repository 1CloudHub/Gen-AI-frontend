// in config.js
import { createChatBotMessage, createCustomMessage } from "react-chatbot-kit";
import MybotAvatar from "./MybotAvatar";
import OptionList from "./widgets/OptionList";
import "./chatbot.css";
import Credits from "./MessageTemplates/Credits";
import Prompts from "./Templates/Prompts";
import HeaderIcon from "./Templates/Header/HeaderIcon";
import Header from "./Templates/Header/Header";

// const botName = "F.R.I.D.A.Y";

const botName = "Cost Whisperer";

const config = {
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}`, {
      loading: true,
      terminateLoading: true,
      withAvatar: true,
      widget: "headericon",
      // widget: "Loader"
    }),
    createChatBotMessage("How can I help you?", {
      withAvatar: true,
      delay: 400,
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
    header: (props) => <Header {...props} />,
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
    {
      widgetName: "headericon",
      widgetFunc: (props) => <HeaderIcon {...props} />,
      mapStateToProps: ["messages"],
    },
  ],
};

export default config;
