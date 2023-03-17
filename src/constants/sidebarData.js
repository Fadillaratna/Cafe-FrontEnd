import React from 'react';
import {
  GridViewRounded,
  PriceChange,
  Payment,
  TableBarRounded,
  FoodBankRounded,
  FastfoodRounded, 
  CoffeeRounded,
  GroupRounded,
} from '@mui/icons-material';
import { ROUTES } from '../config';

export const sidebarAdmin = [
  {
    title: 'Dashboard',
    path: ROUTES.DASHBOARD_ADMIN,
    icon: <GridViewRounded />,
  },
  {
    title: 'Table',
    path: ROUTES.TABLE_ADMIN,
    icon: <TableBarRounded />,
  },
  {
    title: 'Menu',
    path: ROUTES.MENU_ADMIN,
    icon: <FoodBankRounded />,
  },
  {
    title: 'User',
    path: ROUTES.USER_ADMIN,
    icon: <GroupRounded />,
  },
  // {
  //   title: 'History Transaction',
  //   path: ROUTES.HISTORY_TRANSACTION_ADMIN,
  //   icon: <Payment />,
  // },
];

export const sidebarCashier = [
  {
    title: 'Dashboard',
    path: ROUTES.DASHBOARD_CASHIER,
    icon: <GridViewRounded />,
  },
  {
    title: 'Table',
    path: ROUTES.TABLE_CASHIER,
    icon: <TableBarRounded />,
  },
  {
    title: 'Food',
    path: ROUTES.FOOD,
    icon: <FastfoodRounded />,
  },
  {
    title: 'Drink',
    path: ROUTES.DRINK,
    icon: <CoffeeRounded />,
  },
  {
    title: 'Transaction Report',
    path: ROUTES.TRANSACTION_REPORT_CASHIER,
    icon: <Payment />,
  },
]

export const sidebarManager = [
  {
    title: 'Dashboard',
    path: ROUTES.DASHBOARD_MANAGER,
    icon: <GridViewRounded />,
  },
  {
    title: 'Transaction Report',
    path: ROUTES.TRANSACTION_REPORT_MANAGER,
    icon: <Payment />,
  },
];
