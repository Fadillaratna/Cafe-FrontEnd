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
} from '@mui/material';
import { SearchRounded } from '@mui/icons-material';

import TableUser from '../../../components/molecules/table/ListUser';
import DialogDelete from '../../../components/molecules/dialog/DialogDelete';
import DialogAddUser from '../../../components/molecules/dialog/DialogAddUser';
import DialogUpdate from '../../../components/molecules/dialog/DialogUpdateUser';
import Snackbar from '../../../components/atoms/Snackbar';

import { fetchGetAll, fetchDelete, fetchAdd, fetchUpdate } from './action';

const Component = () => {
  const [user, setUser] = useState([]);
  const [role, setRole] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [dialogDelete, setDialogDelete] = useState({ show: false, id: '', name_user: '' });
  const [dialogUpdate, setDialogUpdate] = useState({ show: false, user: {} });
  const [dialogAdd, setDialogAdd] = useState(false);
  const [alert, setAlert] = React.useState({
    message: '',
    severity: 'error',
    show: false,
  });

  const currencies = [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'admin',
      label: 'Admin',
    },
    {
      value: 'manager',
      label: 'Manager',
    },
    {
      value: 'cashier',
      label: 'Cashier',
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
      const response = await fetchGetAll(role, keyword);
      setUser(response.data);
    } catch (error) {
      setUser([]);
    }
  };

  const _deleteUser = async () => {
    try {
      const response = await fetchDelete(dialogDelete.id);
      if (response) {
        _handleCloseDialogDelete();
        _getAll();
        setAlert({
          show: true,
          severity: 'success',
          message: 'Success delete data user',
        });
      }
    } catch (error) {
      _handleCloseDialogDelete();
      if (error.err.name === 'SequelizeForeignKeyConstraintError') {
        setAlert({
          show: true,
          severity: 'warning',
          message: 'This data of user can not be deleted',
        });
      }
    }
  };

  const _addUser = async (payload, act) => {
    try {
      const response = await fetchAdd(payload);
      if (response) {
        _handleCloseDialogAdd();
        _getAll();
        setAlert({
          show: true,
          severity: 'success',
          message: 'Success add data user',
        });
      }
      act.resetForm();
    } catch (error) {
      _handleCloseDialogDelete();
      act.resetForm();
    }
  };

  const _updateUser = async (payload) => {
    try {
      const response = await fetchUpdate(payload, dialogUpdate.user.id_user);
      if (response) {
        _handleCloseDialogUpdate();
        _getAll();
        setAlert({
          show: true,
          severity: 'success',
          message: 'Success update data user',
        });
      }
    } catch (error) {
      _handleCloseDialogUpdate();
    }
  };

  const _handleCloseDialogDelete = () => {
    setDialogDelete({
      show: false,
    });
  };

  const _handleCloseDialogUpdate = () => {
    setDialogUpdate({
      show: false,
      user: dialogUpdate.user,
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
  }, [role, keyword]);

  return (
    <>
      <Stack direction="row" spacing={53} alignItems="center" sx={{ marginBottom: 5 }}>
        <Stack direction="column" spacing={1}>
          <Typography fontWeight={600}>List User</Typography>
          <Typography fontWeight={400} sx={{ fontSize: 15 }}>
            {user.length} data
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
            onChange={(e) => setRole(e.target.value)}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction="row" spacing={3} alignItems="center">
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
      <TableUser
        data={user}
        processDelete={(id, name) => setDialogDelete({ show: true, id: id, name_user: name })}
        processUpdate={(user) => setDialogUpdate({ show: true, user: user })}
      />
      <DialogDelete
        closeDialog={_handleCloseDialogDelete}
        showDialog={dialogDelete.show}
        data={dialogDelete.name_user}
        table="user"
        processDelete={_deleteUser}
      />
      <DialogAddUser
        handleClose={_handleCloseDialogAdd}
        open={dialogAdd}
        processAdd={(payload, act) => _addUser(payload, act)}
      />
      <DialogUpdate
        open={dialogUpdate.show}
        handleClose={_handleCloseDialogUpdate}
        processUpdate={(payload) => _updateUser(payload)}
        user={dialogUpdate.user}
        gender={dialogUpdate.user.gender}
      />
      <Snackbar alert={alert} open={alert.show} handleClose={_handleCloseSnackbar} />
    </>
  );
};

export default Component;
