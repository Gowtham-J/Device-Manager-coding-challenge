import { useState } from "react";
// material
import { Box, Grid, Container, Typography, Card } from "@mui/material";

// components
import AddForm from "../components/form/addForm";
import { ReactComponent as NewDeviceSvg } from "../assets/images/newDevice.svg";
// ----------------------------------------------------------------------

export default function DeviceForm() {
  return (
    <Container maxWidth="xl" sx={{ m: 2 }}>
      <Box sx={{ pb: 5 }}>
        <Typography variant="h4">Lets add a new device</Typography>
      </Box>
      <Grid container spacing={3}>
        <Card
          sx={{
            padding: "0rem 6rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AddForm />
          <NewDeviceSvg
            style={{ alignSelf: "", width: "auto", height: "70%" }}
          />
        </Card>
      </Grid>
    </Container>
  );
}
