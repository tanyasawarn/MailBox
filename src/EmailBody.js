import React from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import "./css/emaillist.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openMessage } from './features/mailSlice';

function EmailBody({ _id, name, subject, message, time, email, to }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openMail = () => {

    dispatch(openMessage({
      _id,
      name,
      subject,
      message,
      time,
      email,
      to
    }))
    navigate('/mail');
  };

  return (
    <div className='emailbody' onClick={openMail}>
      <div className='emailbody__left'>
        <CheckBoxOutlineBlankIcon />
        <StarBorderIcon />
        <LabelOutlinedIcon />
        <h4>{to}</h4>
      </div>
      <div className='emailbody__middle'>
        <div className='emailbody__middle__msg'>
          <p><b>{subject}</b></p>
        </div><div className='emailbody__middle__msg'>
          <p>{message.substring(0, 20)}....</p>
        </div>

      </div>
      <div className='emailbody__right'>
        <p>{time}</p>
      </div>
    </div>
  )
}

export default EmailBody;