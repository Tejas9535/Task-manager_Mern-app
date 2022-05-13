/* eslint-disable camelcase */
import { Create_Task, DeleteAll_Task, Delete_Task, GetAll_Task, Update_Task } from '../actions/type';

// eslint-disable-next-line default-param-last
const TaskReducer = (initialState = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case GetAll_Task:
            /* eslint-disable no-return-assign */
            // eslint-disable-next-line no-param-reassign
            return initialState = payload;
        case Create_Task:
            return console.log('task created');
        case Update_Task:
            return console.log('task updated');
        case Delete_Task:
            return console.log('task deleted', payload);
        case DeleteAll_Task:
            return console.log('All task deleted');
    default:
        return initialState;
    }
};
export default TaskReducer;