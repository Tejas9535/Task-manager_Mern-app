import Cookies from "js-cookie";
import { Create_Task, DeleteAll_Task, Delete_Task, GetAll_Task, Update_Task } from "../actions/type";

// let data = Cookies.get("tasks") == undefined ? [] :JSON.parse(Cookies.get("tasks"))
// console.log(data);
// console.log(Cookies.get("user"));
// const initialState = []

const TaskReducer = (initialState=[], action) => {
    const {type,payload} = action
    switch(type){
        case GetAll_Task:
            return initialState = payload;
            // return  console.log('task created');
        case Create_Task:
            return  console.log('task created');
        case Update_Task:
            return  console.log('task updated');
            // console.log(payload);
        case Delete_Task:
            return console.log('task deleted',payload);
        case DeleteAll_Task:
            return console.log('All task deleted');
    default:
        return initialState;
    }
}
export default TaskReducer