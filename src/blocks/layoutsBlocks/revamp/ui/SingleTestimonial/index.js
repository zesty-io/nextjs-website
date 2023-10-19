import { Box, Stack, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const witnessImage =
    'https://storage.googleapis.com/assets.zesty.io/website/images/assets-optimization/Ben.webp',
  witnessLogo =
    'https://storage.googleapis.com/assets.zesty.io/website/images/assets/bluePixelLogo.svg';

const SingleTestimonial = ({
  witness = witnessImage,
  name = 'Ben Johnson',
  role = 'Director of Technology Operations',
  logo = witnessLogo,
  header = `Our team uses Zesty to support creative, complex campaigns for enterprise clients with global audiences.`,
  quote = `"We’ve worked with several different brands using Zesty, and the reason we keep coming back to use them is consistency. The platform is reliable, the support is available 24/7, and our suggestions for feature additions actually help drive product direction. 

When working with clients like Sony, we need to be using secure, enterprise-grade software that’s still agile enough to allow us to move quickly with the market. Zesty allows us to do that, and after over seven years of partnership, we’re excited to continue growing with an amazing technology partner.”`,
}) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('tablet'), {
    defaultMatches: true,
  });

  const isLG = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  return (
    <Stack
      sx={(theme) => ({
        [theme.breakpoints.up('xs')]: {
          py: 4,
          px: 2,
        },
        [theme.breakpoints.up('tablet')]: {
          py: 6,
          px: 4,
        },
        [theme.breakpoints.up('lg')]: {
          py: 8,
          px: 14,
        },
        [theme.breakpoints.up('xl')]: {
          maxWidth: theme.maxWidth,
          mx: 'auto',
        },
      })}
    >
      <Stack
        bgcolor="grey.900"
        borderRadius="32px"
        direction={isLG ? 'row' : 'column'}
        spacing={isLG ? 4 : 0}
        sx={(theme) => ({
          [theme.breakpoints.up('xs')]: {
            p: 2,
          },
          [theme.breakpoints.up('tablet')]: {
            p: 6,
          },
          [theme.breakpoints.up('lg')]: {
            height: '611px',
          },
        })}
      >
        <Stack
          mb={4}
          alignItems="center"
          sx={{
            width: {
              lg: '363px',
            },
          }}
        >
          <Box
            component="img"
            src={witness}
            borderRadius="50%"
            sx={(theme) => ({
              [theme.breakpoints.up('xs')]: {
                objectFit: 'contain',
                width: '100%',
                height: '100%',
                mb: 4,
              },
              [theme.breakpoints.up('mobile')]: {
                width: '303.14px',
                height: '280px',
              },
              [theme.breakpoints.up('lg')]: {
                width: '393px',
                height: '363px',
              },
            })}
          />
          <Typography variant="h5" color="white" fontWeight={600}>
            {name}
          </Typography>
          <Typography color="white" fontWeight={700} mb="20px">
            {role}
          </Typography>
          <Box component="img" width="132.53px" height="48px" src={logo} />
        </Stack>

        <Stack justifyContent={isLG ? 'center' : 'block'}>
          <Typography
            variant={isTablet ? 'h1' : 'h3'}
            color="white"
            fontWeight={600}
            mb={isTablet ? 4 : 3}
          >
            {header}
          </Typography>

          <Box borderLeft="4px solid white" p={2}>
            <Typography
              variant={isTablet ? 'body1' : 'body2'}
              color="white"
              style={{ whiteSpace: 'pre-line' }}
            >
              {quote}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SingleTestimonial;
