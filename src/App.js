import "./App.css";
import EmailList from "./EmailList";
import Header from "./Header";
import SideBar from "./SideBar";
import ComposeMail from "./ComposeMail";
import { useDispatch, useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Authentiction/login";
import { selectUser, signin } from "./features/userslice";
import { useEffect } from "react";
import EmailDetail from "./EmailDetail";
 import Inbox from "./inbox";
 import { auth } from "./firebase";

function App() {
  
  const isMessageOpen = useSelector(selectSendMessageIsOpen);

  const dispatch = useDispatch();
   
 const user = useSelector(selectUser);

 useEffect(()=>{
   
  auth.onAuthStateChanged((user)=>{
    if(user){
       dispatch(signin({
        displayName:user.displayName,
        photoUrl:user.photoURL,
        email:user.email
       }))
    }//else{
    //   dispatch(signout())
    // }
  })

 },[])
  
  
    return (
      <BrowserRouter>
      {user ? (
        <div className="App">
          <Header />
          <div className="app__body">
            <SideBar />
            <Routes>
              <Route path="/" element={<Inbox />} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/mail" element={<EmailDetail />} />
              <Route path="/sentmails" element={<EmailList />} />
            </Routes>
          </div>
          {isMessageOpen && <ComposeMail />}
        </div>
      ) : (
        <Login />
      )}
    </BrowserRouter>
    );
    

}

export default App;
