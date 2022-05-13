/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Hide, View } from 'grommet-icons';
import Cookies from 'js-cookie';
import { Box, Grommet, grommet, Button, TextInput, Form, Anchor, Heading, } from 'grommet';
import { useNavigate } from 'react-router-dom';
import { Login_User } from '../actions/type';
import http from '../api/common-htttp';

const Login = () => {
    const navigate = useNavigate();
    const [reveal, setReveal] = useState(false);
    const dispatch = useDispatch();
    const login = ({ value }) => {
        http.post('/user/login', value)
            .then(async (response) => {
                const data = await response.data;
                if (response.status === 200) {
                    const { user, token } = data;
                        Cookies.set('user', JSON.stringify({ user, token }));
                    navigate('/dashboard');
                    dispatch({
                        type: Login_User,
                        payload: { user, token }
                    });
                }

            }).catch((error) => {
                alert(error);
            });

    };
    return (
      <Grommet full theme={grommet}>
        <Box fill responsive="true" align="center" justify="center" background="light-1">
          <Box background="light-3" round="medium" pad="medium" elevation="large" border={{ color: 'none', size: 'xsmall' }}>
            <Form onSubmit={login}>
              <Box hoverIndicator={{}} border={{ color: 'black', size: 'xsmall', style: 'solid', side: 'bottom' }}>
                <Heading level="3" textAlign="center" margin="small">Log In</Heading>
              </Box>
              <Box margin="medium" align="center" round="medium" border>
                <TextInput plain name="Email" placeholder="Email" required />
              </Box>
              <Box margin="medium" direction="row" align="center" round="medium" border>
                <TextInput plain name="Password" required placeholder="Password" type={reveal ? 'text' : 'password'} />
                <Button onClick={() => setReveal(!reveal)} icon={reveal ? <View size="medium" /> : <Hide size="medium" />} />
              </Box>
              <Box margin="medium" justify="between" direction="row" gap="xxsmall">
                <Button fill="horizontal" color="dark-1" type="submit" label="Submit" primary />
                <Button color="dark-1" fill="horizontal" type="reset" label="Reset" secondary />
              </Box>
              <Box justify="center" direction="row" margin="small">
                <Anchor color="dark-1" weight="700" reverse href="/registration" label="New Member ?" />
              </Box>
            </Form>
          </Box>
        </Box>
      </Grommet>
    );
};

export default {
    routeProps: {
        path: '',
        element: <Login />
    },
    name: 'Login'
};