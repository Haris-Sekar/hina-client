import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchOrgs } from "../../store/Thunks/OrgThunks";
import { useEffect } from "react";
import {
	Box,
	Typography,
	Button,
	Paper,
	List,
	ListItem,
	ListItemText,
} from "@mui/material"; 

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
		return (
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				height="60vh"
			>
				<Typography variant="h5" color="textSecondary" gutterBottom>
					No organizations found.
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate("/app/organization/new")}
				>
					Create Organization
				</Button>
			</Box>
		);
	}

	return (
		<Paper sx={{ maxWidth: 600, margin: "2rem auto", p: 3 }}>
			<Typography variant="h5" gutterBottom>
				Organizations
			</Typography>
			<List>
				{organizations.map((org) => (
					<ListItem key={org.companyId} divider>
						<ListItemText
							primary={org.name}
							secondary={org.description || ""}
						/>
					</ListItem>
				))}
			</List>
		</Paper>
	);
};

export default CompanyList;
