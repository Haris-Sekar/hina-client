import {
    Box,
    Button,
    Grid,
    Divider,
    Paper,
    TextField,
    Typography, Switch,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import {fetchRateVersion} from "../../../store/Reducers/InventoryReducerts";
import {RateVersion } from "../../../Types/Inventory";
import {updateRateVersion } from "../../../api/services/inventory";

const EditRateVersion = () => {
    const params = useParams();

    const id = params.id as unknown as number;

    const { rateVersion } = useAppSelector((state) => state.inventory);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!rateVersion || (rateVersion.length === 0 && id)) {
            dispatch(fetchRateVersion({ versionId: id }));
        }
    }, [dispatch]);

    const [values, setValues] = useState<RateVersion>();

    useEffect(() => {
        setValues(getRateVersionById(id));
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RateVersion>();

    const navigate = useNavigate();

    function getRateVersionById(id: number): RateVersion | undefined {
        return rateVersion.find((s) => s.versionId === Number(id));
    }

    function onSubmit(e: RateVersion) {
        setIsLoading(true);
        e.versionId = id;
        updateRateVersion(e)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((_data) => {
                setIsLoading(false);
                navigate("/app/rateversion");
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((_e) => {
                setIsLoading(false);
            });
    }

    const [isLoading, setIsLoading] = useState(false);

    function onError() {}

    return (
        <Paper
            sx={{
                padding: "2%",
                width: "60%",
                margin: "auto",
                mt: 10,
                borderRadius: 10,
                minHeight: 300,
            }}
        >
            <Typography variant="h1">Edit Rate Version</Typography>
            <Divider />
            {values && (
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit, onError)}
                    sx={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        justifyContent: "center",
                        margin: "auto",
                        mt: 3,
                    }}
                >
                    <Grid
                        item
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ width: "20%" }}>
                            Version Name *
                        </Typography>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={values.name}
                            rules={{
                                required: "Version name is required",
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    sx={{ width: "80%" }}
                                    error={Boolean(errors.name)}
                                    label="Version Name"
                                    helperText={errors.name?.message}
                                    required
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ width: "20%" }}>
                            IsDefault
                        </Typography>
                        <Controller
                            name="isDefault"
                            defaultValue={values?.isDefault}
                            control={control}
                            render={({ field }) => (
                                <Switch {...field} defaultChecked={values?.isDefault} />
                            )}
                        />
                    </Grid>
                    <Box sx={{ display: "flex", gap: "2%" }}>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, width: "fit-content" }}
                            loading={isLoading}
                            startIcon={<ModeEditOutlinedIcon />}
                        >
                            Update
                        </LoadingButton>

                        <Button
                            variant="contained"
                            color="error"
                            sx={{ mt: 3, mb: 2, width: "fit-content" }}
                            endIcon={<CancelIcon />}
                            onClick={() => navigate("/app/rateversion")}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            )}
        </Paper>
    );
};

export default EditRateVersion;
