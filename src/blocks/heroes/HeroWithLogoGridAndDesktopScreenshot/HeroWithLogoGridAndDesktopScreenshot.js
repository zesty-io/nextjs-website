/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MuiMarkdown from 'markdown-to-jsx';

import Container from 'components/Container';
import FillerContent from 'components/globals/FillerContent';

const Hero = ({ header_title_and_description, video_link = '' }) => {
  const theme = useTheme();

  const link =
    video_link === ''
      ? 'https://www.youtube.com/embed/ScMzIvxBSi4'
      : video_link;

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.alternate.main,
        backgroundImage: `linear-gradient(120deg, ${theme.palette.background.paper} 0%, ${theme.palette.alternate.main} 100%)`,
        position: 'relative',
      }}
    >
      <Container sx={{ position: 'relative' }}>
        <Box position={'relative'} zIndex={3}>
          <Grid container spacing={4}>
            <Grid item container alignItems={'center'} xs={12} md={5}>
              <Box>
                <MuiMarkdown
                  options={{
                    overrides: {
                      h1: {
                        component: Typography,
                        props: {
                          component: 'h1',
                          variant: 'h3',
                          sx: {
                            color: theme.palette.zesty.zestyZambezi,
                            fontWeight: 'bold',
                          },
                        },
                      },
                      p: {
                        component: Typography,
                        props: {
                          component: 'p',
                          variant: 'h6',
                          sx: {
                            color: theme.palette.zesty.zestyZambezi,
                            fontWeight: 500,
                            mt: 2,
                          },
                        },
                      },
                    },
                  }}
                >
                  {header_title_and_description || FillerContent.description}
                </MuiMarkdown>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box sx={{}}>
                <Box
                  sx={{
                    position: 'relative',
                    marginX: 'auto',

                    // transform: 'rotateY(-35deg) rotateX(15deg) translateZ(0)',
                    maxWidth: '100%',
                  }}
                >
                  <iframe
                    style={{
                      width: '100%',
                      maxWidth: 900,
                      height: 390,
                      borderRadius: 10,
                    }}
                    src={link}
                    title="YouTube video player"
                    // frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box
        component={'svg'}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1921 273"
        sx={{
          position: 'absolute',
          width: '100%',
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 1,
          height: '35%',
        }}
      >
        <polygon
          fill={theme.palette.background.paper}
          points="0,273 1921,273 1921,0 "
        />
      </Box>
    </Box>
  );
};

export default Hero;
