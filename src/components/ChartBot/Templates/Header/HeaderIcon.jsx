import { memo } from "react";
import { Icon } from "@iconify/react";
import { Tooltip } from "antd";

const HeaderIcon = (props) => {
  return (
    <>
      <div className="chatbot-header-icon-body">
        <Tooltip placement="bottom" title="Prompts Library">
          <Icon
            icon="ion:library"
            className="chatbot-header-icon"
            // style={{ color: "#fff" }}
            onClick={() => props.actionProvider.handleCustom("Prompts Library")}
          />
        </Tooltip>
      </div>
    </>
  );
};

export default memo(HeaderIcon);
