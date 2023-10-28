import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import './TopNav.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const TopNav = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null);
    const openMenu = Boolean(anchorEl);
    const openMenu2 = Boolean(anchorE2);
    const companyItems = ['Company 1', 'Company 2']; // Add more company options here
    const profileItems = ['Profile', 'Settings']; // Add more profile menu options here
    const [selectedCompany, setSelectedCompany] = useState('Company Name');
    const handleCompanyMenuOpen = (event:any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCompanyMenuClose = () => {
      setAnchorEl(null);
    };
    const handleCompanyMenuItemClick = (item) => {
      setSelectedCompany(item);
      setAnchorEl(null);
    };
    const handleProfileMenuOpen = (event:any) => {
        setAnchorE2(event.currentTarget);
    };
    const handleProfileMenuClose = () => {
        setAnchorE2(null);
    };
    useEffect(()=>{
      setSelectedCompany(companyItems[0]);
    }, [])
  return (
    <AppBar color='primary' className='top-navbar' style={{backgroundColor:'#12A58C'}}>
        <Toolbar>
            <Typography variant="h6" style={{display:'flex'}}>
          <div style={{width:'150px', marginTop:'5px'}}>{selectedCompany}</div>
          <IconButton
            color="inherit"
            aria-label="switch company"
            onClick={handleCompanyMenuOpen}
            style={{fontSize: '14px', marginBottom: '3px'}}
          >
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCompanyMenuClose}
            PaperProps={{
              style: {
                width: '180px', // Adjust the width as needed
              },
            }}
            style={{left:'-150px'}}
          >
            {companyItems.map((item, index) => (
              <MenuItem key={index} onClick={() => handleCompanyMenuItemClick(item)}>
                {item}
              </MenuItem>
            ))}
          </Menu>
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            style={{ color: 'white' }}
          />
        </div>

        <div style={{ flexGrow: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <Avatar
              alt="User Avatar"
              src="/path-to-profile-picture.jpg"
            />
          </IconButton>
          <Menu
            anchorEl={anchorE2}
            open={openMenu2}
            onClose={handleProfileMenuClose}
            PaperProps={{
              style: {
                width: '180px', // Adjust the width as needed
              },
            }}
          >
            {profileItems.map((item, index) => (
              <MenuItem key={index} onClick={handleProfileMenuClose}>
                {item}
              </MenuItem>
            ))}
          </Menu>
        </div>

        </Toolbar>
    </AppBar>
  )
}

export default TopNav