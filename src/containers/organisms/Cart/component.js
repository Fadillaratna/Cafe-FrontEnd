import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//? Component
import {
  Typography,
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Divider,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

import ChipDate from '../../../components/atoms/ChipDate';
import CardMenu from '../../../components/molecules/card/LanscapeCardMenu';
import Snackbar from '../../../components/atoms/Snackbar';
import DialogConfirm from '../../../components/molecules/dialog/DialogConfirm';

import { getUserData } from '../../../utils/storage';
import { fetchAdd, fetchUpdate } from './action';
import { ROUTES } from '../../../config';
import {
  addCustomer,
  checkout,
  handleTable,
  handleUpdateOrder,
  handleIdTransaction,
} from '../../../reducers/global';
import { convertToRupiah } from '../../../utils/formatRupiah';

const Component = () => {
  const [cashier, setCashier] = useState({});
  const [total, setTotal] = useState(0);
  const [dialogConfirm, setDialogConfirm] = useState(false);
  const [alert, setAlert] = useState(false);

  const { table, cart, customer_name, isUpdate, id_transaksi } = useSelector((file) => file.global);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _getCashier = () => {
    if (getUserData()) {
      setCashier(getUserData());
    }
  };

  const _getTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      cart[i].price ? total += cart[i].price * cart[i].qty : total += cart[i].menu.price * cart[i].qty
    }
    setTotal(total);
  };

  const _handleCloseDialogConfirm = () => {
    setDialogConfirm(false);
  };

  const _handleShowDialogConfirm = () => {
    setDialogConfirm(true);
  };

  const _handleSaveOrder = async () => {
    let payload = {
      id_meja: table.id_meja,
      id_user: cashier.id_user,
      customer_name: customer_name,
      list_menu: cart,
    };
    try {
      const response = await fetchAdd(payload);
      if (response) {
        dispatch(addCustomer(''));
        dispatch(handleTable({}));
        dispatch(checkout());
        _handleCloseDialogConfirm();
        setAlert({
          show: true,
          severity: 'success',
          message: 'Success save order',
        });
        setTimeout(() => {
          navigate(ROUTES.TRANSACTION_REPORT_CASHIER);
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _handleUpdateOrder = async () => {
    let payload = {
      list_order: cart,
    };
    try {
      const response = await fetchUpdate(payload, id_transaksi);
      if (response) {
        dispatch(addCustomer(''));
        dispatch(handleTable({}));
        dispatch(checkout());
        dispatch(handleUpdateOrder(false));
        dispatch(handleIdTransaction(null));
        _handleCloseDialogConfirm();
        setAlert({
          show: true,
          severity: 'success',
          message: 'Success update order',
        });
        setTimeout(() => {
          navigate(ROUTES.TRANSACTION_REPORT_CASHIER);
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _handleCloseSnackbar = () => {
    setAlert({
      show: false,
      severity: alert.severity,
      message: alert.message,
    });
  };

  useEffect(() => {
    _getCashier();
  }, []);

  useEffect(() => {
    _getTotal();
  }, [cart]);

  return (
    <>
      {console.log(cart)}
      <ChipDate />
      <Typography sx={{ marginTop: 3, fontSize: 15, color: '#fff' }}>
        Cashier &emsp; &emsp; : {cashier.name_user}
      </Typography>
      {table.table_number ? (
        <Typography sx={{ marginTop: 1.5, fontSize: 15, color: '#fff' }}>
          Table &emsp; &emsp; &emsp;: {table.table_number} for {table.capacity} Person
        </Typography>
      ) : null}
      {customer_name ? (
        <Typography sx={{ marginTop: 1.5, fontSize: 15, color: '#fff' }}>
          Cust Name&emsp;: {customer_name}
        </Typography>
      ) : null}

      {cart.length !== 0 ? (
        <Box sx={{ py: 2 }}>
          {cart.map((item, i) => {
            return <CardMenu menu={item} key={i} />;
          })}

          <Divider
            sx={{ borderStyle: 'dashed', borderColor: 'white', borderWidth: 1.8, marginTop: 8 }}
          />
          <Table
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: 'none',
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 18, fontWeight: 600, color: 'white' }}>Total</TableCell>
                <TableCell
                  sx={{ fontSize: 18, fontWeight: 600, color: 'white', minWidth: 220 }}
                  align="right"
                >
                  {convertToRupiah(total)}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#3178F6', boxShadow: 'none' }}
            onClick={isUpdate ? _handleUpdateOrder : _handleShowDialogConfirm}
          >
            {isUpdate ? 'Update Order' : 'Save Order'}
          </Button>
        </Box>
      ) : null}
      <Snackbar alert={alert} open={alert.show} handleClose={_handleCloseSnackbar} />
      <DialogConfirm
        closeDialog={_handleCloseDialogConfirm}
        processSave={_handleSaveOrder}
        showDialog={dialogConfirm}
        title="Save Order"
        message="Are you sure want to save this order?"
      />
    </>
  );
};

export default Component;
