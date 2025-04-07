import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ItemGroup } from "../../../Types/Inventory";
import { addItemGroup } from "../../../api/services/inventory";
import { useAppDispatch } from "../../../store/store";
import { fetchItemGroup } from "../../../store/Thunks/InventoryThunks";
import CustomTooltip from "../../../components/Tooltip";

const AddItemGroup = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemGroup>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");

  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(data: ItemGroup, event: any) {
    setIsLoading(true);
    addItemGroup(data)
      .then(() => {
        setIsLoading(false);
        console.log(event.nativeEvent.submitter.id);

        if (event.nativeEvent.submitter.id !== "saveAndNew") {
          dispatch(fetchItemGroup({}));
          navigate("/app/inventory/itemgroup");
        } else {
          reset();
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  function onError() {}

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
            New Item Group
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
              Group Name *
              <CustomTooltip text="Name of the item group" />
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: "Group name is required",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="subtitle1" sx={{ width: "30%" }}>
              Description
            </Typography>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "40%" }}
                  multiline
                  rows={4}
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
          id="saveAndClose"
        >
          Save And Close
        </LoadingButton>
        <LoadingButton
          type="submit"
          variant="outlined"
          sx={{ mt: 3, mb: 2, width: "fit-content" }}
          loading={isLoading}
          startIcon={<AddCircleIcon />}
          id="saveAndNew"
        >
          Save And New
        </LoadingButton>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 3, mb: 2, width: "fit-content" }}
          onClick={() =>
            from === "detail"
              ? navigate("/app/inventory/itemgroup")
              : navigate(-1)
          }
          endIcon={<CancelIcon />}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddItemGroup;
