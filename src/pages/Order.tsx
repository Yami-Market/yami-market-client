import { useQuery } from '@tanstack/react-query';
import * as _ from 'lodash';
import React, { useState } from 'react';

import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';

import { getOrderListQuery } from '../api/orderApi';
import Loading from '../components/Backdrop/Loading';
import BlackDivider from '../components/Divider/BlackDivider';
import Helmet from '../components/Helmet/Helmet';
import OrderTabPanel from '../containers/Order/OrderTabPanel';

const Order = () => {
  const orderListQuery = useQuery(getOrderListQuery());
  const [value, setValue] = useState(0);

  if (orderListQuery.isLoading) {
    return <Loading />;
  }

  const orderList = orderListQuery.data
    ? _.orderBy(orderListQuery.data, 'order_date', 'desc')
    : [];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet title='Order' />
      <Box sx={{ px: 5, maxWidth: '1600px' }}>
        <Typography variant='h4' color='primary'>
          Orders
        </Typography>
      </Box>
      <BlackDivider sx={{ mt: 3 }} />
      <Stack sx={{ p: 3, minHeight: '250px', maxWidth: '1600px', mr: 6 }}>
        <Tabs value={value} onChange={handleChange} sx={{ mx: 3 }}>
          <Tab label='All' />
          <Tab label='Processing' />
          <Tab label='Shipped' />
        </Tabs>
        <OrderTabPanel orderList={orderList} value={value} index={0} />
        <OrderTabPanel
          orderList={orderList.filter(order => order.ship_date === null)}
          value={value}
          index={1}
        />
        <OrderTabPanel
          orderList={orderList.filter(order => order.ship_date !== null)}
          value={value}
          index={2}
        />
      </Stack>
    </>
  );
};

export default Order;
