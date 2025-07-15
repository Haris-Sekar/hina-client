/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import { User } from "../../../Types/User";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchRoles, fetchUsers } from "../../../store/Reducers/UserReducers";
import { updateUser } from "../../../api/services/user";
const EditUser = () => {
  const navigate = useNavigate();

  const params = useParams();

  const id = params.id as unknown as number;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRoles({ page: 0, range: 100 }));
    dispatch(fetchUsers({ userId: id }));
  }, [dispatch]);

  const { users } = useAppSelector((state) => state.user);
  let user = users.find((u) => u.userId == id);
  useEffect(() => {
    if (users.length > 0) {
      user = users.find((u) => u.userId == id);
      if (user) {
        setValue("firstName", user.firstName);
        setValue("lastName", user.lastName);
        setValue("email", user.email);
        setValue("roleId", user.roleId);
        setValue("status", user.status);
      }
    }
  }, [users]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (e: User) => {
    setIsLoading(true);

    try {
      e.userId = id;
      await updateUser(e);
      navigate(`/app/${params.orgId}/settings/users`);
      dispatch(fetchUsers({ page: 0, range: 25 }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onError = () => {};

  const [isLoading, setIsLoading] = useState(false);

  const { roles } = useAppSelector((state) => state.user);

  const status = [
    {
      id: "ACTIVE",
      name: "Active",
    },
    {
      id: "INACTIVE",
      name: "Inactive",
    },
    {
      id: "SUSPENDED",
      name: "Suspended",
    },
    {
      id: "READ_ONLY",
      name: "Read Only",
    },
  ];

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",

        height: "100%",
      }}
    >
      {users && users.length > 0 ? (
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              p: "10px",
              position: "sticky",
              top: 0,
              backgroundColor: "background.paper", // or your theme's background color
              paddingLeft: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
              zIndex: 999,
            }}
          >
            <Typography sx={{ fontSize: "20px", fontWeight: "bolder" }}>
              Edit User
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              mt: 3,
              padding: "2%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1" sx={{ width: "30%" }}>
                Name
              </Typography>
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  gap: "20px",
                }}
              >
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "First name is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{ width: "50%" }}
                      label="First Name"
                      error={Boolean(errors.firstName)}
                      helperText={errors.firstName?.message}
                      required
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{ width: "50%" }}
                      label="Last Name"
                      error={Boolean(errors.lastName)}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1" sx={{ width: "30%" }}>
                Email
              </Typography>

              <Controller
                name="email"
                disabled
                control={control}
                defaultValue={user?.email}
                render={({ field }) => (
                  <Tooltip
                    title="Email cannot be changed once set"
                    arrow
                    placement="left"
                  >
                    <TextField
                      {...field}
                      sx={{ width: "50%", userSelect: "none" }}
                      type="email"
                      label="Email"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      disabled
                    />
                  </Tooltip>
                )}
              />
            </Box>
            {roles.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography variant="subtitle1" sx={{ width: "30%" }}>
                  Role
                </Typography>
                <Controller
                  name="roleId"
                  defaultValue={user?.role.id}
                  control={control}
                  disabled={user?.isSuperAdmin}
                  render={({ field }) => (
                    <Tooltip
                      title={
                        user?.isSuperAdmin
                          ? "Super Admin Role cannot be changed"
                          : ""
                      }
                      arrow
                      placement="left"
                    >
                      <Select
                        sx={{ width: "50%" }}
                        {...field}
                        error={Boolean(errors.roleId)}
                        onChange={(_e, value: any) => {
                          setValue("roleId", value?.props?.value);
                        }}
                        defaultValue={user?.role.id}
                        disabled={user?.isSuperAdmin}
                      >
                        {roles.map((role) => {
                          return (
                            <MenuItem key={role.id} value={role.id}>
                              {role.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Tooltip>
                  )}
                />
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1" sx={{ width: "30%" }}>
                Status
              </Typography>
              <Controller
                name="status"
                control={control}
                disabled={user?.isSuperAdmin}
                render={({ field }) => (
                  <Tooltip
                    title={
                      user?.isSuperAdmin
                        ? "Super Admin status cannot be changed"
                        : ""
                    }
                    arrow
                    placement="left"
                  >
                    <Select
                      sx={{ width: "50%" }}
                      {...field}
                      error={Boolean(errors.status)}
                      onChange={(_e, value: any) => {
                        setValue("status", value?.props?.value);
                      }}
                      defaultValue={user?.status ?? "ACTIVE"}
                      disabled={user?.isSuperAdmin}
                    >
                      {status.map((status) => {
                        return (
                          <MenuItem key={status.id} value={status.id}>
                            {status.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Tooltip>
                )}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <CircularProgress />
        </>
      )}

      <Box
        sx={{
          display: "flex",
          gap: "2%",
          position: "sticky",
          bottom: 0,
          backgroundColor: "background.paper", // or your theme's background color
          paddingLeft: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          zIndex: 999,
        }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, width: "fit-content" }}
          loading={isLoading}
          startIcon={<EditOutlinedIcon />}
          id="saveAndClose"
        >
          Edit Users
        </LoadingButton>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 3, mb: 2, width: "fit-content" }}
          endIcon={<CancelIcon />}
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditUser;
