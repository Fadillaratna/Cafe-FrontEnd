import React, { useEffect, useState } from 'react';

//? Component
import { Grid, Typography } from '@mui/material';

import Snackbar from '../../../components/atoms/Snackbar';
import CardTable from '../../../components/atoms/CardTable';

import { fetchGetAll } from './action';

const Component = () => {
  const [table, setTable] = useState([]);
  const [status, setStatus] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [alert, setAlert] = React.useState({
    message: '',
    severity: 'error',
    show: false,
  });
  const [activeItem, setActiveItem] = useState(null);

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
      let capacity = [];
      for (let i = 0; i < response.data.length; i++) {
        capacity.push(response.data[i].capacity);
      }
      capacity = [...new Set(capacity)];

      let data = new Array(capacity.length);
      for (let j = 0; j < capacity.length; j++) {
        data[j] = { capacity: capacity[j], data: [], availableCount: 0 };
      }

      for (let i = 0; i < response.data.length; i++) {
        for (let j = 0; j < capacity.length; j++) {
          if (response.data[i].capacity === data[j].capacity) {
            data[j].data.push(response.data[i]);
          }
        }
      }

      for (let i = 0; i < data.length; i++) {
        let table = data[i].data;
        let count = 0;
        for (let j = 0; j < table.length; j++) {
          if (table[j].status === 'available') {
            count++;
          }
        }
        data[i].availableCount = count;
      }

      setTable(data);
    } catch (error) {
      setTable([]);
    }
  };


  useEffect(() => {
    _getAll();
  }, [status, keyword]);

  return (
    <>
      {table.map((item, i) => (
        <div key={i}>
          <Typography
            sx={{
              fontWeight: 500,
              color: '#b2bfd2',
              marginBottom: 1.5,
              marginTop: i === 0 ? 0 : 4,
            }}
          >
            For {item.capacity} Person ({item.availableCount})
          </Typography>
          <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {item.data.map((data, index) => (
                <Grid item xs={2} sm={4} md={1.71} key={index}>
                  <CardTable
                    data={data}
                    id={data}
                    setActiveItem={setActiveItem}
                    activeItem={activeItem}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        </div>
      ))}
      <Snackbar alert={alert} open={alert.show} handleClose={_handleCloseSnackbar} />
    </>
  );
};

export default Component;
