import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from '@mui/material';
import styles from './style';

import PropTypes from 'prop-types';
import { convertToRupiah } from '../../../../utils/formatRupiah';

const Component = (props) => {
  const { showDialog, closeDialog, data } = props;

  const detail_transaksi = data.detail_transaksi;

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={showDialog}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={styles.title}>
          Detail Transaction
        </DialogTitle>
        <DialogContent sx={styles.confirmContent}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell>Menu</TableCell>
                  <TableCell align="left">Qty</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Note</TableCell>
                  <TableCell align="left">Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detail_transaksi?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.menu.menu_name}
                    </TableCell>
                    <TableCell align="left">{row.qty}</TableCell>
                    <TableCell align="left">{convertToRupiah(row.menu.price)}</TableCell>
                    <TableCell align="left">{row.notes}</TableCell>
                    <TableCell align="left">{convertToRupiah(row.price)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell align="left">{convertToRupiah(data.total)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={styles.action}>
          <Button onClick={closeDialog} sx={styles.btnCancel} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Component;
Component.propTypes = {
  showDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
  data: PropTypes.string,
};
