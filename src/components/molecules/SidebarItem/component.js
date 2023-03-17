import React from 'react';
import PropTypes from 'prop-types';

//? Material UI
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router';

const Component = (props) => {
  const navigate = useNavigate();
  const { item, active } = props;

  const _handleClick = () => {
    navigate(item.path);
  };

  return (
    <>
      <ListItemButton sx={{ px: 3, color: active ? '#3178F6' : '#3E3F48' }} onClick={_handleClick}>
        <ListItemIcon
          sx={{ color: active ? '#3178F6' : '#C1CCDB', minWidth: 54, paddingLeft: '2px' }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItemButton>
    </>
  );
};

export default Component;

Component.propTypes = {
  item: PropTypes.object.isRequired,
  active: PropTypes.bool,
};
