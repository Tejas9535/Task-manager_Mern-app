import React from 'react';
import { Avatar, Box, Grommet, base, Text } from 'grommet';

const gravatarSrc = 'https://cdna.artstation.com/p/assets/images/images/012/824/326/large/eduardo-lobo-into-the-spider-verse.jpg?1536699884';

const UserCard = (props) => {
    const { user, Email, number } = props;
    return (
      <Grommet full theme={base}>
        <Box direction="row" elevation="medium" margin="xlarge" background="light-3">
          <Box pad="large">
            <Avatar src={gravatarSrc} size="180px" />
          </Box>
          <Box justify="center" pad="large">
            <Text size="xlarge" weight="bolder" margin="small">
              UserName:-
              {user}
            </Text>
            <Text size="xlarge" weight="bolder" margin="small">
              Email:-
              {Email}
            </Text>
            <Text size="xlarge" weight="bolder" margin="small">
              Number:-
              {number}
            </Text>
            {/* <Text margin='small'>Dummy:- Data</Text> */}
          </Box>
        </Box>
      </Grommet>
    );
};
export default UserCard;