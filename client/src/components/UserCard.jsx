import { Avatar, Box, Card, Grommet,base, CardHeader, CardBody, CardFooter, Text } from 'grommet';
import React from 'react';

const gravatarSrc =
 'https://cdna.artstation.com/p/assets/images/images/012/824/326/large/eduardo-lobo-into-the-spider-verse.jpg?1536699884';

const UserCard = (props) => {
    return (
        <Grommet full  theme={base}>
            <Box direction='row' elevation='medium' margin='xlarge' background='light-3'>
                <Box pad='large'>
                    <Avatar src={gravatarSrc} size='180px'/>
                </Box>
                <Box justify='center' pad='large'>
                    <Text size='xlarge' weight='bolder' margin='small'>UserName:- {props.user}</Text>
                    <Text size='xlarge' weight='bolder' margin='small'>Email:- {props.Email}</Text>
                    <Text size='xlarge' weight='bolder' margin='small'>Number:- {props.number}</Text>
                    {/* <Text margin='small'>Dummy:- Data</Text> */}
                </Box>
            </Box>
        </Grommet>
    );
}

export default UserCard;