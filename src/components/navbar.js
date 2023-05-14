import React, { useState } from 'react';
import logo1 from "./image.png";
import { makeStyles } from "@material-ui/core/styles"
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#FFFFFF',
    color: '#FFFFFF',
    boxShadow: 'none',
    borderBottom: '1px solid #E0E0E0',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: '1.5rem',
    fontWeight: 500,
    letterSpacing: '0.03em',
    textAlign: 'center',
  },
  logo: {
    height: 50,
  },
  menuItem: {
    color: '#333333',
    fontSize: '1rem',
    fontWeight: 500,
    padding: '8px 20px',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
  },
}));

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary" >
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleOpenMenu}
        >
          
          <MenuIcon />
        </IconButton>
        <Typography variant="h6"  sx={{ flexGrow: 1 }} className="flex-grow text-lg font-medium text-center">
          ConnectArts
        </Typography>
        <Box className="absolute top-0 right-0">
          <img class="circ-img"
            src={logo1} />
        </Box>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleCloseMenu} className="text-gray-900 font-medium py-2 px-4 hover:bg-gray-200">
            <Link to="/signedin">Dashboard</Link>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu} className="text-gray-900 font-medium py-2 px-4 hover:bg-gray-200">
            <a href="/preferences">Categorical Preferences Guide</a>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu} className="text-gray-900 font-medium py-2 px-4 hover:bg-gray-200">
            <a href="/upload">Upload</a>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu} className="text-gray-900 font-medium py-2 px-4 hover:bg-gray-200">
            <a href="/profile">Profile</a>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu} className="text-gray-900 font-medium py-2 px-4 hover:bg-gray-200">
            <a href="/skills">Dance Genre Guide</a>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu} className="text-gray-900 font-medium py-2 px-4 hover:bg-gray-200">
            <a href="/depthSkills">Skills Guide</a>
          </MenuItem>
        </Menu>

    </AppBar>
  );
}

export default Navbar;
