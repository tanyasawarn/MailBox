import React from 'react'
import { Button } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import "./css/sidebar.css";
import SideBarOption from './sidebaroptions/SideBarOption';
import InboxIcon from '@mui/icons-material/Inbox';
 import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { openSendMessage } from './features/mailSlice';
import { useNavigate } from 'react-router-dom';

   

function SideBar() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <div  className='sidebar'>
       <Button startIcon={<CreateIcon/>} className='compose__btn' onClick={()=>dispatch(openSendMessage())}>Compose</Button>
       <Button   title="inbox" number="224"className='compose__btn'  onClick={()=>navigate('/')}>
       <InboxIcon/>Inbox</Button>
       <Button title="sent" number="234" className='compose__btn' onClick={()=>navigate('/sentmails')}>
       <SendIcon/>Sent
       </Button>
      
       <SideBarOption Icon={DeleteIcon} title="bin" number="204" />
       <SideBarOption Icon={ ExpandMoreIcon} title="more" number="24" />
    </div>
  )
}

export default SideBar;