import React, { useState } from 'react';
import { Checkbox } from "@mui/material";
import { Label, LabelOutlined, Star, StarBorder } from '@mui/icons-material';

const Mail = ({ data, updateRead }) => {
  const [starred, setStarred] = useState(false);
  const [important, setImportant] = useState(false);

  const handleReadUpdate = () => {
    updateRead(data.id);
  };

  return (
    <div
      onClick={handleReadUpdate}
      className={`mail ${!data.read && 'mail--unread'}`}
    >
      <Checkbox className="mail--colorGray mail--hoverBlack" />
      {starred ? (
        <Star onClick={() => setStarred(!starred)} className="mail--Yellow" />
      ) : (
        <StarBorder
          onClick={() => setStarred(!starred)}
          className="mail--colorGray mail--hoverBlack"
        />
      )}

      {important ? (
        <Label
          onClick={() => setImportant(!important)}
          className="mail--Yellow mail__label"
        />
      ) : (
        <LabelOutlined
          onClick={() => setImportant(!important)}
          className="mail--colorGray mail--hoverBlack mail__label"
        />
      )}

      <div className="mail__texts">
        <p className="mail__text">{data.senderName}</p>
        <div className="mail__titleSubtitle">
          <p className="mail__text">{data.subject}</p>
          <p className="mail__text mail__body"> - {data.body}</p>
        </div>
        <p className="mail__text">Jan 14</p>
      </div>
    </div>
  );
};

export default Mail;
