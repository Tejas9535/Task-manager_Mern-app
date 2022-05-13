/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Hide, View } from 'grommet-icons';
import { Box, Grommet, grommet, Button, TextInput, Form, Heading } from 'grommet';
import { useNavigate } from 'react-router-dom';
import { Register_user } from '../actions/type';
import http from '../api/common-htttp';

const Registration = () => {
    const navigate = useNavigate();
    const [reveal, setReveal] = useState(false);
    const dispatch = useDispatch();

    const register = ({ value }) => {
        http.post('/users', value)
            .then((response) => {
                if (response.status == 201) {
                    navigate('/');
                    dispatch({
                        type: Register_user,
                        payload: value
                    });
                    alert('error in user creation');
                }
            }).catch((error) => {
                console.log('err', error);
            });
    };
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="center">
          <Box background="light-3" round="small" pad="medium" elevation="large" border={{ color: 'none', size: 'xsmall' }}>
            <Form onSubmit={register}>
              <Box border={{ color: 'black', size: 'xsmall', style: 'solid', side: 'bottom' }}>
                <Heading level="3" textAlign="center" margin="small">Registration</Heading>
              </Box>
              <Box margin="medium" align="center" round="medium" border>
                <TextInput plain name="Firstname" placeholder="Firstname" required />
              </Box>
              <Box margin="medium" align="center" round="medium" border>
                <TextInput plain name="Lastname" placeholder="Lastname" required />
              </Box>
              <Box margin="medium" align="center" round="medium" border>
                <TextInput plain name="Email" placeholder="Email" required />
              </Box>
              <Box margin="medium" align="center" round="medium" border>
                <TextInput plain name="Number" placeholder="Number" maxLength="10" required />
              </Box>
              <Box margin="medium" direction="row" align="center" round="medium" border>
                <TextInput plain name="Password" required placeholder="Set Password" type={reveal ? 'text' : 'password'} />
                <Button onClick={() => setReveal(!reveal)} icon={reveal ? <View size="medium" /> : <Hide size="medium" />} />
              </Box>
              <Box margin="medium" justify="between" direction="row" gap="xxsmall">
                <Button border focusIndicator={false} fill="horizontal" color="dark-1" type="submit" label="Submit" primary />
                <Button focusIndicator={false} color="dark-1" fill="horizontal" type="reset" label="Cancel" secondary />
              </Box>
            </Form>
          </Box>
        </Box>
      </Grommet>
    );
};

export default {
    routeProps: {
        path: 'registration',
        element: <Registration />
    },
    name: 'Registration'
};
