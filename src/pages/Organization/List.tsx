import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchOrgs } from "../../store/Thunks/OrgThunks";
import { useEffect } from "react";
import {
  Box,
  Typography, 
  List,
  ListItem,
  ListItemText,
  Button,
  Card,
  ListItemIcon, 
} from "@mui/material";
import EmptyPage, { IButton } from "../../components/EmptyPage";
import officeImg from "../../assets/office-building.png";
import BusinessIcon from "@mui/icons-material/Business";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const CompanyList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrgs());
  }, [dispatch]);

  const { organizations } = useAppSelector((state) => state.organizations); 

  if (!organizations) {
    return null; // or a loading spinner
  }

  if (organizations.length === 0) {
    const buttons: IButton[] = [
      {
        label: "Create Organization",
        onclick: () => navigate("new"),
      },
    ];

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="60vh"
      >
        <EmptyPage
          heading="No Organization Found"
          description="You need to create an organization before you can start sending invoices, adding customers, or tracking payments."
          image={officeImg}
          buttons={buttons}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ p: 3, minWidth: "80vh" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" gutterBottom>
            My Organizations
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddCircleIcon />}
            sx={{ height: "40px" }}
          >
            Create
          </Button>
        </Box>
        <List>
          {organizations.map((org) => (
            <Card
              sx={{ borderRadius: "10px", p: "5px 10px" }}
              key={org.companyId}
            >
              <ListItem key={org.companyId}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText
                  primary={org.name}
                  secondary={org.description || "No description provided"}
                />
                <Button
                  variant="contained"
                  onClick={() => navigate(`/app/${org.companyId}`)}
                >
                  Access
                </Button>
              </ListItem>
            </Card>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CompanyList;
