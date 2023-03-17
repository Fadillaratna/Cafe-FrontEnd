import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Tooltip,
  Collapse,
  Box,
  Typography,
} from '@mui/material';
import { InfoRounded, PrintRounded, PaymentRounded, EditRounded } from '@mui/icons-material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

import PropTypes from 'prop-types';
import { formatDate } from '../../../../utils/dateFormat';
import { getUserData } from '../../../../utils/storage';
import { convertToRupiah } from '../../../../utils/formatRupiah';

const Row = (props) => {
  const { item, index, getDetail, processPrint, processPay, processUpdate } = props;
  const [open, setOpen] = useState(false);

  const role = getUserData() ? getUserData().role : null;

  return (
    <React.Fragment>
      <TableRow key={item.id_transaksi} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {/* <TableCell component="th" scope="row">
          {index + 1}
        </TableCell> */}
        <TableCell align="left">{item.invoice_code}</TableCell>
        <TableCell align="left">{formatDate(item.transaction_date)}</TableCell>
        <TableCell align="left">{item.customer_name}</TableCell>
        <TableCell align="left">{item.meja.table_number}</TableCell>
        <TableCell align="left">{convertToRupiah(item.total)}</TableCell>
        <TableCell align="left">{item.total_bayar ? convertToRupiah(item.total_bayar) : '-'}</TableCell>
        <TableCell align="left">{item.user.name_user}</TableCell>
        <TableCell align="left">
          <Chip
            label={item.status.toUpperCase()}
            color={item.status === 'paid' ? 'success' : 'error'}
          />
        </TableCell>
        <TableCell align="left">
          {/* <Tooltip title="View Detail Transaction">
            <IconButton onClick={() => getDetail(item)}>
              <InfoRounded />
            </IconButton>
          </Tooltip> */}
          <Tooltip title="Print Bill">
            <IconButton onClick={() => processPrint(item)}>
              <PrintRounded />
            </IconButton>
          </Tooltip>
          {role === 'cashier' && (
            <>
              <Tooltip title="Pay Order">
                <IconButton
                  onClick={() => processPay(item)}
                  disabled={item.status === 'paid' ? true : false}
                >
                  <PaymentRounded />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Order">
                <IconButton
                  onClick={() => processUpdate(item)}
                  disabled={item.status === 'paid' ? true : false}
                >
                  <EditRounded />
                </IconButton>
              </Tooltip>
            </>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detail Transaction
              </Typography>
              <Table size="normal" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Menu</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.detail_transaksi?.map((detail) => (
                    <TableRow key={detail.id_detail_transaksi}>
                      <TableCell component="th" scope="row">
                        {detail.menu.menu_name}
                      </TableCell>
                      <TableCell>{detail.qty}</TableCell>
                      <TableCell align="right">{convertToRupiah(detail.menu.price)}</TableCell>
                      <TableCell align="right">{convertToRupiah(detail.subtotal)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const Component = (props) => {
  const { data, getDetail, processPrint, processPay, processUpdate } = props;

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)' }}>
              <TableCell />
              {/* <TableCell>#</TableCell> */}
              <TableCell align="left">Invoice Code</TableCell>
              <TableCell align="left">Transaction Date</TableCell>
              <TableCell align="left">Customer</TableCell>
              <TableCell align="left">Table</TableCell>
              <TableCell align="left">Total</TableCell>
              <TableCell align="left">Total Pay</TableCell>
              <TableCell align="left">Employee</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, i) => (
              <Row
                item={item}
                key={i}
                index={i}
                getDetail={getDetail}
                processPrint={processPrint}
                processPay={processPay}
                processUpdate={processUpdate}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Component;
Component.propTypes = {
  data: PropTypes.object,
  getDetail: PropTypes.func,
  processPrint: PropTypes.func,
  processPay: PropTypes.func,
  processUpdate: PropTypes.func,
};
