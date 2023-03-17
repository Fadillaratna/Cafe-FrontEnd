import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, IconButton, Grid, Paper } from '@mui/material';
import { DeleteRounded, AddRounded, RemoveRounded } from '@mui/icons-material';
import { SERVICES } from '../../../../config';
import { addToCart, minusCart, deleteCart } from '../../../../reducers/global';
import { convertToRupiah } from '../../../../utils/formatRupiah';

const Component = (props) => {
  const { menu } = props;
  const dispatch = useDispatch();
  const { isUpdate } = useSelector((file) => file.global);

  const _handleAdd = (data) => {
    dispatch(addToCart(data));
  };

  const _handleMinus = (data) => {
    dispatch(minusCart(data));
  };

  const _handleDelete = (data) => {
    dispatch(deleteCart(data));
  };

  return (
    <>
      <Paper
        sx={{
          p: 1,
          my: 2,
          height: 140,
          backgroundColor: '#35363d',
          borderRadius: 4,
          boxShadow: 'none',
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <img
              src={
                menu.image
                  ? SERVICES.IMAGE + '/' + menu.image
                  : SERVICES.IMAGE + '/' + menu.menu.image
              }
              width={122}
              height={122}
              style={{ borderRadius: 10, objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} sm container sx={{ my: 1 }}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom sx={{ color: 'white', fontSize: 15 }}>
                  {menu.menu_name ? menu.menu_name : menu.menu.menu_name}
                </Typography>
                <Typography variant="h6" sx={{ color: '#0177fa', fontWeight: 600, fontSize: 14 }}>
                  {menu.price ? convertToRupiah(menu.price) : convertToRupiah(menu.menu.price)}
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <IconButton
                color="error"
                onClick={() => _handleDelete(menu)}
                disabled={isUpdate ? true : false}
              >
                <DeleteRounded />
              </IconButton>
            </Grid>

            <Grid item container direction="row" sx={{ marginTop: 1.5 }}>
              <IconButton
                variant="contained"
                size="small"
                sx={{
                  color: 'white',
                  backgroundColor: '#0177fa',
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: '#0177fa',
                  },
                  width: 25,
                  height: 25,
                }}
                onClick={() => (isUpdate ? null : _handleMinus(menu))}
              >
                <RemoveRounded />
              </IconButton>
              <Typography sx={{ px: 1.5, color: 'white' }}>{menu.qty}</Typography>
              <IconButton
                variant="contained"
                size="small"
                sx={{
                  color: 'white',
                  backgroundColor: '#0177fa',
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: '#0177fa',
                  },
                  width: 25,
                  height: 25,
                }}
                onClick={() => _handleAdd(menu)}
              >
                <AddRounded />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
export default Component;
Component.propTypes = {
  menu: PropTypes.object,
};
