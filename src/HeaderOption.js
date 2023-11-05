import React from "react";
import "./HeaderOption.css";
import { Avatar } from "@mui/material";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { auth } from "./firebase";
function HeaderOption({ avatar, Icon, title }) {
  const [{ user }, dispatch] = useStateValue();
  function logout() {
    console.log("clicked");
    dispatch({
      type: actionTypes.REMOVE_USER,
    });
    auth.signOut();
  }
  return (
    <div className="headerOption">
      {Icon && <Icon className="headerOption_icon" />}
      {avatar && (
        <Avatar
          className="headerOption_icon"
          src={user?.photoURL}
          onClick={logout}
        />
      )}
      <h3 className="headerOption_title">{title}</h3>
    </div>
  );
}

export default HeaderOption;
