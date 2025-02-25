/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import EmptyPage, { IButton } from "../../components/EmptyPage";
import React, { useEffect, useState } from "react";
import {
    acceptInvite,
    getUserDetailsForVerification,
} from "../../api/services/auth";
import invalid from "../../assets/forbidden.png";
import { Box, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { Controller, useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const AcceptInvite = () => {
    const navigate = useNavigate();

    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    useEffect(() => {
        if (token) {
            verifyToken(token);
        }
    }, []);

    const [isLoading, setIsLoading] = useState(false);

    const [isError, setIsError] = useState(token === null);

    const [userName, setUserName] = useState("");

    const [orgName, setOrgName] = useState("");

    const verifyToken = async (token: string) => {
        try {
            setIsLoading(true);
            const response = await getUserDetailsForVerification(token);
            if (response) {
                setUserName(response.first_name + " " + response.last_name);
                setOrgName(response.organization.name);
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const errorButtons: IButton[] = [
        {
            label: "Send Email Again",
            onclick: () => { },
            variant: "contained",
            color: "primary",
        },
        {
            label: "Home",
            onclick: () => {
                navigate("/");
            },
            variant: "outlined",
            color: "error",
        },
    ];


    interface IPassword {
        password: string
        confirmPassword: string
    }


    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IPassword>();

    const onSubmit = async (e: IPassword) => {
        if (token) {
            setIsLoading(true);
            await acceptInvite(token, e.password);
            setIsLoading(false);
            navigate("/auth");
        }
    }

    const onError = (error: any) => {
        console.log(error);
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword((show) => !show);
    };


    return (
        <>
            {!isError ? (
                isLoading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100vh",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                            gap: "50px",
                            height: "100vh",
                        }}
                    >
                        <Box>
                            <Typography
                                textAlign={"center"}
                                sx={{ fontSize: "40px", fontWeight: "900", mb: "20px" }}
                            >
                                Welcome to {orgName}
                            </Typography>
                            <Typography
                                textAlign={"center"}
                                fontSize="20px"
                                fontWeight="500"
                            >
                                Hi  {userName} 👋,
                                <Typography sx={{ mt: 1, fontSize: "17px", fontWeight: "500" }}>
                                    Please create a password and accept the invitation to join {orgName}.
                                </Typography>
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: "20px",
                                    flexDirection: "column",
                                    mt: 5,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                                component="form"
                                noValidate
                                onSubmit={handleSubmit(onSubmit, onError)}
                            >
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{
                                        required: "Password is required",
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            sx={{ width: "70%" }}
                                            label="Password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            variant="outlined"
                                            error={Boolean(errors.password)}
                                            helperText={errors.password?.message}
                                            slotProps={{
                                                input: {
                                                    endAdornment: (<InputAdornment position="end">

                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            edge="end"
                                                        >
                                                            {!showPassword ? <VisibilityOff sx={{ fontSize: '20px' }} /> : <Visibility sx={{ fontSize: '20px' }} />}
                                                        </IconButton>
                                                    </InputAdornment>)
                                                }
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    rules={{
                                        required: "Confirm password is required",
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            sx={{ width: "70%" }}
                                            label="Confirm Password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            required
                                            variant="outlined"
                                            error={Boolean(errors.confirmPassword)}
                                            helperText={errors.confirmPassword?.message}
                                            slotProps={{
                                                input: {
                                                    endAdornment: (<InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowConfirmPassword}
                                                            edge="end"
                                                        >
                                                            {!showConfirmPassword ? <VisibilityOff sx={{ fontSize: '20px' }} /> : <Visibility sx={{ fontSize: '20px' }} />}
                                                        </IconButton>
                                                    </InputAdornment>)
                                                }
                                            }}
                                        />
                                    )}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignContent: "center",
                                        mt: 3,
                                        gap: '30px'
                                    }}
                                >
                                    <LoadingButton
                                        variant={"contained"}
                                        color={"success"}
                                        loading={isLoading}
                                        type="submit"
                                    >
                                        Accept Invite
                                    </LoadingButton>
                                    <LoadingButton
                                        variant={"outlined"}
                                        color={"error"}
                                        onClick={() => navigate("/auth")}
                                    >
                                        Cancel
                                    </LoadingButton>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )
            ) : (
                <EmptyPage
                    heading="Invalid Link"
                    description="The link you followed may be broken or has expired. Please request a new one to proceed."
                    image={invalid}
                    imageWidth="150px"
                    imageHeight="150px"
                    buttons={errorButtons}
                />
            )}
        </>
    );
};

export default AcceptInvite;
