import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Paper,
  Select,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Item, ItemGroup, Size } from "../../../Types/Inventory";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  fetchItemGroup,
  fetchSize,
} from "../../../store/Thunks/InventoryThunks";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import LoadingButton from "@mui/lab/LoadingButton";
import { addItemGroup as addItemGroupAPI } from "../../../api/services/inventory";
import CustomTooltip from "../../../components/Tooltip";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const AddItem = () => {
  const {
    control,
    getValues,
    formState: { errors },
  } = useForm<Item>();

  const itemGroupForm = useForm<ItemGroup>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  let { itemGroups, sizes, loading } = useAppSelector(
    (state) => state.inventory
  );

  const handleOpen = () => {
    if (itemGroups.length === 0) {
      dispatch(fetchItemGroup({}));
    }
  };

  const handleSizeOpen = () => {
    if (sizes.length === 0) {
      dispatch(fetchSize({ page: 0, range: 1000 }));
    }
  };

  const [itemGroup, setItemGroup] = useState<ItemGroup | null>(null);

  interface IVariableRates {
    sizes: Size[];
    costPrice?: number;
    sellingPrice?: number;
    id: number;
  }

  const [varialbeRows, setVariableRows] = useState<IVariableRates[]>([
    {
      sizes: [],
      costPrice: undefined,
      sellingPrice: undefined,
      id: Date.now(),
    },
  ]);

  const [openAddItemGroup, setOpenAddItemGroup] = useState(false);

  const [isAddItemGroupLoading, setIsAddItemGroupLoading] = useState(false);

  const addItemGroup = (e: ItemGroup) => {
    setIsAddItemGroupLoading(true);
    addItemGroupAPI(e, false)
      .then(({ data }) => {
        dispatch(fetchItemGroup({}));
        const itemGroup: ItemGroup = {
          name: data.data.name,
          groupId: data.data.id,
          description: data.data.description,
          createdBy: data.data.created_by,
          updatedBy: data.data.updated_by,
          createdTime: data.data.created_time,
          updatedTime: data.data.updated_time,
          hsnCode: data.data.hsn_code,
        };
        setItemGroup(itemGroup);
      })
      .finally(() => {
        setIsAddItemGroupLoading(false);
        setOpenAddItemGroup(false);
      });
  };

  const addItemGroupOnError = () => {};

  const defaultUnits = [
    { name: "Pieces", unit: "pcs" },
    { name: "Box", unit: "box" },
    { name: "Dozen", unit: "dz" },
    { name: "Centimeter", unit: "cm" },
    { name: "Feet", unit: "ft" },
    { name: "Grams", unit: "g" },
    { name: "Inches", unit: "in" },
    { name: "Kilograms", unit: "kg" },
    { name: "Kilometers", unit: "km" },
    { name: "Pounds", unit: "lb" },
    { name: "Milli Grams", unit: "mg" },
    { name: "Milli Litre", unit: "ml" },
    { name: "Meter", unit: "m" },
  ];

  const [masterUnit, setMasterUnit] = useState<string>();
  const [baseUnit, setBaseUnit] = useState<string>("pcs");

  const getMasterUnits = () => {
    const baseUnit = getValues("unitOfMeasure");
    return defaultUnits.filter((unit) => unit.unit !== baseUnit);
  };

  const [isMasterUnit, setIsMasterUnit] = useState(true);

  const [masterUntis, setMasterUnits] = useState<
    Array<{
      name: string;
      unit: string;
    }>
  >(getMasterUnits());

  const [manageStock, setManageStock] = useState(true);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [tab, setTab] = React.useState("1");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  const updateRow = (values: IVariableRates) => {
    const toBeUpdatedIndex = varialbeRows.findIndex((r) => r.id === values.id);
    if (toBeUpdatedIndex === -1) return;

    const rows = [...varialbeRows];
    rows[toBeUpdatedIndex] = values;

    setVariableRows(rows);
  };

  const addRow = (index: number) => {
    const newRow: IVariableRates = {
      sizes: [],
      costPrice: undefined,
      sellingPrice: undefined,
      id: Date.now(), // or use a better UUID generator if needed
    };

    setVariableRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows.splice(index + 1, 0, newRow); // insert after the given index
      return updatedRows;
    });
  };

  const deleteRow = (index: number) => {
    setVariableRows((prevRows) => {
      if (prevRows.length === 1) return prevRows; // prevent deleting the last row
      const updatedRows = [...prevRows];
      updatedRows.splice(index, 1);
      return updatedRows;
    });
  };

  const getAvailableSizesForRow = (rowIndex: number): Size[] => {
    // Get all selected sizes in previous rows
    const usedSizes = varialbeRows
      .slice(0, rowIndex)
      .flatMap((row) => row.sizes.map((size) => size.id)); // assuming Size has a unique `id`

    // Filter out the used sizes from the master sizeList
    return sizes.filter((size) => !usedSizes.includes(size.id));
  };

  const applyToAll = (
    sourceRow: IVariableRates,
    sourceIndex: number,
    field: "costPrice" | "sellingPrice"
  ) => {
    setVariableRows((prevRows) =>
      prevRows.map((row, idx) => {
        if (idx === sourceIndex) return row; // skip the source row

        return {
          ...row,
          [field]: sourceRow[field], // copy the field (costPrice or sellingPrice)
        };
      })
    );
  };

  return (
    <Box>
      <Modal
        keepMounted
        open={openAddItemGroup}
        onClose={() => setOpenAddItemGroup(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            boxShadow: 24,
          }}
          component="form"
          noValidate
          onSubmit={itemGroupForm.handleSubmit(
            addItemGroup,
            addItemGroupOnError
          )}
        >
          <Typography variant="h4" sx={{ p: 2 }}>
            Add Item group
          </Typography>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1" sx={{ width: "30%" }}>
                Name *
              </Typography>
              <Controller
                name="name"
                control={itemGroupForm.control}
                defaultValue=""
                rules={{
                  required: "Item group name is required",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoComplete="off"
                    sx={{ width: "70%" }}
                    error={Boolean(itemGroupForm.formState.errors.name)}
                    helperText={itemGroupForm.formState.errors.name?.message}
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
                mt: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ width: "30%" }}>
                HSN Code
              </Typography>
              <Controller
                name="hsnCode"
                control={itemGroupForm.control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoComplete="off"
                    sx={{ width: "70%" }}
                    error={Boolean(itemGroupForm.formState.errors.hsnCode)}
                    helperText={itemGroupForm.formState.errors.hsnCode?.message}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                mt: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ width: "30%" }}>
                Description
              </Typography>
              <Controller
                name="description"
                control={itemGroupForm.control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoComplete="off"
                    sx={{ width: "70%" }}
                    error={Boolean(itemGroupForm.formState.errors.description)}
                    helperText={
                      itemGroupForm.formState.errors.description?.message
                    }
                    multiline
                    rows={2}
                  />
                )}
              />
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              gap: "2%",
              bottom: 0,
              paddingLeft: 2,
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "fit-content" }}
              loading={isAddItemGroupLoading}
              startIcon={<AddCircleOutlineRoundedIcon />}
              id="saveAndClose"
            >
              Save And Select
            </LoadingButton>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2, width: "fit-content" }}
              onClick={() => setOpenAddItemGroup(false)}
              endIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Modal>
      <Typography variant="h4" sx={{ p: 2, fontWeight: "bolder" }}>
        New Item
      </Typography>
      <Divider />
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
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
              Item Name *
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: "Item name is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  autoComplete="off"
                  sx={{ width: "70%" }}
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
                  autoComplete="off"
                  sx={{ width: "70%" }}
                  multiline
                  rows={2}
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
              Item Group
            </Typography>
            <Controller
              name="itemGroup"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  // @ts-ignore
                  value={itemGroup}
                  onChange={(_, value) => setItemGroup(value)}
                  onOpen={handleOpen}
                  openOnFocus
                  disableClearable
                  isOptionEqualToValue={(option, value) =>
                    option.groupId === value.groupId
                  }
                  getOptionLabel={(option) => option.name}
                  getOptionKey={(option) => "" + option.groupId}
                  options={itemGroups}
                  loading={loading}
                  sx={{ width: "53%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select"
                      {...field}
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              )}
            />
            <Button
              sx={{ height: "50px", width: "15%", ml: "2%" }}
              startIcon={<AddCircleOutlineRoundedIcon />}
              variant="contained"
              color="secondary"
              onClick={() => {
                handleOpen();
                setOpenAddItemGroup(true);
              }}
            >
              Add new
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ width: "30%", display: "flex", alignItems: "center" }}
            >
              SKU
              <CustomTooltip
                content={
                  <span>
                    <i>
                      <b>Leave empty to auto-generate.</b>
                    </i>
                    <br />
                    If you don’t provide a SKU (Stock Keeping Unit), the system
                    will automatically generate a unique one for this item.
                  </span>
                }
              />
            </Typography>
            <Controller
              name="sku"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  autoComplete="off"
                  sx={{ width: "70%" }}
                  error={Boolean(errors.sku)}
                  helperText={errors.sku?.message}
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
            <Typography
              variant="subtitle1"
              sx={{ width: "30%", display: "flex", alignItems: "center" }}
            >
              Unit
            </Typography>
            <Controller
              name="unitOfMeasure"
              control={control}
              defaultValue="pcs"
              render={({ field }) => (
                <Select
                  sx={{ width: "70%" }}
                  {...field}
                  value={field.value ?? ""}
                  error={Boolean(errors.unitOfMeasure)}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setMasterUnits(getMasterUnits());
                    setBaseUnit(e.target.value);
                  }}
                >
                  {defaultUnits.map((unit) => {
                    return (
                      <MenuItem key={unit.unit} value={unit.unit}>
                        {unit.name} &nbsp;-&nbsp; {unit.unit}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
          </Box>
        </Box>
        <Box sx={{ width: "40%" }}>
          <Paper
            sx={{
              width: "90%",
              height: "350px",
              mt: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              flexDirection: "column",
              opacity: 0.5,
              pointerEvents: "none", // prevents interaction
              position: "relative",
            }}
            elevation={5}
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
                multiple
                accept="image/*"
              />
            </Button>
            <Typography variant="caption" sx={{ mt: 2 }}>
              Upload up to 5 images, max 5MB each.
            </Typography>
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "warning.main",
                color: "white",
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                fontSize: "0.75rem",
                fontWeight: "bold",
              }}
            >
              Coming Soon
            </Box>
          </Paper>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "2%",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: "45%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ width: "30%", display: "flex", alignItems: "center" }}
            >
              Barcode
              <CustomTooltip
                content={
                  <span>
                    <i>
                      <b>Defaults to SKU if left blank.</b>
                    </i>
                    <br />
                    If no barcode is entered, the SKU will be used as the
                    barcode by default.
                  </span>
                }
              />
            </Typography>
            <Controller
              name="barcode"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  autoComplete="off"
                  sx={{ width: "70%" }}
                  error={Boolean(errors.barcode)}
                  helperText={errors.barcode?.message}
                />
              )}
            />
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isMasterUnit}
                  onChange={(_, value) => {
                    setIsMasterUnit(value);
                    setMasterUnits(getMasterUnits());
                  }}
                />
              }
              label="Has Master Unit"
            />
          </Box>
          {isMasterUnit && masterUntis && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ width: "30%", display: "flex", alignItems: "center" }}
                >
                  Master Unit *
                  <CustomTooltip
                    content={
                      <span>
                        <i>
                          <b>Used as the billing unit.</b>
                        </i>
                        <br />
                        This unit will be used to calculate billing based on the
                        base unit multiplied by the quantity (e.g., 1 box = 12
                        pieces).
                      </span>
                    }
                  />
                </Typography>
                <Controller
                  name="unitOfBill"
                  control={control}
                  render={({ field }) => (
                    <Select
                      sx={{ width: "70%" }}
                      {...field}
                      value={field.value ?? ""}
                      error={Boolean(errors.unitOfBill)}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setMasterUnit(e.target.value);
                      }}
                    >
                      {masterUntis.map((unit) => {
                        return (
                          <MenuItem key={unit.unit} value={unit.unit}>
                            {unit.name} &nbsp;-&nbsp; {unit.unit}
                          </MenuItem>
                        );
                      })}
                    </Select>
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
                <Typography
                  variant="subtitle1"
                  sx={{ width: "30%", display: "flex", alignItems: "center" }}
                >
                  Quantity *
                  <CustomTooltip
                    content={
                      <>
                        <b>Master Unit Quantity</b>
                        <br />
                        Defines how many <i>base units</i> make up one{" "}
                        <i>master unit</i>.<br />
                        <br />
                        For example:
                        <br />1 <b>Box</b> = 12 <b>Pcs</b> → Enter <b>12</b>{" "}
                        here.
                      </>
                    }
                  />
                </Typography>
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      autoComplete="off"
                      sx={{ width: "70%" }}
                      error={Boolean(errors.quantity)}
                      helperText={errors.quantity?.message}
                      placeholder="How many base units in 1 master unit?"
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="start">
                              <Chip
                                label={`x ${defaultUnits.find((u) => u.unit === baseUnit)?.name ?? baseUnit} = 1 ${defaultUnits.find((u) => u.unit === masterUnit)?.name ?? "Master Unit"}`}
                              />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </>
          )}
        </Box>
        <Box
          sx={{
            width: "45%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ width: "30%", display: "flex", alignItems: "center" }}
            >
              HSN Code
              <CustomTooltip
                content={
                  <>
                    <b>HSN Code</b>
                    <br />
                    A standardized 4–8 digit code used to classify goods under
                    GST.
                    <br />
                    Required for tax calculation and invoice reporting.
                  </>
                }
              />
            </Typography>
            <Controller
              name="hsnCode"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  autoComplete="off"
                  sx={{ width: "70%" }}
                  error={Boolean(errors.hsnCode)}
                  helperText={errors.hsnCode?.message}
                />
              )}
            />
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={manageStock}
                  onChange={(_, value) => {
                    setManageStock(value);
                  }}
                />
              }
              label="Manage Stock"
            />
          </Box>
          {manageStock && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ width: "30%", display: "flex", alignItems: "center" }}
              >
                Re-Order Point
                <CustomTooltip
                  content={
                    <>
                      <b>Re-Order Point</b>
                      <br />
                      The minimum stock level before a new purchase should be
                      made.
                      <br />
                      <br />
                      When stock drops below this value, it signals the need to
                      reorder.
                    </>
                  }
                />
              </Typography>
              <Controller
                name="reorderPoint"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoComplete="off"
                    type="number"
                    sx={{ width: "70%" }}
                    error={Boolean(errors.reorderPoint)}
                    helperText={errors.reorderPoint?.message}
                  />
                )}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Divider />
      <Typography variant="h4" sx={{ p: 2, fontWeight: "bolder" }}>
        Item Rates
      </Typography>
      <Divider />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", pl: 2 }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Single Item" value="1" />
              <Tab label="Variable Item" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box
              sx={{
                width: "100%",
                p: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box sx={{ width: "45%", display: "flex" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ width: "30%", display: "flex", alignItems: "center" }}
                  >
                    Selling Rate
                    <CustomTooltip
                      content={
                        <>
                          <b>Selling Price</b>
                          <br />
                          The price at which this item is sold to customers.
                          <br />
                          Used to calculate invoice totals and profit.
                        </>
                      }
                    />
                  </Typography>
                  <Controller
                    name="rate.sellingPrice"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        autoComplete="off"
                        sx={{ width: "50%" }}
                        error={Boolean(errors.rate?.sellingPrice)}
                        helperText={errors.rate?.sellingPrice?.message}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                ₹
                              </InputAdornment>
                            ),
                          },
                        }}
                        type="number"
                      />
                    )}
                  />
                </Box>
                <Box sx={{ width: "45%", display: "flex" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ width: "30%", display: "flex", alignItems: "center" }}
                  >
                    Purchase Cost
                    <CustomTooltip
                      content={
                        <>
                          <b>Purchase Cost</b>
                          <br />
                          The amount paid to acquire or manufacture the item.
                          <br />
                          Helps track margins and cost of goods sold.
                        </>
                      }
                    />
                  </Typography>
                  <Controller
                    name="rate.costPrice"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        autoComplete="off"
                        sx={{ width: "50%" }}
                        error={Boolean(errors.rate?.costPrice)}
                        helperText={errors.rate?.costPrice?.message}
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                ₹
                              </InputAdornment>
                            ),
                          },
                        }}
                        type="number"
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <TableContainer component={Paper} sx={{ width: "60%" }}>
              <Table sx={{ width: "100%" }} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell width="50%">Size</TableCell>
                    <TableCell width="25%">Purchse Cost</TableCell>
                    <TableCell width="25%">Selling Price</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {varialbeRows.map((row, index) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>
                          <IconButton
                            disabled={index === 0}
                            aria-label="delete"
                            size="large"
                            onClick={() => deleteRow(index)}
                          >
                            <RemoveCircleIcon fontSize="inherit" />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <Autocomplete
                            onOpen={handleSizeOpen}
                            openOnFocus
                            disableClearable
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            onChange={(_event, value) => {
                              updateRow({ ...row, sizes: value });
                            }}
                            getOptionLabel={(option) => option.name}
                            getOptionKey={(option) => "" + option.id}
                            options={getAvailableSizesForRow(index)}
                            loading={loading}
                            multiple
                            autoHighlight
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select"
                                slotProps={{
                                  input: {
                                    ...params.InputProps,
                                    endAdornment: (
                                      <React.Fragment>
                                        {loading ? (
                                          <CircularProgress
                                            color="inherit"
                                            size={20}
                                          />
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                      </React.Fragment>
                                    ),
                                  },
                                }}
                              />
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            autoComplete="off"
                            slotProps={{
                              input: {
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                endAdornment: index === 0 && (
                                  <Tooltip title="Apply to all" arrow>
                                    <IconButton
                                      onClick={() =>
                                        applyToAll(row, index, "costPrice")
                                      }
                                    >
                                      <DoneAllIcon sx={{ fontSize: "15px" }} />
                                    </IconButton>
                                  </Tooltip>
                                ),
                              },
                            }}
                            type="number"
                            value={row.costPrice}
                            onChange={(event) =>
                              updateRow({
                                ...row,
                                costPrice: Number(event.target.value),
                              })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            autoComplete="off"
                            slotProps={{
                              input: {
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                endAdornment: index === 0 && (
                                  <Tooltip title="Apply to all" arrow>
                                    <IconButton
                                      onClick={() =>
                                        applyToAll(row, index, "sellingPrice")
                                      }
                                    >
                                      <DoneAllIcon sx={{ fontSize: "15px" }} />
                                    </IconButton>
                                  </Tooltip>
                                ),
                              },
                            }}
                            type="number"
                            value={row.sellingPrice}
                            onChange={(event) =>
                              updateRow({
                                ...row,
                                sellingPrice: Number(event.target.value),
                              })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => addRow(index)}
                            aria-label="Add"
                            size="large"
                          >
                            <AddCircleIcon fontSize="inherit" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabContext>
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
          startIcon={<AddCircleOutlineRoundedIcon />}
          id="saveAndClose"
        >
          Save And Close
        </LoadingButton>
        <LoadingButton
          type="submit"
          variant="outlined"
          sx={{ mt: 3, mb: 2, width: "fit-content" }}
          startIcon={<AddCircleOutlineRoundedIcon />}
          id="saveAndNew"
        >
          Save And New
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

export default AddItem;
