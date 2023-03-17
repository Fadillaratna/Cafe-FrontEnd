import React from 'react';
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
} from '@mui/material';
import { DeleteRounded, EditRounded } from '@mui/icons-material';

import PropTypes from 'prop-types';

const Component = (props) => {
  const { data, processDelete, processUpdate } = props;

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)' }}>
              <TableCell>#</TableCell>
              <TableCell align="left">Table Number</TableCell>
              <TableCell align="left">Capacity</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, i) => (
              <TableRow
                key={item.id_meja}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="left">{item.table_number}</TableCell>
                <TableCell align="left">{item.capacity} people</TableCell>
                <TableCell align="left">
                  <Chip
                    label={item.status.toUpperCase()}
                    color={item.status === 'booked' ? 'error' : 'success'}
                  />
                </TableCell>
                <TableCell align="left">
                  <Tooltip title="Delete data">
                    <IconButton onClick={() => processDelete(item.id_meja, item.table_number)}>
                      <DeleteRounded />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit data">
                    <IconButton onClick={() => processUpdate(item)}>
                      <EditRounded />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
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
  processDelete: PropTypes.func,
  processUpdate: PropTypes.func,
};
