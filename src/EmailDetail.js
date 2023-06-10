import React from 'react';
import "./css/emaillist.css";
import { IconButton } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectedMail } from './features/mailSlice';
import axios from 'axios';
import { backend_api } from './config/config';


function EmailDetail() {

   const navigate = useNavigate();
   const mail = useSelector(selectedMail);
   const deleteMail = (id) => {
      axios.post(`${backend_api}mail/deleteMail`, { _id: id })
         .then(() => {
            alert("Mail deleted successfully")
            navigate('/sentmails')
         })
         .catch((error) => {
            console.log(error);
         })
   }
   console.log(mail);
   return (
      <div className='emaildetail'>
         <div className='emaillist__settings'>
            <div className='emaillist__settingsleft'>
               <IconButton onClick={() => navigate('/sentmails')}>
                  <ArrowBackIcon />
               </IconButton>
               <IconButton>
                  <ArrowDropDownIcon />
               </IconButton>
               <IconButton>
                  <RefreshIcon />
               </IconButton>
            </div>
            <div className='emaillist__settingsright'>
               <p>1-50 of 2,000</p>
               <IconButton>
                  <ChevronLeftIcon />
               </IconButton>
               <IconButton>
                  <ChevronRightIcon />
               </IconButton>
            </div>
         </div>
         <div className='emaildetail__message'>
            <div className='emaildetail__header'>
               <div className='emaildetail__headerLeft'>
                  <h4>To - {mail.to}</h4>
               </div>
               <div className='emaildetail__headerRight'>
                  <IconButton>
                     <StarIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteMail(mail._id)}>
                     <DeleteIcon />
                  </IconButton>
               </div>
            </div>

            <div className='emaildetail__middleheader'>
               <div className='emaildetail__middleheaderLeft'>
                  <h4>Subject - {mail.subject}</h4>
               </div>
               <div className='emaildetail__middleheaderRight'>
                  <p>{mail.time}</p>
                  <IconButton>
                     <ReplyIcon />
                  </IconButton>
               </div>
            </div>
            <div className='emaildetail__body'>
               <p>{mail.message}</p>
            </div>
         </div>
      </div>
   )
}

export default EmailDetail;