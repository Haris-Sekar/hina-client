import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyEmail } from "../api/services/account";
import { Box, CircularProgress } from "@mui/material";
import VerifyEmail from "../components/VerifyEmail/VerifyEmail";

const EmailVerify = () => {
  const [isVerified, setIsVerified] = useState(false);
  const { token } = useParams();
  useEffect(() => {
    if (token) verifyEmail(token).then(() => setIsVerified(true));
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isVerified ? <VerifyEmail success /> : <CircularProgress />}
    </Box>
  );
};

export default EmailVerify;
