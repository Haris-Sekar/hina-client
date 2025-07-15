import {
  Box,
  Divider,
  Paper,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
  Typography,
  useColorScheme,
} from "@mui/material";
import { useThemeSettings, useThemeUpdater } from "../../../theme.tsx"; // adjust path as needed
import NightsStayRoundedIcon from "@mui/icons-material/NightsStayRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import TextDecreaseRoundedIcon from "@mui/icons-material/TextDecreaseRounded";
import TextIncreaseRoundedIcon from "@mui/icons-material/TextIncreaseRounded";
import TextFormatRoundedIcon from "@mui/icons-material/TextFormatRounded";
const fontOptions = ["Zoho Puvi", "Roboto", "Poppins"];

const Appearance = () => {
  const { mode, setMode } = useColorScheme();
  const { fontFamily, fontSize } = useThemeSettings();
  const { setFontFamily, setFontSize } = useThemeUpdater();

  if (!mode) {
    return null;
  }

  const changeFont = (
    _event: React.MouseEvent<HTMLElement>,
    newFont: string | null
  ) => {
    if (newFont) {
      setFontFamily(newFont);
    }
  };

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
      margin: theme.spacing(0.5),
      border: 0,
      borderRadius: theme.shape.borderRadius,
      [`&.${toggleButtonGroupClasses.disabled}`]: {
        border: 0,
      },
    },
    [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
      {
        marginLeft: -1,
        borderLeft: "1px solid transparent",
      },
  }));

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
        Appearance
        <Typography variant="caption">
          Customize how your invoicing workspace looks and feels.
        </Typography>
      </Typography>

      <Divider />

      <Box sx={{ m: 2 }}>
        <Typography fontWeight="bold" variant="body1">
          Interface Theme
        </Typography>
        <Typography variant="caption" sx={{ fontStyle: "italic" }}>
          Customize the appearance of the user interface.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Paper
            elevation={0}
            sx={(theme) => ({
              width: "fit-content",
              display: "flex",
              border: `1px solid ${theme.palette.divider}`,
              flexWrap: "wrap",
            })}
          >
            <StyledToggleButtonGroup
              value={mode}
              exclusive
              color="primary"
              sx={{
                display: "flex",
                gap: 0.5,
              }}
              onChange={(_, newMode) => setMode(newMode)}
            >
              <ToggleButton
                sx={{
                  textTransform: "capitalize",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
                value="system"
              >
                <PersonalVideoIcon />
                System
              </ToggleButton>
              <ToggleButton
                sx={{
                  textTransform: "capitalize",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
                value="light"
              >
                <LightModeRoundedIcon />
                Light
              </ToggleButton>
              <ToggleButton
                sx={{
                  textTransform: "capitalize",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
                value="dark"
              >
                <NightsStayRoundedIcon />
                Dark
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Paper>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ m: 2 }}>
        <Typography fontWeight="bold" variant="body1">
          Fonts
        </Typography>
        <Typography variant="caption" sx={{ fontStyle: "italic" }}>
          Select your preferred font.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Paper
            elevation={0}
            sx={(theme) => ({
              width: "fit-content",
              display: "flex",
              border: `1px solid ${theme.palette.divider}`,
              flexWrap: "wrap",
            })}
          >
            <StyledToggleButtonGroup
              color="primary"
              value={fontFamily}
              exclusive
              onChange={changeFont}
              aria-label="font family"
              sx={{
                display: "flex",
                gap: 0.5,
              }}
            >
              {fontOptions.map((font) => (
                <ToggleButton
                  sx={{ textTransform: "capitalize", fontFamily: font }}
                  key={font}
                  value={font}
                >
                  {font}
                </ToggleButton>
              ))}
            </StyledToggleButtonGroup>
          </Paper>
        </Box>
      </Box>

      <Divider />
      <Box sx={{ m: 2 }}>
        <Typography fontWeight="bold" variant="body1">
          Font Size
        </Typography>
        <Typography variant="caption" sx={{ fontStyle: "italic" }}>
          Adjust the font size for better readability.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Paper
            elevation={0}
            sx={(theme) => ({
              width: "fit-content",
              display: "flex",
              border: `1px solid ${theme.palette.divider}`,
              flexWrap: "wrap",
            })}
          >
            <StyledToggleButtonGroup
              value={fontSize}
              exclusive
              color="primary"
              onChange={(_, newSize) => newSize && setFontSize(newSize)}
              sx={{
                display: "flex",
                gap: 0.5,
              }}
            >
              <ToggleButton
                sx={{
                  textTransform: "capitalize",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
                value="small"
              >
                <TextDecreaseRoundedIcon />
                Small
              </ToggleButton>
              <ToggleButton
                sx={{
                  textTransform: "capitalize",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
                value="medium"
              >
                <TextFormatRoundedIcon />
                Medium
              </ToggleButton>
              <ToggleButton
                sx={{
                  textTransform: "capitalize",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
                value="large"
              >
                <TextIncreaseRoundedIcon />
                Large
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Paper>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default Appearance;
