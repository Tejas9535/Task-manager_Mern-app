import { base, Box, Grommet,grommet,Heading,Spinner,Text } from 'grommet';
import React from 'react';
import Cookies from 'js-cookie'
// import DataDisplay from '../components/DataDisplay';
import MyFooter from '../components/Footer';
import Navbar from '../components/Navbar';
import DataDisplay from '../components/DataDisplay';
import { useDispatch } from 'react-redux';
import { Logout_User } from '../actions/type';
// import {api} from '../components/DataDisplay.jsx'
import instance from '../api/private'
import { useNavigate } from "react-router-dom";




const Spiner = () =>{
    return(
        <Box gap="large" pad="medium">
           <Box align="center" direction="row" gap="small">
             <Spinner
               border={[
                  { side: 'all', color: 'transparent', size: 'medium' },
                  { side: 'horizontal', color: 'brand', size: 'medium' },
                ]}
              />
              <Text>Loading...</Text>
            </Box>
        </Box>
    )
}
const Dashboard = () => {
  // const [isAuth,setIsAuth] = (false)
  const cookie = JSON.parse(Cookies.get('user'))
  const user = cookie.user
  
  // console.log(user);
  const token= cookie.token
  const navigate = useNavigate();
  // console.log(cookie);
  // const token = JSON.parse(cookie).token
  const dispatch = useDispatch()
  const logout = () => {
    
      instance(token).post('/user/logout',user).then((res) => {
        if(res.status == 200){
          Cookies.remove('user')
          Cookies.remove('tasks')
          navigate('/')
        }
      }).catch((err) => {
        console.log('err', err);
      });
    
      dispatch({
        type:Logout_User,
        payload:cookie
      })
  }
    return (
        <Grommet  theme={base}>
            <Box overflow={{horizontal:'hidden'}}>
              <Navbar user={user.Firstname +' '+user.Lastname} logout={logout} />
                <DataDisplay/>
              <MyFooter/>
            </Box>
        </Grommet>
    );
}

// const Dashboard = () => {

// }

export default {
  routeProps:{
    path:'dashboard',
    element:<Dashboard/>
  },
  name:'Dashboard'
};