import React from "react";
import ReorderIcon from '@mui/icons-material/Reorder';
import { IconButton, Avatar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import "./css/header.css";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Header = () => {

  const navigate = useNavigate();

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.localStorage.removeItem("email")
        alert("Logged Out");
        window.location.reload(false);
        setTimeout(() => {
          navigate('/login');
        }, 3000)

      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="header">
      <div className="header__left">
        <IconButton>
          <ReorderIcon>

          </ReorderIcon>
        </IconButton>
        <img width="48" height="48" src="https://img.icons8.com/color/48/new-post.png" alt="new-post" />
      </div>
      <div className="header__middle">
        <div className="search_mail">
          <IconButton>
            <SearchIcon></SearchIcon>
          </IconButton>
          <input type="text" placeholder="Search"></input>
          <IconButton>
            <ExpandMoreIcon></ExpandMoreIcon>
          </IconButton>
        </div>
      </div>
      <div className="header__right">
        <IconButton>
          <HelpOutlineIcon>

          </HelpOutlineIcon>
        </IconButton>
        <IconButton>
          <SettingsIcon>

          </SettingsIcon>
        </IconButton>
        <IconButton>
          <AppsIcon>

          </AppsIcon>
        </IconButton>
        <Avatar onClick={logoutHandler}></Avatar>
      </div>
    </div>
  );
};

export default Header;