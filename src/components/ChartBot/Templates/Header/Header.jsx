import { memo } from "react";
import { Icon } from "@iconify/react";

const Header = ({ infoBox, setState }) => {
  const botName = "Cost Whisperer";

  return (
    <div className="header">
      <p className="header-text">{botName}</p>
    </div>
  );
};

export default memo(Header);
