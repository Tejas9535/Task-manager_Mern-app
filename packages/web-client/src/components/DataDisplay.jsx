/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Grommet, Box, Button, CheckBox, Text, Spinner, Layer, base, Heading } from 'grommet';
import { Edit, Close, } from 'grommet-icons';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Popup from './Popup';
import { GetAll_Task } from '../actions/type';
import instance from '../api/private';

const Notasks = () => (
  <Box margin="large" elevation="large">
    <Heading level={2} alignSelf="center">No Task Found</Heading>
  </Box>
    );
// eslint-disable-next-line no-unused-vars
const taskTable = (props) => (
  <Box
    margin={{ top: 'small', bottom: 'small', left: 'large', right: 'large' }}
    border={{ style: 'solid',
color: 'dark-1',
    size: 'xsmall',
side: 'bottom' }}
    round="medium"
    hoverIndicator={{ elevation: 'xxlarge', color: 'dark-1' }}
    animate
    elevation="large"
  >
    <Box pad="medium" fill align="center" justify="between" direction="row">
      <Box gap="medium" direction="row">
        <Button>
          <CheckBox onClick={() => console.log('check')} tabIndex="-1" />
        </Button>
        <Text size="large" weight="bolder">{props.title}</Text>
      </Box>
      <Box direction="row" gap="medium" margin={{ right: '30px' }}>
        <Edit color="green" onClick={() => console.log('edit')} size="30px" />
        <Close color="red" onClick={() => console.log('delete')} size="30px" />
      </Box>
    </Box>
  </Box>
    );
const Spiner = () => (
  <Box gap="large" justify="center" align="center" pad="medium">
    <Box align="center" direction="row" gap="small">
      <Spinner
        border={[
                  { side: 'all', color: 'light-3', size: 'large' },
                  { side: 'horizontal', color: 'dark-1', size: 'large' },
                ]}
      />
      <Text color="dark-1" weight="bolder" size="large">Loading...</Text>
    </Box>
  </Box>
    );

const DataDisplay = () => {
    const [tasks, setTasks] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const token = JSON.parse(Cookies.get('user')).token;
    useEffect(() => {
          instance(token).get('/tasks').then(async (response) => {
            const data = await response.data;
            Cookies.set('tasks', JSON.stringify(data));
            dispatch({
                type: GetAll_Task,
                payload: data
            });
        })
        .then(() => {
            setLoaded(true);
        })
        .catch((error) => {
            console.log('err', error);
        });
        }, []);

    useEffect(() => {
        setTasks(state.TaskReducer);
    }, [state.TaskReducer]);

    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    return (
      <Grommet full theme={base}>
        {/* eslint-disable-next-line max-len */}
        <Box margin={{ top: 'large', bottom: 'large', left: 'large', right: 'large' }} round="medium" border={{ style: 'solid', color: 'dark-1', size: 'small', side: 'bottom' }} elevation="large">
          <Box pad="medium" align="end">
            <Button size="large" hoverIndicator="light-1" label="+ Add Task" onClick={onOpen} color="dark-1" primary />
            {open && (
              <Layer animate>
                <Popup function={onClose} />
              </Layer>
)}
          </Box>
        </Box>
        {// eslint-disable-next-line no-nested-ternary
          loaded === false ? <Spiner /> : tasks.length !== 0 ? tasks.map(task => <taskTable title={task.Title} />) : <Notasks />
        }
      </Grommet>
    );
};
export default DataDisplay;