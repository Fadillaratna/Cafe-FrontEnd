import React from 'react';
import PropTypes from 'prop-types';

import { Paper } from '@mui/material';
import styles from './style';

import { useDispatch, useSelector } from 'react-redux';
import { handleTable, addCustomer } from '../../../reducers/global';

const Component = (props) => {
  const dispatch = useDispatch();
  const { data, id, setActiveItem, activeItem } = props;
  const { table, customer_name, isUpdate } = useSelector((file) => file.global);
  let id_active = table ? table.id_meja : null;

  const _handleChoose = (activeId) => {
    if(isUpdate){
      window.alert('Table numbers cannot be changed while updating an order')
    }else{
      if (data.id_meja === id_active) {
        dispatch(handleTable({}));
        setActiveItem(null);
      } else {
        if (customer_name === null || customer_name == '') {
          let customerName = window.prompt(`Input customer name `, '');
          if (customerName == null || customerName == '') {
            return;
          } else {
            dispatch(handleTable(data));
            dispatch(addCustomer(customerName));
            setActiveItem(activeId);
          }
        } else {
          dispatch(handleTable(data));
          setActiveItem(activeId);
        }
      }
    }
  };

  return (
    <>
      {data.status === 'available' ? (
        <Paper
          sx={
            id === activeItem || id_active === data.id_meja
              ? { ...styles.choose }
              : { ...styles.available }
          }
          onClick={() => _handleChoose(id)}
        >
          {data.table_number}
        </Paper>
      ) : (
        <Paper sx={styles.booked}>{data.table_number}</Paper>
      )}
    </>
  );
};
export default Component;
Component.propTypes = {
  data: PropTypes.object,
  id: PropTypes.number,
  setActiveItem: PropTypes.func,
  activeItem: PropTypes.number,
};
