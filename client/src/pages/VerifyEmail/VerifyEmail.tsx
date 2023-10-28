import {
  Box,
  CircularProgress,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { CheckCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { verifyEmail } from "../../api/services/account";
import { useParams } from "react-router-dom";

interface VerifyEmailProps {
  success?: boolean;
}

const VerifyEmail = ({ success }: VerifyEmailProps) => {
  const { token } = useParams();

  const [isVerified, setIsVerified] = useState(!success);

  useEffect(() => {
    if (success) {
      if (token) verifyEmail(token).then(() => setIsVerified(true));
    }
  }, []);

  const handleResendEmail = () => {
    console.log("Resend email");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {isVerified ? (
        <Paper
          sx={{
            mt: "calc(50vh - 300px)",
            p: 2,
            width: { xs: "100%", sm: "50%" },
          }}
        >
          <Stack alignItems={"center"} p={5} gap={1}>
            {success ? (
              <CheckCircle sx={{ fontSize: 100 }} />
            ) : (
              <MailIcon sx={{ fontSize: 100 }} />
            )}
            <Typography variant="h5">
              {success
                ? "Your email has been verified!"
                : "Thanks for signing up to Hina"}
            </Typography>
            {!success && (
              <>
                <Typography variant="h6">
                  We've sent you an email to verify your account
                </Typography>
                <Typography variant="body1">
                  Please click the link in the email to verify your account
                </Typography>
                <Typography variant="body1">
                  If you don't see the email, check your spam folder
                </Typography>
              </>
            )}
            <Typography variant="body1">
              {success ? (
                <a href="/auth">Click here to login</a>
              ) : (
                <Link onClick={handleResendEmail}>
                  Click here to resend the email
                </Link>
              )}
            </Typography>
          </Stack>
        </Paper>
      ) : (
        <CircularProgress
          sx={{
            marginTop: "calc(50vh - 30px)",
          }}
        />
      )}
    </Box>
  );
};

export default VerifyEmail;
