/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Container from 'components/Container';
import SubscribeCTA from 'components/cta/SubscribeCTA';

const CtaWithInputField = ({ title, description, cta }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });

  return (
    <Container>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          align={'center'}
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          {title || 'Subscribe to our newsletter'}
        </Typography>
        <Typography variant="h6" align={'center'} color={'text.secondary'}>
          {description ||
            `
          Don't lose a chance to be among the firsts to know about our upcoming
          news and updates.
          `}
        </Typography>
      </Box>
      <Box
        width={1}
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'stretched', sm: 'flex-start' }}
        justifyContent={'center'}
      >
        {/* <SubscribeCTA text="" /> */}
        <Box sx={{width:'100%', display:'flex', justifyContent:'center',alignItems:'center'}}>
              <iframe src="/zoho/forms/newsletter.html"  width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </Box>
      </Box>
    </Container>
  );
};

export default CtaWithInputField;
