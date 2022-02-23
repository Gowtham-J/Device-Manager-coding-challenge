// modules
import * as Yup from "yup";
import { useState, useContext } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// material
import { Stack, TextField, Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";

// adding context
import { AlertProvider } from "../../App";
// ----------------------------------------------------------------------

export default function AddForm() {
  const navigate = useNavigate();
  // context api
  const { alertMessage, alertOpen } = useContext(AlertProvider);
  const { open, setOpen } = alertOpen;
  const { message, setMessage } = alertMessage;
  // ----
  const [regard, setRegard] = useState(false);

  // Validation schema
  const RegisterSchema = Yup.object().shape({
    device: Yup.string().required("Device model is required"),
    os: Yup.string().required("Operating system is required"),
    manufacturer: Yup.string().required("Manufacturer info is required"),
  });

  // using formik library
  const formik = useFormik({
    initialValues: {
      device: "",
      os: "",
      manufacturer: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (e) => {
      const token = Cookies.get("jwt");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const data = JSON.stringify({
        device: values.device,
        os: values.os,
        manufacturer: values.manufacturer,
      });

      axios
        .post(`${process.env.REACT_APP_DEVICE_URL}/devices`, data, config)
        .then((res) => {
          setValues({ device: "", os: "", manufacturer: "" });
          setRegard(true);
          formik.setSubmitting(false);
        })
        .catch((err) => {
          setMessage({
            status: 400,
            info: err.response.data.errors[0].message,
          });
          setOpen(true);
          formik.setSubmitting(false);
        });
    },
  });

  // destructuring formic objects
  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    values,
    getFieldProps,
    setValues,
  } = formik;

  const handleNew = () => {
    setRegard(false);
  };

  const handleBack = () => {
    navigate("/dashboard/app");
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {regard ? (
            <div>
              <Stack spacing={2}>
                <Typography variant="h6">
                  Device has been added Successfully{" "}
                  <CheckCircleIcon color="success" />
                </Typography>

                <Button onClick={handleNew} variant="contained">
                  <AddIcon /> New Device
                </Button>

                <Button onClick={handleBack}>
                  <ArrowCircleLeftIcon /> Back To Dashboard
                </Button>
              </Stack>
            </div>
          ) : (
            <>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="Device"
                  {...getFieldProps("device")}
                  error={Boolean(touched.device && errors.device)}
                  helperText={touched.device && errors.device}
                />

                <TextField
                  fullWidth
                  label="Os"
                  {...getFieldProps("os")}
                  error={Boolean(touched.os && errors.os)}
                  helperText={touched.os && errors.os}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="Manufacturer"
                  {...getFieldProps("manufacturer")}
                  error={Boolean(touched.manufacturer && errors.manufacturer)}
                  helperText={touched.manufacturer && errors.manufacturer}
                />
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Submit
              </LoadingButton>
              <Button onClick={handleBack}>
                <ArrowCircleLeftIcon /> Back To Dashboard
              </Button>
            </>
          )}
        </Stack>
      </Form>
    </FormikProvider>
  );
}
