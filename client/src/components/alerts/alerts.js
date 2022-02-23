import * as React from "react";
// material ui
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// importing context from parent page
import { AlertProvider } from "../../App";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Re-usable component
export default function Alerts() {
  const { alertMessage, alertOpen } = React.useContext(AlertProvider);

  const { message, setMessage } = alertMessage;
  const { open, setOpen } = alertOpen;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key={"top" + "right"}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={message.status === 200 ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message.info}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
