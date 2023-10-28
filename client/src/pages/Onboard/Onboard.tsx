import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React from "react";

const Onboard = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "100px", height: "100px" }}
          src="/512-black.png"
          alt="logo"
        />

        <Typography component="h1" variant="h6" sx={{mt: 2}}>
          Before we begin, let's get some information from you!
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="companyName"
                label="Company Name"
                name="companyName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="gst"
                label="GST Number"
                name="gst"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Onboard
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Onboard;
