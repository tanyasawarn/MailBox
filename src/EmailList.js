import React, { useEffect, useState } from "react";
import "./css/emaillist.css";
import EmailistSetting from "./EmailistSetting";
import EmailBody from "./EmailBody";
import { db } from "./firebase";
import axios from "axios";
import { backend_api } from "./config/config";
import moment from "moment";

function EmailList() {
  //to fetch data from db
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    // db.collection("emails")
    //   .orderBy("timestamp", "desc") // to show latest email first and previous last
    //   .onSnapshot((snapshot) => {
    //     setEmails(
    //       snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         data: doc.data(),
    //       }))
    //     );
    //   });
    getEmails();
  }, []);
  const getEmails = async () => {
    try {
      let payload = {
        userEmail: window.localStorage.getItem("email")
      }
      axios.post(`${backend_api}mail/getSendMails`, payload)
        .then((response) => {
          if (response.status === 200) {
            let sortedMail = response.data.sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            });
            console.log("Sorted mails",sortedMail);
            setEmails(sortedMail);
          }
        })
    } catch (error) {

    }
  }
  console.log(emails);
  return (
    <div className="emailist">
      <EmailistSetting />

      {emails && emails.map((data, id) => {
        return (
          <EmailBody
            key={id}
            _id={data._id}
            email={data.from}
            to={data.to}
            subject={data.subject}
            message={data.message}
            //changing time to am/pm convention
            time={moment(data.date).format('h:mm A')
            }
          />
        );
      })}
    </div>
  );
}

export default EmailList;
