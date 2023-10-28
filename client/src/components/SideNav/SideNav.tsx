import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import { Link } from 'react-router-dom';

const SideNav = ({ navItems }) => {
  const [open, setOpen] = useState(true); // Side nav is open by default
  const [activeItem, setActiveItem] = useState(null);

  const mapIconToComponent = (iconName, open) => {
    switch (iconName) {
      case 'dashboard':
        return <DashboardIcon style={{fontSize: open ? '30px' : '30px', color:'#e9ecef'}} />;
      case 'people':
        return <PeopleIcon style={{fontSize: open ? '30px' : '30px', color:'#e9ecef'}} />;
      case 'store':
        return <StoreIcon style={{fontSize: open ? '30px' : '30px', color:'#e9ecef'}} />;
      default:
        return null;
    }
  };
  const toggleNav = () => {
    setOpen(!open);
  };
  const handleItemClick = (index) => {
    setActiveItem(index);
  };
  return (
    <div style={{ width: open ? '200px' : '70px', backgroundColor: '#061237', color:'#FFFFFF', position: 'fixed', top: '54px', bottom: '0', left: '0', borderRight: '1px solid #ccc' }}>
      <List>
        <List style={{height: '80vh'}}>
        {navItems.map((item, index) => (
          <Link to={item.path} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem key={index} button key={index}
                button
                onClick={() => handleItemClick(index)}
                style={{ backgroundColor: activeItem === index ? '#666667' : 'inherit', color: activeItem === index ? '#e9ecef' : 'inherit' }}
              >
              {/* <div style={{display:'flex', alignItems:'center'}}> */}
                <ListItemIcon style={{ fontSize: open? '50px' : '150px'}}>
                  {mapIconToComponent(item.icon, open)}
                </ListItemIcon>
                <Collapse in={open}>
                  <ListItemText primary={item.name} style={{alignContent: 'center'}} />
                </Collapse>
              {/* </div> */}
          </ListItem>
          </Link>
        ))}
        </List>
        <ListItem onClick={toggleNav}>
            <ListItemIcon>
              {open ? <ChevronLeftIcon style={{fontSize: '30px', marginLeft: '170px', backgroundColor:'#666667', color: '#e9ecef', borderRadius: '50%'}} /> 
              : 
              <ChevronRightIcon style={{fontSize: '30px', marginLeft: '40px', backgroundColor:'#666667', color: '#e9ecef', borderRadius: '50%'}}/>}
            </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
}

export default SideNav;
