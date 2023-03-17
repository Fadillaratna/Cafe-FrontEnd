import React, { useEffect, useState } from 'react';

//? Component
import {
  Stack,
  TextField,
  MenuItem,
  Typography,
  OutlinedInput,
  Button,
  FormControl,
  InputAdornment,
  Grid,
} from '@mui/material';
import { SearchRounded } from '@mui/icons-material';

import CardMenu from '../../../components/molecules/card/CardMenu';
import DialogDelete from '../../../components/molecules/dialog/DialogDelete';
import DialogAddMenu from '../../../components/molecules/dialog/DialogAddMenu';
import Snackbar from '../../../components/atoms/Snackbar';

import { fetchGetAll, fetchDelete, fetchAdd } from './action';

const Component = () => {
  const [menu, setMenu] = useState([]);
  const [type, setType] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [subtype, setSubtype] = useState('');
  const [dialogDelete, setDialogDelete] = useState({ show: false, id: '', menu_name: '' });
  const [dialogAdd, setDialogAdd] = useState(false);
  const [alert, setAlert] = React.useState({
    message: '',
    severity: 'error',
    show: false,
  });

  const types = [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'food',
      label: 'Food',
    },
    {
      value: 'drink',
      label: 'Drink',
    },
  ];

  const subtypes = [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'appetizer',
      label: 'Appetizer',
    },
    {
      value: 'main course',
      label: 'Main Course',
    },
    {
      value: 'dessert',
      label: 'Dessert',
    },
    {
      value: 'mocktail',
      label: 'Mocktail',
    },
    {
      value: 'coffee',
      label: 'coffee',
    },
    {
      value: 'milk based',
      label: 'Milk Based',
    },
  ];

  const _handleCloseSnackbar = () => {
    setAlert({
      show: false,
      severity: alert.severity,
      message: alert.message,
    });
  };

  const _getAll = async () => {
    try {
      const response = await fetchGetAll(type, keyword, subtype);
      setMenu(response.data);
    } catch (error) {
      setMenu([]);
    }
  };

  const _deleteMenu = async () => {
    try {
      const response = await fetchDelete(dialogDelete.id);
      if (response) {
        _handleCloseDialogDelete();
        _getAll();
        setAlert({
          show: true,
          severity: 'success',
          message: 'Success delete data menu',
        });
      }
    } catch (error) {
      _handleCloseDialogDelete();
      if (error.err.name === 'SequelizeForeignKeyConstraintError') {
        setAlert({
          show: true,
          severity: 'warning',
          message: 'This data of menu can not be deleted',
        });
      }
    }
  };

  const _addMenu = async (payload, act) => {
    let form = new FormData();
    form.append('menu_name', payload.menu_name);
    form.append('type', payload.type);
    form.append('subtype', payload.subtype);
    form.append('description', payload.description);
    form.append('image', payload.image);
    form.append('price', payload.price);
    try {
      const response = await fetchAdd(form);
      if (response) {
        _handleCloseDialogAdd();
        _getAll();
        setAlert({
          show: true,
          severity: 'success',
          message: 'Success add data menu',
        });
      }
      act.resetForm();
    } catch (error) {
      console.log(error)
      _handleCloseDialogDelete();
      act.resetForm();
    }
  };


  const _handleCloseDialogDelete = () => {
    setDialogDelete({
      show: false,
    });
  };

  const _handleCloseDialogAdd = () => {
    setDialogAdd(false);
  };

  const _handleShowDialogAdd = () => {
    setDialogAdd(true);
  };

  useEffect(() => {
    _getAll();
  }, [type, keyword, subtype]);

  return (
    <>
      <Stack direction="row" spacing={40} alignItems="center" sx={{ marginBottom: 5 }}>
        <Stack direction="column" spacing={1}>
          <Typography fontWeight={600}>List Menu</Typography>
          <Typography fontWeight={400} sx={{ fontSize: 15 }}>
            {menu.length} data
          </Typography>
        </Stack>
        <Stack direction="row" spacing={5} alignItems="center">
          <TextField
            id="outlined-select-currency"
            select
            variant="standard"
            defaultValue="all"
            sx={{ width: 150 }}
            size="small"
            onChange={(e) => setType(e.target.value)}
          >
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction="row" spacing={3} alignItems="center">
            <TextField
              id="subtype"
              select
              variant="standard"
              defaultValue="all"
              sx={{ width: 150 }}
              size="small"
              onChange={(e) => setSubtype(e.target.value)}
            >
              {subtypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" size="small">
              <OutlinedInput
                id="outlined-adornment-password"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchRounded />
                  </InputAdornment>
                }
                placeholder="Search"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </FormControl>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#3178F6', boxShadow: 'none' }}
              size="Small"
              onClick={_handleShowDialogAdd}
            >
              Add Data
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Grid container spacing={4} justifyContent="left" columns={{ xs: 4, sm: 8, md: 12 }}>
        {menu.map((item, i) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <CardMenu
                data={item}
                processDelete={() =>
                  setDialogDelete({ show: true, id: item.id_menu, menu_name: item.menu_name })
                }
                getAll={_getAll}
                cashier={false}
              />
            </Grid>
          );
        })}
      </Grid>
      <DialogDelete
        closeDialog={_handleCloseDialogDelete}
        showDialog={dialogDelete.show}
        data={dialogDelete.menu_name}
        table="menu"
        processDelete={_deleteMenu}
      />
      <DialogAddMenu
        handleClose={_handleCloseDialogAdd}
        open={dialogAdd}
        processAdd={(payload, act) => _addMenu(payload, act)}
      />
      <Snackbar alert={alert} open={alert.show} handleClose={_handleCloseSnackbar} />
    </>
  );
};

export default Component;
