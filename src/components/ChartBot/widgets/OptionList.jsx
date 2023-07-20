import Options from "./Options";

const OptionList = (props) => {
  const botName = "Cost Whisperer";
  const options = [
    {
      name: "Prompts Library",
      handler: props.actionProvider.handleCustom,
      id: 1,
      botName: botName,
    },
  ];
  return <Options options={options} title="Options" {...props} />;
};

export default OptionList;
