import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useParams } from "react-router-dom";
import { Size } from "../../../Types/Inventory";
import { updateSize } from "../../../api/services/inventory";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchSize } from "../../../store/Thunks/InventoryThunks";
import CustomTooltip from "../../../components/Tooltip";

const EditSize = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Size>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { sizes } = useAppSelector((state) => state.inventory);

  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (id && sizes.length > 0) {
      const size = sizes.find((size) => size.id === parseInt(id));
      if (size) {
        reset(size);
        setInitialLoading(false);
      }
    } else if (id) {
      dispatch(fetchSize({ id: parseInt(id), page: 1, range: 1 }));
    }
  }, [sizes]);

  function onSubmit(data: Size) {
    if (id) {
      setIsLoading(true);
      updateSize(data)
        .then(() => {
          setIsLoading(false);
          dispatch(
            fetchSize({
              page: 0,
              range: 25,
            })
          );
          navigate(-1);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }

  function onError() {}

  if (initialLoading) {
    return null;
  }

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
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            p: "10px",
            position: "sticky",
            top: 0,
            backgroundColor: "background.paper",
            paddingLeft: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            zIndex: 999,
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "bolder" }}>
            Edit Size
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
              Size Name *
              <CustomTooltip text="Name of the size" />
            </Typography>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Size name is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "40%" }}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  required
                />
              )}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "2%",
          position: "sticky",
          bottom: 0,
          backgroundColor: "background.paper",
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
          startIcon={<AddCircleIcon />}
        >
          Save
        </LoadingButton>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 3, mb: 2, width: "fit-content" }}
          onClick={() => navigate(-1)}
          endIcon={<CancelIcon />}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditSize;
