/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Grommet, Box, Button, Select, Form, Heading, TextInput, base, } from 'grommet';
import { Close } from 'grommet-icons';

const options = ['true', 'false'];

const Popup = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = useState('');
    return (
      <Grommet theme={base}>
        <Box align="center" justify="center" round="medium">
          <Box background="light-3" pad="medium" round="medium" elevation="large" border={{ color: 'none', size: 'xsmall' }}>

            <Form onSubmit={({ value }) => setValue(value)}>
              <Box fill justify="center" border={{ color: 'black', size: 'xsmall', style: 'solid', side: 'bottom' }}>
                {/* <Box> */}
                <Button alignSelf="end" onClick={props.function} icon={<Close color="#000000" size="20px" />} />
                {/* </Box> */}
                {/* <Box fill align='center' > */}
                <Heading level="2" margin="xxsmall" alignSelf="center">Task</Heading>
                {/* </Box> */}
              </Box>
              <Box margin="medium" round="xsmall" align="center" border>
                <TextInput size="24px" plain name="Title" placeholder="Title" required />
              </Box>
              <Box pad="medium">
                <Select size="medium" name="Completed" placeholder="Completed" options={options} onChange={({ value: nextValue }) => setValue(nextValue)} clear />
              </Box>
              <Box margin="medium" justify="between" direction="row" gap="xxsmall">
                <Button border focusIndicator={false} fill="horizontal" color="dark-1" type="submit" label="Submit" primary />
                <Button focusIndicator={false} color="dark-1" fill="horizontal" type="reset" onClick={props.function} label="Cancel" secondary />
              </Box>
            </Form>
          </Box>
        </Box>
      </Grommet>
    );
};

export default Popup;