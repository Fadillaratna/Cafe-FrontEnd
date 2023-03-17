import React, { useEffect, useState } from 'react';

//? Component
import {
  Stack,
  OutlinedInput,
  FormControl,
  InputAdornment,
  Grid,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  SearchRounded,
  BakeryDiningRounded,
  KebabDiningRounded,
  RiceBowlRounded,
  BentoRounded,
} from '@mui/icons-material';

import CardMenu from '../../../components/molecules/card/CardMenu';

import { fetchGetAll } from './action';

const Component = () => {
  const [menu, setMenu] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [subtype, setSubtype] = useState('all');
  // {
  //   value: 'mocktail',
  //   label: 'Mocktail',
  // },
  // {
  //   value: 'coffee',
  //   label: 'coffee',
  // },
  // {
  //   value: 'milk based',
  //   label: 'Milk Based',
  // },
  const subtypes = [
    {
      value: 'all',
      label: 'All',
      icon: <BentoRounded />,
    },
    {
      value: 'mocktail',
      label: 'Mocktail',
      icon: <KebabDiningRounded />,
    },
    {
      value: 'coffee',
      label: 'Coffee',
      icon: <RiceBowlRounded />,
    },
    {
      value: 'milk based',
      label: 'Milk Based',
      icon: <BakeryDiningRounded />,
    },
  ];

  const _getAll = async () => {
    try {
      const response = await fetchGetAll('drink', keyword, subtype);
      setMenu(response.data);
    } catch (error) {
      setMenu([]);
    }
  };

  useEffect(() => {
    _getAll();
  }, [keyword, subtype]);

  return (
    <>
      <Stack direction="row" spacing={46} alignItems="center" sx={{ marginBottom: 5 }}>
        <Stack direction="row" spacing={2} alignItems="center">
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
        </Stack>
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
      <Grid container spacing={4} justifyContent="left" columns={{ xs: 4, sm: 8, md: 12 }}>
        {menu.map((item, i) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <CardMenu data={item} cashier={true} getAll={_getAll} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Component;
