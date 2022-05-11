import React from 'react';
import {Grommet as GrommetIcon,FacebookOption,Instagram,Twitter,} from 'grommet-icons';
import { Anchor, Box, Footer, grommet, Grommet, Main, Text } from 'grommet';

const Media = () => (
  <Box direction="row" gap="xxsmall" justify="center">
    <Anchor color='light-1'
      a11yTitle="Share feedback on Github"
      href="https://www.instagram.com/"
      icon={<Instagram color="light-1" />}
    />
    <Anchor color='light-1'
      a11yTitle="Chat with us on Slack"
      href="https://www.facebook.com/"
      icon={<FacebookOption color="light-1" />}
    />
    <Anchor color='light-1'
      a11yTitle="Follow us on Twitter"
      href="https://twitter.com/"
      icon={<Twitter color="light-1" />}
    />
  </Box>
);

const MyFooter = () => {
    return (
        <Grommet theme={grommet}>
            {/* <Main background="light-2" elevation="large" pad="medium" gap="large">
                <Text margin="small" size="xsmall">
                    Main Content
                </Text>
                <Box flex />
            </Main> */}
            <Footer background="dark-1" pad="small">
                <Box align="center" direction="row" gap="xsmall">
                    <GrommetIcon color="light-1" size="large" />
                    <Text alignSelf="center" color="light-1" size="small">
                    Grommet
                    </Text>
                </Box>
                <Media />
                <Text textAlign="center" size="large">
                    ©Copyright
                </Text>
            </Footer>
        </Grommet>
    );
}

export default MyFooter;