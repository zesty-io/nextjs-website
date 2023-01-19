/**
 * MUI Imports
 */

import { Box, Typography, Grid } from '@mui/material';
import MuiMarkdown from 'markdown-to-jsx';
import ZestyImage from 'blocks/Image/ZestyImage';

/**
 * Components Imports
 */
import Container from 'blocks/container/Container';
import TryFreeButton from 'components/cta/TryFreeButton';
import DemoCta from 'components/cta/DemoCta';

const Bottom = ({
  content,
  FillerContent,
  theme,
  isMedium,
  isSmall,
  isExtraLarge,
}) => {
  return (
    <Box
      component="section"
      sx={{
        mt: 30,
        background:
          'linear-gradient(269.83deg, #06BBCF 0.13%, #C6E9ED 104.87%)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        height: '100%',
        height: isSmall ? 500 : isMedium ? 850 : isExtraLarge ? 550 : 399,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid sm={12} md={7}>
            <Box
              sx={{
                width: isExtraLarge ? '100%' : 950,
                mt: isExtraLarge ? 0 : -17.9,
              }}
            >
              <ZestyImage
                width={928}
                height={536}
                style={{ width: '100%', maxWidth: 951, height: 'auto' }}
                loading="lazy"
                src={`${content.bottom_graphic?.data[0].url}?width=951`}
                alt="zesty.io"
              />
            </Box>
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
            sm={12}
            md={5}
          >
            <Box sx={{ width: '100%', maxWidth: 501 }}>
              <MuiMarkdown
                options={{
                  overrides: {
                    span: {
                      component: Typography,
                      props: {
                        variant: 'h3',
                        component: 'span',
                        sx: {
                          color: theme.palette.zesty.zestyOrange,
                          fontWeight: 'inherit',
                          textAlign: 'inherit',
                        },
                      },
                    },
                    h2: {
                      component: Typography,
                      props: {
                        variant: 'h3',
                        component: 'h2',
                        sx: {
                          textAlign: isMedium ? 'center' : 'left',
                          color: theme.palette.common.white,
                          fontWeight: 'bold',
                        },
                      },
                    },
                    p: {
                      component: Typography,
                      props: {
                        variant: 'h6',
                        component: 'p',
                        sx: {
                          textAlign: isMedium ? 'center' : 'left',
                          mt: 1,
                          color: theme.palette.common.white,
                        },
                      },
                    },
                  },
                }}
              >
                {content.bottom_description || FillerContent.description}
              </MuiMarkdown>

              <Box
                sx={{
                  mt: 4,
                  display: 'flex',
                  flexDirection: isMedium ? 'column' : 'row',
                  gap: 2,
                }}
              >
                <TryFreeButton
                  text={content.bottom_cta || FillerContent.cta}
                  variant="contained"
                  color="secondary"
                  fullWidth={isMedium}
                  sx={{
                    fontWeight: 'bold',
                    borderRadius: 1,
                  }}
                />
                <DemoCta
                  fullWidth={isMedium}
                  href={content.bottom_cta_2_link?.data[0].meta.web.uri}
                  text={content.bottom_cta_2 || FillerContent.cta}
                  sx={{
                    color: theme.palette.common.white,
                    fontWeight: 'bold',
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Bottom;
