import React from 'react'
import "./css/emaillist.css";
import { IconButton } from "@mui/material"; 
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function EmailistSetting() {
  return (
    <div className='emaillist__settings'>
        <div className='emaillist__settingsleft'>
          <IconButton>
              <CheckBoxOutlineBlankIcon/>
          </IconButton>
          <IconButton>
             <ArrowDropDownIcon/>
          </IconButton>
          <IconButton>
              <RefreshIcon/>
          </IconButton>
        </div>
        <div className='emaillist__settingsright'>
         <p>1-50 of 2,000</p>
         <IconButton>
              <ChevronLeftIcon/>
          </IconButton>
          <IconButton>
              <ChevronRightIcon/>
          </IconButton>
        </div>
    </div>
  )
}

export default EmailistSetting