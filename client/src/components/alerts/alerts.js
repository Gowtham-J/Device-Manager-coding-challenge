import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Alerts({ open, setOpen, message }) {
  //   const [open, setOpen] = React.useState(false);
  console.log(message);
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
