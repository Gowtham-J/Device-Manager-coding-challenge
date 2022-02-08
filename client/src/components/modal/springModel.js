// modules
import * as React from "react";
import axios from "axios";
import Cookies from "js-cookie";

// material ui
import { Modal, Card, Box, Typography, Button } from "@mui/material/";

// importing SVG
import { ReactComponent as DeleteSvg } from "../../assets/images/delete.svg";

// A styled block from material UI
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
};

export default function SpringModal({
  open,
  setOpen,
  deviceId,
  setDevices,
  setAlertOpen,
  setMessage,
}) {
  const handleClose = () => setOpen(false);

  // function to delete cookie from the browser
  const handleDelete = async () => {
    const token = await Cookies.get("jwt");

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        jwt: token,
        Authorization: `Bearer ${token}`,
      },
      sessionStorage: { jwt: token },
    };

    try {
      const deleteDevice = await axios.delete(
        `${process.env.REACT_APP_DEVICE_URL}/devices/${deviceId}`,
        config
      );
      // if device successfully delete's
      if (deleteDevice) {
        setOpen(false);
        const response = await axios.get(
          `${process.env.REACT_APP_DEVICE_URL}/devices`
        );
        // setting alert message
        setMessage({
          status: 200,
          info: deleteDevice.data.message,
        });
        setAlertOpen(true);
        setDevices(response.data);
      }
    } catch (error) {
      // setting alert message
      setMessage({ status: 400, info: error.response.data.errors[0].message });
      setAlertOpen(true);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Are you sure?
            </Typography>
            <DeleteSvg
              style={{
                margin: "10px",
                width: "70%",
                height: "70%",
                alignSelf: "center",
              }}
            />
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                size="medium"
                onClick={handleDelete}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
              <Button onClick={handleClose} size="medium" variant="contained">
                Cancel
              </Button>
            </div>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
