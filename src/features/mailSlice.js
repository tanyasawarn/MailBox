import {createSlice } from "@reduxjs/toolkit";

export const mailSlice = createSlice({
    name:'mail',
    initialState:{
        sendMessageIsOpen:false,
        selectedMessage:null,
        mails:[],
    },

    reducers:{
      openSendMessage:(state) =>{
        state.sendMessageIsOpen=true
      },
      closeSendMessage:(state) =>{
        state.sendMessageIsOpen=false
      },
      openMessage:(state,action)=>{
        state.selectedMessage = action.payload ;
      },
      addMail: (state, action) => {
        state.mails.push(action.payload);
      },
      deleteMail: (state, action) => {
        state.mails = state.mails.filter((mail) => mail.id !== action.payload);
      },
    }
});

export const {openSendMessage,closeSendMessage,openMessage,addMail,deleteMail} = mailSlice.actions;

export const selectSendMessageIsOpen = (state) =>state.mail.sendMessageIsOpen;

export const selectedMail = (state) => state.mail.selectedMessage;

 

export default mailSlice.reducer;