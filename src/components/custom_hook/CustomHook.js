import moment from "moment";

export const dropDownResult = (selectedlist, selectedvalue) => {
  var checkenvironment;
  if (selectedvalue) {
    if (selectedlist.indexOf("all") === -1) {
      selectedlist.map((env_data) => {
        checkenvironment = checkenvironment
          ? eval(
              checkenvironment,
              selectedvalue.toLowerCase() === env_data.toLowerCase()
            )
          : eval(selectedvalue.toLowerCase() === env_data.toLowerCase());
      });
    }
  }
  return checkenvironment;
};

export const titleCase = (string) => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};

export const smallCase = (string) => {
  return string[0].toLowerCase() + string.slice(1).toLowerCase();
};

export const getRandomColor = () => {
  var letters = "0123456789ABCDEFGH";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const capitalizeFirst = (str) => {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};

export const nFormatter = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "g";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return Math.sign(num) * Math.abs(num);
};

export const searchMenuList = (e, setnewlist, oldlist) => {
  if (e.target.value) {
    const applist = oldlist.filter(
      (item) => item.toLowerCase().indexOf(e.target.value) > -1
    );
    if (applist.length > 0) {
      setnewlist(applist);
    } else {
      setnewlist([]);
    }
  } else {
    setnewlist(oldlist);
  }
};

export const disabledDate = (current) => {
  let customDate = new Date();
  return current && current > moment(customDate, "YYYY-MM-DD");
};

export const numberFormat = (number) => {
  return Math.round(number).toLocaleString();
};

export const checkRolePermission = (role_blocks) => {
  const pagepermission = localStorage.getItem(
    "CognitoIdentityServiceProvider.role"
  )
    ? JSON.parse(localStorage.getItem("CognitoIdentityServiceProvider.role"))
    : "";
  if (pagepermission) {
    const return_val = pagepermission.filter(
      (data) => data.blocks === role_blocks
    );
    if (return_val.length > 0) {
      return return_val[0];
    } else {
      return "";
    }
  } else {
    return "";
  }
};
export const useErrorNavigation = (error) => {
  if (error) {
    if (error.networkError && error.networkError.statusCode === 401) {
      localStorage.removeItem("CognitoIdentityServiceProvider.auth");
      localStorage.removeItem("_token");
      window.location.href = "/signin";
    }
  }
};
