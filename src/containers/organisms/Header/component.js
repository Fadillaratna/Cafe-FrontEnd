import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import styles from './style';
import { ROUTES } from '../../../config';
import { clearLocalStorage } from '../../../utils/storage';

//? Material UI
import {
  AppBar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { ArrowBackRounded, LogoutRounded } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { getUserData } from '../../../utils/storage';

const Component = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { openDrawer, title, position } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const _handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const _handleClose = () => {
    setAnchorEl(null);
  };

  const _handleLogout = () => {
    clearLocalStorage();
    navigate(ROUTES.LOGIN)
  };

  let project = title === 'InstantApi';
  let apidocs = title === 'INSTANTAPI';

  return (
    <AppBar
      position={position}
      open={openDrawer}
      sx={styles.rootAppBar(theme, openDrawer, project, apidocs)}
    >
      <Toolbar sx={{ my: 'auto' }}>
        {title === 'InstantApi' ? (
          <IconButton sx={{ color: '#ffffff' }} href={ROUTES.DASHBOARD}>
            <ArrowBackRounded />
          </IconButton>
        ) : null}
        <Typography noWrap sx={{ pl: 4 }} variant="h6">
          {title}
        </Typography>
        <Typography sx={{ ml: 'auto', mr: 4, cursor: 'pointer' }} onClick={_handleClick}>
          {getUserData() ? getUserData().username : null}
        </Typography>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={Boolean(anchorEl)}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          onClick={_handleClose}
          onClose={_handleClose}
        >
          <MenuItem sx={{ color: 'red' }} onClick={_handleLogout}>
            <ListItemIcon>
              <LogoutRounded sx={{ color: 'red' }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Component;

Component.propTypes = {
  openDrawer: PropTypes.bool,
  title: PropTypes.string,
  position: PropTypes.string,
};
