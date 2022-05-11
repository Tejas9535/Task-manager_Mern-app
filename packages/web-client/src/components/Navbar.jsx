import React from 'react';
import { Avatar, Anchor, Box, Header, Nav, Grommet,grommet, Button, Tip, Text } from 'grommet';
import { Logout } from 'grommet-icons';
import { Link } from 'react-router-dom';



const gravatarSrc =
 'https://cdna.artstation.com/p/assets/images/images/012/824/326/large/eduardo-lobo-into-the-spider-verse.jpg?1536699884';

const Navbar = (props) => {
    return (
        <Grommet theme={grommet}>
            {/* <Box fill border fill> */}
            <Header background="dark-1" pad="medium">
                <Box direction="row" align="center" gap="medium">
                    <Avatar src={gravatarSrc} />
                    <Link to='/user/profile'>
                        <Anchor color="white" label={props.user}/>
                    </Link>
                </Box>
                <Nav direction="row">
                    <Box direction='row' gap='medium'>
                        <Link to='/dashboard'><Anchor color="white" label='Tasks'/></Link>
                        <Link to='/user/profile'><Anchor color="white" label='Profile'/></Link>
                    </Box>
                    {/* <Anchor alignSelf='center' color='light-1' href='/dashboard' label='Tasks'/>
                    <Anchor alignSelf='center' color='light-1' href='/user/profile' label='Profile' /> */}
                    <Box  onClick={props.logout}>
                        <Logout color='accent-3'/>
                    </Box>
                </Nav>
            </Header>
            {/* </Box> */}
        </Grommet>
    );
}

export default Navbar;