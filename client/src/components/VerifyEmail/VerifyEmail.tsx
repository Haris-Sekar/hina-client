import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { CheckCircle } from "@mui/icons-material";

interface VerifyEmailProps {
  success: boolean;
}
const VerifyEmail = ({ success }: VerifyEmailProps) => {
  const handleResendEmail = () => {
    console.log("Resend email");
  };

  return (
    <Box>
      <Paper
        sx={{
          mt: "calc(50vh - 300px)",
          p: 2,
          width: "calc(50vw - 32px)",
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
              ? "Your email has been verified"
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
    </Box>
  );
};

export default VerifyEmail;
