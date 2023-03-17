import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  CardActionArea,
} from '@mui/material';
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import styles from './style';

import DialogUpdate from '../../dialog/DialogUpdateMenu';
import { fetchUpdate } from './action';

import { ROUTES, SERVICES } from '../../../../config';
import { addToCart } from '../../../../reducers/global';
import { convertToRupiah } from '../../../../utils/formatRupiah';

const Component = (props) => {
  const { data, processDelete, getAll, cashier } = props;
  const [dialogUpdate, setDialogUpdate] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { table } = useSelector((file) => file.global);

  const _handleCloseDialogUpdate = () => {
    setDialogUpdate(false);
  };

  const _handleShowDialogUpdate = () => {
    setDialogUpdate(true);
  };

  const _handleChoose = (data) => {
    if(table.table_number){
      dispatch(addToCart(data))
    }else{
      window.alert('Choose Table of Number First')
      navigate(ROUTES.TABLE_CASHIER)
    }
  }

  const _updateMenu = async (payload) => {
    let form = new FormData();
    form.append('menu_name', payload.menu_name);
    form.append('type', payload.type);
    form.append('subtype', payload.subtype);
    form.append('description', payload.description);
    form.append('image', payload.image);
    form.append('price', payload.price);
    try {
      const response = await fetchUpdate(form, data.id_menu);
      if (response) {
        _handleCloseDialogUpdate();
        getAll();
      }
    } catch (error) {
      _handleCloseDialogUpdate();
    }
  };

  return (
    <>
      <Card sx={styles.root}>
        {cashier ? (
          <CardActionArea onClick={() => _handleChoose(data)}>
            <CardMedia
              sx={styles.mediaCashier}
              image={SERVICES.IMAGE + '/' + data.image}
              title={data.menu_name}
            />
            <CardContent>
              <Typography sx={styles.title} variant="h4" gutterBottom>
                {data.menu_name.length > 13
                  ? data.menu_name.substring(0, 13) + '...'
                  : data.menu_name}
              </Typography>
              <Chip
                label={data.type + ' | ' + data.subtype}
                variant="outlined"
                sx={{ borderColor: '#3178F6', color: '#3178F6' }}
                size="small"
              />
              <Typography variant="body2" component="p" sx={{ paddingTop: 2, paddingBottom: 1.5 }}>
                {data.description.length > 60
                  ? data.description.toLowerCase().substring(0, 60) + '...'
                  : data.description.toLowerCase()}
              </Typography>
              <Typography sx={styles.pos}>{convertToRupiah(data.price)}</Typography>
            </CardContent>
          </CardActionArea>
        ) : (
          <>
            <CardMedia
              sx={styles.mediaAdmin}
              image={SERVICES.IMAGE + '/' + data.image}
              title={data.menu_name}
            />
            <CardContent>
              <Typography sx={styles.title} variant="h4" gutterBottom>
                {data.menu_name}
              </Typography>
              <Chip
                label={data.type + ' | ' + data.subtype}
                variant="outlined"
                sx={{ borderColor: '#3178F6', color: '#3178F6' }}
                size="small"
              />
              <Typography variant="body2" component="p" sx={{ paddingTop: 2, paddingBottom: 1.5 }}>
                {data.description.toLowerCase()}
              </Typography>
              <Typography sx={styles.pos}>{convertToRupiah(data.price)}</Typography>
            </CardContent>

            <CardActions disableSpacing>
              <Tooltip title="Edit Data">
                <IconButton onClick={_handleShowDialogUpdate}>
                  <EditRounded />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete data">
                <IconButton onClick={processDelete}>
                  <DeleteRounded />
                </IconButton>
              </Tooltip>
            </CardActions>
          </>
        )}
      </Card>
      <DialogUpdate
        handleClose={_handleCloseDialogUpdate}
        open={dialogUpdate}
        menu={data}
        processUpdate={_updateMenu}
      />
    </>
  );
};
export default Component;
Component.propTypes = {
  data: PropTypes.object,
  processDelete: PropTypes.func,
  getAll: PropTypes.func,
  cashier: PropTypes.bool,
};
