import React, { useEffect, useState } from "react";
import axios from "axios";
import EmailistSetting from "./EmailistSetting";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { openMessage } from "./features/mailSlice";
import "./css/emaillist.css";
import DeleteIcon from '@mui/icons-material/Delete';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { backend_api } from "./config/config";
import { useNavigate } from "react-router-dom";
import moment from "moment";




function Inbox({ name, subject, message, time, email }) {

  const [mails, setMails] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openMail = async (mail) => {
    dispatch(openMessage({
      _id: mail["_id"],
      subject: mail["subject"],
      message: mail["message"],
      time: moment(mail.date).format('h:mm A'),
      email: mail["from"],
      to: mail["to"]
    }))
    navigate('/mail');
  };

  useEffect(() => {
    const fetchMails = async () => {
      try {
        console.log(backend_api);
        let payload = {
          userEmail: window.localStorage.getItem("email")
        }
        axios.post(`${backend_api}mail/getInboxMails`, payload)
          .then((response) => {
            console.log(response.data)
            if (response.status === 200) {
              let sortedMail = response.data.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
              });
              setMails(sortedMail);
            }
          })
      } catch (error) {
        console.log("Error fetching mails:", error);
      }
    };

    fetchMails();
    return () => {
      // Unsubscribe from mailbox changes when component unmounts
      firebase.database().ref("inbox").off("value");
    };

  }, []);

  const deleteMail = (e, id) => {
    e.preventDefault();
    axios.post(`${backend_api}mail/deleteMail`, { _id: id })
      .then(() => {
        alert("Mail deleted successfully")
        navigate('/Inbox')
      })
      .catch((error) => {
        console.log(error);
      })
  }
  console.log(mails);
  return (
    <div>
      <EmailistSetting />
      {mails && mails.length > 0 ? (
        mails.map((mail) => (
          <div
            key={mail.id}
            className="emailbody"
            onClick={() => openMail(mail)}
          >
            <div className='emailbody__left'>
              <CheckBoxOutlineBlankIcon />
              <StarOutlineIcon />
              <h4>{mail.from}</h4>
            </div>
            <div className='emailbody__middle'>
              <div className='emailbody__middle__msg'>
                <p>
                  <b>{mail.subject}</b>
                </p>
              </div>
              <div className='emailbody__middle__msg'>
                <p>{mail.message}
                </p>
              </div>
            </div>
            <div className='emailbody__right'>
              <p>{mail.time}</p>
              <IconButton>
                <DeleteIcon onClick={(e) => deleteMail(e, mail._id)} />
              </IconButton>
            </div>
          </div>
        ))
      ) : (
        <p>No mails found</p>
      )}
    </div>
  )
}

export default Inbox;
