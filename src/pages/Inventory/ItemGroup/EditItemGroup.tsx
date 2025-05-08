import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ItemGroup } from "../../../Types/Inventory";
import { updateItemGroup } from "../../../api/services/inventory";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchItemGroup } from "../../../store/Thunks/InventoryThunks";
import CustomTooltip from "../../../components/Tooltip";

const EditItemGroup = () => {
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
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const { itemGroups, loading } = useAppSelector((state) => state.inventory);

  useEffect(() => {
    if (id && itemGroups.length > 0) {
      const itemGroup = itemGroups.find(
        (group) => group.groupId === parseInt(id)
      );
      if (itemGroup) {
        reset(itemGroup);
        setInitialLoading(false);
      }
    } else if (id) {
      dispatch(fetchItemGroup({ id: parseInt(id) }));
    }
  }, [itemGroups]);
 
  console.log(itemGroups);
  

  function onSubmit(data: ItemGroup) {
    if (id) {
      setIsLoading(true);
      updateItemGroup(data)
        .then(() => {
          setIsLoading(false);
          dispatch(fetchItemGroup({}));
          navigate("/app/inventory/itemgroup");
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
            Edit Item Group
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
              HSN Code
              <CustomTooltip text="Harmonized System Nomenclature Code" />
            </Typography>
            <Controller
              name="hsnCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: "40%" }}
                  placeholder="Enter HSN Code"
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
        >
          Save
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

export default EditItemGroup;
