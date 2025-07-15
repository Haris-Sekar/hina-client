import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type ThemeSettings = {
  fontFamily: string;
  fontSize: string;
};

type ThemeUpdater = {
  setFontFamily: Dispatch<SetStateAction<string>>;
  setFontSize: Dispatch<SetStateAction<string>>;
};

// ✅ Contexts with default values
const ThemeSettingsContext = createContext<ThemeSettings>({
  fontFamily: "Zoho Puvi",
  fontSize: "medium",
});

const ThemeUpdateContext = createContext<ThemeUpdater>({
  setFontFamily: () => {},
  setFontSize: () => {},
});

// ✅ Hooks
export const useThemeSettings = () => useContext(ThemeSettingsContext);
export const useThemeUpdater = () => useContext(ThemeUpdateContext);

// ✅ LocalStorage keys
export const FONT_STORAGE_KEY = "app-font-family";
export const SIZE_STORAGE_KEY = "app-font-size";

// ✅ Size multiplier logic
const getFontSizeMultiplier = (size: string): number => {
  switch (size) {
    case "small":
      return 0.85;
    case "large":
      return 1.15;
    default:
      return 1.0;
  }
};

// ✅ Theme generator with dynamic font and size
export const getAppTheme = (fontFamily: string, fontSize: string) => {
  const multiplier = getFontSizeMultiplier(fontSize);

  let theme = createTheme({
    typography: {
      fontFamily,
      fontSize: 14 * multiplier, // Root font size

      h1: { fontSize: `${36 * multiplier}px`, fontWeight: "bold" },
      h2: { fontSize: `${30 * multiplier}px`, fontWeight: "bold" },
      h3: { fontSize: `${24 * multiplier}px`, fontWeight: "bold" },
      h4: { fontSize: `${20 * multiplier}px`, fontWeight: 600 },
      h5: { fontSize: `${18 * multiplier}px`, fontWeight: 600 },
      h6: { fontSize: `${16 * multiplier}px`, fontWeight: 600 },

      subtitle1: { fontSize: `${16 * multiplier}px` },
      subtitle2: { fontSize: `${15 * multiplier}px` },

      body1: { fontSize: `${14 * multiplier}px` }, // Sidebar text
      body2: { fontSize: `${13 * multiplier}px` },

      button: { fontSize: `${14 * multiplier}px`, textTransform: "none" },
      caption: { fontSize: `${12 * multiplier}px` },
      overline: {
        fontSize: `${12 * multiplier}px`,
        textTransform: "uppercase",
      },
    },

    colorSchemes: {
      dark: {
        palette: {
          primary: { main: "#fefefe" },
          background: {
            default: "#111111",
            paper: "#222222",
          },
        },
      },
      light: {
        palette: {
          background: {
            default: "#F8F7F9",
          },
          primary: { main: "#408dfb" },
        },
      },
    },
    cssVariables: {
      colorSchemeSelector: "data-toolpad-color-scheme",
    },

    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#000000",
          },
          arrow: {
            color: "#000000",
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize:
              fontSize === "small"
                ? "20px"
                : fontSize === "large"
                  ? "28px"
                  : "24px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: { borderRadius: "10px" },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily,
            textTransform: "unset",
            borderRadius: 10,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            minHeight: 48,
            textTransform: "unset",
            fontSize: "1rem",
            "&.Mui-selected": { fontWeight: 600 },
            "&:not(:first-of-type)": { marginLeft: 24 },
            borderRadius: "10px 10px 0 0",
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};

// ✅ Provider
export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [fontFamily, setFontFamilyState] = useState(() => {
    return localStorage.getItem(FONT_STORAGE_KEY) || "Zoho Puvi";
  });

  const [fontSize, setFontSizeState] = useState(() => {
    return localStorage.getItem(SIZE_STORAGE_KEY) || "medium";
  });

  const setFontFamily: Dispatch<SetStateAction<string>> = (newFont) => {
    const resolved =
      typeof newFont === "function" ? newFont(fontFamily) : newFont;
    setFontFamilyState(resolved);
    localStorage.setItem(FONT_STORAGE_KEY, resolved);
  };

  const setFontSize: Dispatch<SetStateAction<string>> = (newSize) => {
    const resolved =
      typeof newSize === "function" ? newSize(fontSize) : newSize;
    setFontSizeState(resolved);
    localStorage.setItem(SIZE_STORAGE_KEY, resolved);
  };

  const theme = useMemo(
    () => getAppTheme(fontFamily, fontSize),
    [fontFamily, fontSize]
  );

  return (
    <ThemeUpdateContext.Provider value={{ setFontFamily, setFontSize }}>
      <ThemeSettingsContext.Provider value={{ fontFamily, fontSize }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeSettingsContext.Provider>
    </ThemeUpdateContext.Provider>
  );
};
