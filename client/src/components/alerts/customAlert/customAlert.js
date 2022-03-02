import React, { useContext, useEffect } from "react";
import { AlertProvider } from "../../../App";
const CustomAlert = () => {
  // using context to update the state values
  const { alertMessage, alertOpen } = useContext(AlertProvider);

  // destructuring state values
  const { message, setMessage } = alertMessage;
  const { open, setOpen } = alertOpen;

  // func to close the notification
  const handleClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [open]);

  return (
    <div
      className={`alert ${open ? "open" : "close"} ${
        message.status === 200 ? "success" : ""
      }`}
    >
      <span>
        {message.info}
        <span className="closeBtn" onClick={handleClick}>
          &times;
        </span>
      </span>
    </div>
  );
};

export default CustomAlert;
