import { Box } from 'grommet';
import React from 'react';
import { useSelector } from 'react-redux';
import MyFooter from '../components/Footer';
import Navbar from '../components/Navbar';
import UserCard from '../components/UserCard';

const Profile = (props) => {
    const state = useSelector((state) => state)
    const user = state.LoginReducer.user
    console.log(user);
    return (
        <>
        <Box overflow='hidden'>
            <Navbar user={user.Firstname +' '+user.Lastname}/>
            <UserCard user={user.Firstname +' '+user.Lastname} number={user.Number} Email={user.Email}/>
            <MyFooter/>
        </Box>
        </>
    );
}

export default {
    routeProps:{
        path:"/user/profile",
        element:<Profile/>
    },
    name:"Profile"
};