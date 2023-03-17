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

import Table from '../../../components/molecules/table/TableListTable';
import DialogDelete from '../../../components/molecules/dialog/DialogDelete';
import DialogAddTable from '../../../components/molecules/dialog/DialogAddTable';
import DialogUpdate from '../../../components/molecules/dialog/DialogUpdateTable';
import Snackbar from '../../../components/atoms/Snackbar';

import { fetchGetAll, fetchDelete, fetchAdd, fetchUpdate } from './action';

const Component = () => {
  const [table, setTable] = useState([]);
  const [status, setStatus] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [dialogDelete, setDialogDelete] = useState({ show: false, id: '', table_number: '' });
  const [dialogUpdate, setDialogUpdate] = useState({ show: false, table: {} });
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
      value: 'available',
      label: 'Available',
    },
    {
      value: 'booked',
      label: 'Booked',
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
      const response = await fetchGetAll(status, keyword);
      setTable(response.data);
    } catch (error) {
      setTable([]);
    }
  };

  const _deleteTable = async () => {
    try {
      const response = await fetchDelete(dialogDelete.id);
      if (response) {
        _handleCloseDialogDelete();
        _getAll();
        setAlert({
          show: true,
          severity: 'success',
          message: 'Success delete data table',
        });
      }
    } catch (error) {
      _handleCloseDialogDelete();
      if (error.err.name === 'SequelizeForeignKeyConstraintError') {
        setAlert({
          show: true,
          severity: 'warning',
          message: 'This data of table can not be deleted',
        });
      }
    }
  };

  const _addTable = async (payload, act) => {
    try {
      const response = await fetchAdd(payload);
      if (response) {
        _handleCloseDialogAdd();
        _getAll();
        setAlert({
          show: true,
          severity: 'success',
          message: 'Success add data table',
        });
      }
      act.resetForm();
    } catch (error) {
      _handleCloseDialogDelete();
      act.resetForm();
    }
  };

  const _updateTable = async (payload) => {
    try {
      const response = await fetchUpdate(payload, dialogUpdate.table.id_meja);
      if (response) {
        _handleCloseDialogUpdate();
        _getAll();
        setAlert({
          show: true,
          severity: 'success',
          message: 'Success update data table',
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
      table: dialogUpdate.table,
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
  }, [status, keyword]);

  return (
    <>
      <Stack direction="row" spacing={53} alignItems="center" sx={{ marginBottom: 5 }}>
        <Stack direction="column" spacing={1}>
          <Typography fontWeight={600}>List Table</Typography>
          <Typography fontWeight={400} sx={{ fontSize: 15 }}>
            {table.length} data
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
            onChange={(e) => setStatus(e.target.value)}
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
      <Table
        data={table}
        processDelete={(id, number) =>
          setDialogDelete({ show: true, id: id, table_number: number })
        }
        processUpdate={(table) => setDialogUpdate({ show: true, table: table })}
      />
      <DialogDelete
        closeDialog={_handleCloseDialogDelete}
        showDialog={dialogDelete.show}
        data={dialogDelete.table_number}
        table="table"
        processDelete={_deleteTable}
      />
      <DialogAddTable
        handleClose={_handleCloseDialogAdd}
        open={dialogAdd}
        processAdd={(payload, act) => _addTable(payload, act)}
      />
      <DialogUpdate
        open={dialogUpdate.show}
        handleClose={_handleCloseDialogUpdate}
        processUpdate={(payload) => _updateTable(payload)}
        table={dialogUpdate.table}
      />
      <Snackbar alert={alert} open={alert.show} handleClose={_handleCloseSnackbar} />
    </>
  );
};

export default Component;
