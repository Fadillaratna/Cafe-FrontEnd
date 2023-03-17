import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTES } from './config';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import PublicRoute from './constants/PublicRoute';
import AdminRoute from './constants/AdminRoute';
import CashierRoute from './constants/CashierRoute';
import ManagerRoute from './constants/ManagerRoute';

import Login from './containers/pages/Login';
import DashboardAdmin from './containers/pages/DashboardAdmin';
import DashboardCashier from './containers/pages/DashboardCashier';
import DashboardManager from './containers/pages/DashboardManager';
import TableAdmin from './containers/pages/Table';
import TableCashier from './containers/pages/TableCashier';
import User from './containers/pages/User';
import MenuAdmin from './containers/pages/Menu';
import Food from './containers/pages/Food';
import Drink from './containers/pages/Drink';
import TransactionReportCashier from './containers/pages/TransactionReportCashier';
import HistoryTransactionManager from './containers/pages/HistoryTransactionManager';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path={ROUTES.DASHBOARD_ADMIN}
          element={
            <AdminRoute>
              <DashboardAdmin />
            </AdminRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path={ROUTES.TABLE_ADMIN}
          element={
            <AdminRoute>
              <TableAdmin />
            </AdminRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path={ROUTES.USER_ADMIN}
          element={
            <AdminRoute>
              <User />
            </AdminRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path={ROUTES.MENU_ADMIN}
          element={
            <AdminRoute>
              <MenuAdmin />
            </AdminRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path={ROUTES.DASHBOARD_CASHIER}
          element={
            <CashierRoute>
              <DashboardCashier />
            </CashierRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path={ROUTES.DASHBOARD_MANAGER}
          element={
            <ManagerRoute>
              <DashboardManager />
            </ManagerRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path={ROUTES.TABLE_CASHIER}
          element={
            <CashierRoute>
              <TableCashier />
            </CashierRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path={ROUTES.FOOD}
          element={
            <CashierRoute>
              <Food />
            </CashierRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path={ROUTES.DRINK}
          element={
            <CashierRoute>
              <Drink />
            </CashierRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path={ROUTES.TRANSACTION_REPORT_CASHIER}
          element={
            <CashierRoute>
              <TransactionReportCashier />
            </CashierRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path={ROUTES.TRANSACTION_REPORT_MANAGER}
          element={
            <ManagerRoute>
              <HistoryTransactionManager />
            </ManagerRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
