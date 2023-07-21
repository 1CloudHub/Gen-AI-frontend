import React from "react";

import styles from "./InformationBox.module.css";
import { Icon } from "@iconify/react";

// import { ReactComponent as LightBulb } from "../../../../assets/icons/lightbulb-on.svg";
// import { ReactComponent as Cross } from "../../../../assets/icons/times-circle.svg";

const InformationBox = ({ children, setState, cloudstatus, cloudtype }) => {
  return (
    <div className={styles.informationBox}>
      {/* <button
        className={styles.closeMessageBox}
       
      > */}
      <Icon
        className={styles.closeMessageBox}
        icon="carbon:close-outline"
        onClick={() => setState((state) => ({ ...state, infoBox: "" }))}
      />
      {/* </button> */}
      {/* <LightBulb className={styles.informationBoxLogo} /> */}
      <div className={styles.informationBoxContent}>{children}</div>
    </div>
  );
};

export default InformationBox;
