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
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Telephone</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, i) => (
              <TableRow
                key={item.id_user}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="left">{item.name_user}</TableCell>
                <TableCell align="left">{item.username}</TableCell>
                <TableCell align="left">{item.gender}</TableCell>
                <TableCell align="left">{item.telephone}</TableCell>
                <TableCell align="left">
                  <Chip
                    label={item.role.toUpperCase()}
                    color={
                      item.role === 'admin'
                        ? 'primary'
                        : item.role === 'cashier'
                        ? 'success'
                        : 'warning'
                    }
                  />
                </TableCell>
                <TableCell align="left">
                  <Tooltip title="Delete data">
                    <IconButton onClick={() => processDelete(item.id_user, item.name_user)}>
                      <DeleteRounded />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Data">
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
