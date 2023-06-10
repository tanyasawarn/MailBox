import React, { useState } from 'react';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import HeightIcon from '@mui/icons-material/Height';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LinkIcon from '@mui/icons-material/Link';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PhotoIcon from '@mui/icons-material/Photo';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./css/compose.css";
import { useDispatch } from 'react-redux';
import { closeSendMessage } from './features/mailSlice';
import axios from 'axios';
import { backend_api } from './config/config';
import { useNavigate } from 'react-router-dom';



function ComposeMail() {

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (to === "") {
      return alert("To is required field");
    }
    if (subject === "") {
      return alert("Subject is required field");
    }
    if (message === "") {
      return alert("Message is required field");
    }
    let payload = {
      from: window.localStorage.getItem("email"),
      to: to,
      subject: subject,
      message: message
    }
    axios.post(`${backend_api}mail/sendMail`, payload)
    alert("email sent successfully");
    setTo("");
    setSubject("");
    setMessage("");
    navigate('/sentmails')
    dispatch(closeSendMessage());
  };

  return (
    <div className='compose'>
      <div className='compose__header'>
        <div className='compose__header__left'>
          <span>New Message</span>
        </div>
        <div className='compose__header__right'>
          <RemoveOutlinedIcon />
          <HeightIcon />
          <CloseIcon onClick={() => dispatch(closeSendMessage())} />
        </div>
      </div>
      <form onSubmit={formSubmitHandler}>
        <div className='compose__body'>
          <div className='compose__bodyForm'>
            <input type='email' placeholder='Recipients' value={to} onChange={(e) => setTo(e.target.value)} />
            <input type='text' placeholder='subject' value={subject} onChange={(e) => setSubject(e.target.value)} />
            <textarea rows={20} onChange={(e) => setMessage(e.target.value)} value={message} />
          </div>
        </div>
        <div className='compose__footer'>
          <div className='compose__footerLeft'>
            <button type='submit'>Send
              <ArrowDropDownIcon />
            </button>
          </div>
          <div className='compose__footerRight'>
            <FormatColorTextIcon />
            <AttachFileIcon />
            <LinkIcon />
            <NoteAddIcon />
            <PhotoIcon />
            <CreateIcon />
            <MoreVertIcon />
            <DeleteIcon />
          </div>

        </div>
      </form>
    </div>
  )
}

export default ComposeMail