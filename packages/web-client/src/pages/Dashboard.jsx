/* eslint-disable camelcase */
import React from 'react';
import { base, Box, Grommet, } from 'grommet';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MyFooter from '../components/Footer';
import Navbar from '../components/Navbar';
import DataDisplay from '../components/DataDisplay';
import { Logout_User } from '../actions/type';
import instance from '../api/private';

const Dashboard = () => {
  const cookie = JSON.parse(Cookies.get('user'));
  const user = cookie.user;

  const token = cookie.token;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {

      instance(token).post('/user/logout', user).then((res) => {
        if (res.status == 200) {
          Cookies.remove('user');
          Cookies.remove('tasks');
          navigate('/');
        }
      }).catch((err) => {
        console.log('err', err);
      });

      dispatch({
        type: Logout_User,
        payload: cookie
      });
  };
    return (
      <Grommet theme={base}>
        <Box overflow={{ horizontal: 'hidden' }}>
          <Navbar user={`${user.Firstname } ${user.Lastname}`} logout={logout} />
          <DataDisplay />
          <MyFooter />
        </Box>
      </Grommet>
    );
};

// const Dashboard = () => {

// }

export default {
  routeProps: {
    path: 'dashboard',
    element: <Dashboard />
  },
  name: 'Dashboard'
};