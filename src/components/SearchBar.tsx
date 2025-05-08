import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

interface SearchBarProps {
  onSearch?: (value: string) => Promise<any>;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search..." }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useCallback(
    debounce((value: string) => {
        onSearch && onSearch(value)
        .then(() => {
            setTimeout(() => {
              setSearchValue(value);
            }, 1000);
        })
        .catch(() => setSearchValue(value));
    }, 500),
    [onSearch]
  );

  return (
    <Box sx={{ width: "40%" }}>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        onChange={(e) => {
          if (onSearch) {
            debouncedSearch(e.target.value);
          }
          setSearchValue(e.target.value);
        }}
        value={searchValue}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
