import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../store/store";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate, useParams } from "react-router-dom";

const MyAccount = () => {
  const navigate = useNavigate();

  const { orgId } = useParams();

  const { currentUserDetails } = useAppSelector((state) => state.user);
  let initials = "";

  if (currentUserDetails?.firstName && currentUserDetails?.lastName) {
    initials =
      currentUserDetails.firstName.charAt(0).toUpperCase() +
      currentUserDetails.lastName.charAt(0).toUpperCase();
  }

  return (
    <Box>
      <Typography
        fontWeight="bolder"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          mx: 0.5,
          fontSize: "1.5rem",
          margin: 2,
        }}
      >
        Account Settings
        <Typography variant="caption">
          Manage your profile details, update your name, change your password,
          and customize how your invoicing workspace looks and feels.
        </Typography>
      </Typography>
      <Divider />
      <Box sx={{ m: 2 }}>
        <Paper
          elevation={5}
          sx={(theme) => ({
            border: `1px solid ${theme.palette.divider}`,
            p: 3,
            display: "flex",
            alignItems: "center",
          })}
        >
          <Box
            sx={{
              width: "fit-content",
            }}
          >
            <Avatar
              sx={{
                width: "75px",
                height: "75px",
                fontSize: "30px",
                bgcolor: "var(--mui-palette-primary-main)",
              }}
            >
              {initials}
            </Avatar>
          </Box>
          <Box
            sx={{
              ml: 3,
            }}
          >
            <Typography variant="h6" sx={{ display: "flex", gap: 1 }}>
              <span>
                {currentUserDetails?.firstName +
                  " " +
                  currentUserDetails?.lastName}
              </span>
              <Tooltip title="Verfied Email" arrow placement="right">
                <VerifiedRoundedIcon />
              </Tooltip>
            </Typography>
            <Typography variant="caption">
              {currentUserDetails?.email}
            </Typography>
          </Box>
          <Box
            sx={{
              ml: "auto",
            }}
          >
            <Button
              startIcon={<EditRoundedIcon />}
              variant="contained"
              onClick={() => {
                navigate(
                  `/app/${orgId}/settings/users/${currentUserDetails?.userId}/edit`
                );
              }}
            >
              Edit
            </Button>
          </Box>
        </Paper>
        {/* <Paper
          elevation={5}
          sx={(theme) => ({
            border: `1px solid ${theme.palette.divider}`,
            p: 3,
            mt: 3,
          })}
        >
          <Box>
            <Typography variant="h5">Change Password</Typography>
            <Typography variant="caption">
              Last password changed time:{" "}
              {new Date(Date.now()).toLocaleDateString()}
            </Typography>
          </Box>
          <Divider />
          <Box>


            
          </Box>
        </Paper> */}
      </Box>
    </Box>
  );
};

export default MyAccount;
