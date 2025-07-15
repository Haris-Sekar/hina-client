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
import officeImg from "../../assets/office-building.png";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../components/Logo";

const Organization = () => {
  const navigate = useNavigate();

  const { orgId } = useParams();

  const { currentUserDetails, companyDetails } = useAppSelector(
    (state) => state.user
  );
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
        Organization Details
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
              width: "75px",
              height: "75px",
            }}
          >
            <Logo />
          </Box>
          <Box
            sx={{
              ml: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" sx={{ display: "flex", gap: 1 }}>
              <span>{companyDetails?.name}</span>
            </Typography>
            <Typography variant="caption">
              {companyDetails?.description || "No description provided"}
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
                navigate(`edit`);
              }}
            >
              Edit
            </Button>
          </Box>
        </Paper>
        <Paper
          elevation={5}
          sx={(theme) => ({
            border: `1px solid ${theme.palette.divider}`,
            mt: 3,
            display: "flex",
            alignItems: "center",
            p: 3,
          })}
        >
          <Box sx={{ display: "flex" }}>
            GST Number:&nbsp;&nbsp;&nbsp;
            <Typography>{companyDetails?.gstNumber || "-"}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Organization;
