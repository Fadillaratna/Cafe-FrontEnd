import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

//? Component
import {
  Stack,
  TextField,
  MenuItem,
  Typography,
  OutlinedInput,
  FormControl,
  InputAdornment,
} from '@mui/material';
import { SearchRounded } from '@mui/icons-material';

import TableHistory from '../../../components/molecules/table/HistoryTransaction';
import Snackbar from '../../../components/atoms/Snackbar';
import DialogDetail from '../../../components/molecules/dialog/DialogInfoHistory';
import DialogPay from '../../../components/molecules/dialog/DialogPayOrder';

import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import '@progress/kendo-theme-material/dist/all.css';

import { fetchGetAllTransaction, fetchGetAllUser, fetchPayOrder } from './action';
import { getUserData } from '../../../utils/storage';
import { formatDate } from '../../../utils/dateFormat';
import { convertToRupiah } from '../../../utils/formatRupiah';

import {
  handleUpdateOrder,
  handleGetDetail,
  handleTable,
  addCustomer,
  handleIdTransaction,
} from '../../../reducers/global';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config';

const PrintElement = (props) => {
  const { item } = props;

  return (
    <div id="invoice-POS">
      <center id="top">
        <h2 className="brand-name">Specta Cafe</h2>
        <p className="address">
          Jl. Danau Ranau, Sawojajar, Kec. Kedungkandang, Kota Malang, Jawa Timur 65139 |
          (0822)56710
        </p>
      </center>

      <div id="mid">
        <div className="info">
          <p>
            Invoice Code: {item.invoice_code} <br></br>
            Cashier : {item.user.name_user} <br></br>
            Customer : {item.customer_name}
            <br></br>
            Table : {item.meja.table_number}
            <br></br>
            Transaction Date : {formatDate(item.transaction_date)}
            <br></br>
          </p>
        </div>
      </div>

      <br />
      <br />
      <br />

      <div id="bot">
        <div id="table">
          <table id="table-invoice">
            <tr className="tabletitle">
              <td className="item">
                <b>Item</b>
              </td>
              <td className="Hours">
                <b>Qty</b>
              </td>
              <td className="Rate">
                <b>Price</b>
              </td>
              <td className="Rate">
                <b>Sub Total</b>
              </td>
            </tr>

            {item.detail_transaksi.map((detail, i) => {
              return (
                <tr className="service" key={i}>
                  <td className="tableitem">
                    <p className="itemtext">{detail.menu.menu_name}</p>
                  </td>
                  <td className="tableitem">
                    <p className="itemtext">{detail.qty}</p>
                  </td>
                  <td className="tableitem">
                    <p className="itemtext">{convertToRupiah(detail.menu.price)}</p>
                  </td>
                  <td className="tableitem">
                    <p className="itemtext">{convertToRupiah(detail.subtotal)}</p>
                  </td>
                </tr>
              );
            })}

            <tr className="tabletitle">
              <td></td>
              <td></td>
              <td className="Rate">
                <b>Total</b>
              </td>
              <td className="payment">
                <b>{convertToRupiah(item.total)}</b>
              </td>
            </tr>
          </table>
        </div>

        <div id="legalcopy">
          <p className="legal">
            <strong>Thank you for your order!</strong> 
          </p>
        </div>
      </div>
    </div>
  );
};

const Component = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState([]);
  const [cashier, setCashier] = useState([]);
  const [printData, setPrintData] = useState({});
  const [isPrint, setIsPrint] = useState(false);
  const [user, setUser] = useState('');
  const [date, setDate] = useState('');
  const [keyword, setKeyword] = useState('');
  const [month, setMonth] = useState('all');
  const [dialogConfirm, setDialogConfirm] = useState({
    show: false,
    data: {},
  });
  const [alert, setAlert] = useState({
    message: '',
    severity: 'error',
    show: false,
  });
  const [showDetail, setShowDetail] = useState({
    show: false,
  });
  const [data, setData] = useState({});
  const [total, setTotal] = useState(0);
  const [months, setMonths] = useState([
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ]);

  const _handleCloseSnackbar = () => {
    setAlert({
      show: false,
      severity: alert.severity,
      message: alert.message,
    });
  };
  const pdfExportComponent = useRef(null);
  const container = useRef(null);

  const role = getUserData() ? getUserData().role : null;
  const cashier_name = getUserData() ? getUserData().name_user : null;

  const dispatch = useDispatch();

  const _getAllTransaction = async () => {
    try {
      let response;
      if (role === 'cashier') {
        response = await fetchGetAllTransaction(date, cashier_name, keyword, month);
      } else {
        response = await fetchGetAllTransaction(date, user, keyword, month);
      }
      let dataTransaksi = response.data;
      let totalAll = 0;
      for (let i = 0; i < dataTransaksi.length; i++) {
        let total = 0;
        for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
          let subtotal = dataTransaksi[i].detail_transaksi[j].subtotal;

          total += subtotal;
        }
        totalAll += total;

        dataTransaksi[i].total = total;
      }
      setTotal(totalAll);
      setTransaction(dataTransaksi);
    } catch (error) {
      setTransaction([]);
    }
  };

  const _getAllCashier = async () => {
    try {
      const response = await fetchGetAllUser('cashier', '');
      setCashier(response.data);
    } catch (error) {
      setCashier([]);
    }
  };

  const _handlePayOrder = async (total_bayar, actions) => {
    let payload = {
      total_bayar: total_bayar,
    };
    try {
      const response = await fetchPayOrder(dialogConfirm.data.id_transaksi, payload);
      if (response) {
        _handleCloseDialogConfirm();
        setAlert({
          show: true,
          severity: 'success',
          message: 'Success pay order of customer ' + dialogConfirm.data.customer_name,
        });
        _getAllTransaction();
        actions.resetForm();
      }
    } catch (error) {}
  };

  const _handleOpenDetail = (item) => {
    setShowDetail({
      show: true,
    });
    setData(item);
  };

  const _handleCloseDetail = () => {
    setShowDetail({
      show: false,
    });
    setData({});
  };

  const _handleCloseDialogConfirm = () => {
    setDialogConfirm({
      show: false,
      data: dialogConfirm.data,
    });
  };

  const _handleShowDialogConfirm = (data) => {
    console.log(data);
    setDialogConfirm({
      show: true,
      data: data,
    });
  };

  const _handleUpdateOrder = (item) => {
    dispatch(handleUpdateOrder(true));
    dispatch(handleGetDetail(item.detail_transaksi));
    dispatch(handleTable(item.meja));
    dispatch(addCustomer(item.customer_name));
    dispatch(handleIdTransaction(item.id_transaksi));
    navigate(ROUTES.FOOD);
  };

  const _handlePrintBill = (item) => {
    let element = container.current;
    setIsPrint(true);
    setPrintData(item);
    console.log(item);
    setTimeout(() => {
      // pdfExportComponent.current.save();
      savePDF(container.current, {
        fileName: `Invoice-${item.invoice_code}`,
      });
      setIsPrint(false);
    }, 500);
  };

  useEffect(() => {
    _getAllTransaction();
  }, [date, user, keyword, month]);

  useEffect(() => {
    if (role === 'manager') {
      _getAllCashier();
    }
  }, []);

  return (
    <>
      {role === 'manager' ? (
        <>
          <Stack direction="row" spacing={42} alignItems="center" sx={{ marginBottom: 5 }}>
            <Stack direction="column" spacing={1}>
              <Typography fontWeight={600}>Transaction</Typography>
              <Typography fontWeight={400} sx={{ fontSize: 15 }}>
                {transaction.length} data
              </Typography>
              <Typography fontWeight={500} sx={{ fontSize: 15 }}>
                {convertToRupiah(total)}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={3} alignItems="center">
              <TextField
                id="outlined-select-currency"
                select
                variant="standard"
                defaultValue="all"
                sx={{ width: 200 }}
                size="small"
                onChange={(e) => setUser(e.target.value)}
              >
                <MenuItem key={'all'} value={'all'}>
                  All
                </MenuItem>
                {cashier.map((option) => (
                  <MenuItem key={option.name_user} value={option.name_user}>
                    {option.name_user}
                  </MenuItem>
                ))}
              </TextField>
              <Stack direction="row" spacing={3} alignItems="center">
                <TextField
                  id="date"
                  type="date"
                  variant="outlined"
                  defaultValue=""
                  sx={{ width: 185 }}
                  size="small"
                  onChange={(e) => setDate(e.target.value)}
                />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" size="small">
                  <TextField
                    id="outlined-select-currency"
                    select
                    variant="standard"
                    defaultValue="all"
                    sx={{ width: 200 }}
                    size="small"
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    <MenuItem key={'all'} value={'all'}>
                      All
                    </MenuItem>
                    {months.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          {/* <Typography fontWeight={600} sx={{ fontSize: 15, marginBottom: 5 }}>
            {convertToRupiah(total)}
          </Typography> */}
        </>
      ) : (
        <Stack direction="row" spacing={60} alignItems="center" sx={{ marginBottom: 5 }}>
          <Stack direction="column" spacing={1}>
            <Typography fontWeight={600}>Transaction</Typography>
            <Typography fontWeight={400} sx={{ fontSize: 15 }}>
              {transaction.length} data
            </Typography>
          </Stack>
          <Stack direction="row" spacing={5} alignItems="center">
            <TextField
              id="date"
              type="date"
              variant="outlined"
              defaultValue=""
              sx={{ width: 185 }}
              size="small"
              onChange={(e) => setDate(e.target.value)}
            />
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
          </Stack>
        </Stack>
      )}
      <TableHistory
        data={transaction}
        getDetail={(data) => _handleOpenDetail(data)}
        processPay={(item) => _handleShowDialogConfirm(item)}
        processUpdate={(item) => _handleUpdateOrder(item)}
        processPrint={(item) => _handlePrintBill(item)}
      />
      <Snackbar alert={alert} open={alert.show} handleClose={_handleCloseSnackbar} />
      <DialogDetail showDialog={showDetail.show} closeDialog={_handleCloseDetail} data={data} />
      <DialogPay
        closeDialog={_handleCloseDialogConfirm}
        processSave={(total_bayar, actions) => _handlePayOrder(total_bayar, actions)}
        showDialog={dialogConfirm.show}
        title="Pay Order"
        message={
          'Are you sure want to pay order by customer ' + dialogConfirm.data.customer_name + '?'
        }
        total={dialogConfirm.data.total}
      />

      <div
        className="page-container hidden-on-narrow"
        style={{
          position: 'absolute',
          left: '-1000px',
          top: 0,
        }}
      >
        <PDFExport ref={pdfExportComponent}>
          <div ref={container}>{isPrint ? <PrintElement item={printData} /> : null}</div>
        </PDFExport>
      </div>
    </>
  );
};

export default Component;
