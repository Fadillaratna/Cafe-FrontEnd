import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import styles from './style';
import { sidebarAdmin, sidebarCashier, sidebarManager } from '../../../constants/sidebarData';

import ButtonToggleDrawer from '../../../components/atoms/ButtonDrawerToggle';
import SidebarItem from '../../../components/molecules/SidebarItem';

import { ROUTES } from '../../../config';
import { clearLocalStorage, getUserData } from '../../../utils/storage';

//? Redux
import { toogleDrawer } from '../../../reducers/global';

//? Material UI
import { Box, Drawer, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import styled from '@emotion/styled';
import { LogoutRounded } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

const openedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: '#FFFFFF',
  overflow: 'visible',
  width: 260,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#FFFFFF',
  overflow: 'visible',
  width: 80,
});

const DrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

const Component = (props) => {
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const [sidebarData, setSidebarData] = useState([])
  const { title } = props;
  const { openDrawer } = useSelector((file) => file.global);


  const _handleLogout = () => {
    clearLocalStorage();
    navigate(ROUTES.LOGIN);
  };

  const _handleClickToggle = () => {
    dispacth(toogleDrawer());
  };

  useEffect(() => {
    if(getUserData()){
      if(getUserData().role === 'admin'){
        setSidebarData(sidebarAdmin);
      }else if(getUserData().role === 'cashier'){
        setSidebarData(sidebarCashier);
      }else if(getUserData().role === 'manager'){
        setSidebarData(sidebarManager)
      }
    }
  }, [])
  return (
    <>
      <DrawerStyled variant="permanent" anchor="left" open={openDrawer}>
        <Box sx={styles.rootBox}>
          <Box sx={styles.contentBox} />

          <ButtonToggleDrawer openDrawer={openDrawer} handleClick={_handleClickToggle} />
        </Box>
        <List sx={{ mt: 2, overflow: 'hidden' }}>
          {sidebarData.map((item, i) => (
            <SidebarItem item={item} key={i} active={title === item.title} />
          ))}

          <ListItemButton sx={styles.listItem} onClick={_handleLogout}>
            <ListItemIcon sx={styles.iconItem}>
              <LogoutRounded />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </DrawerStyled>
    </>
  );
};

export default Component;

Component.propTypes = {
  title: PropTypes.string,
};
