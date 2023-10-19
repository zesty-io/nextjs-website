/**
 * Mui Imports
 */
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Grid, Typography, Container, Card } from '@mui/material';
import MuiMarkdown from 'markdown-to-jsx';
import FillerContent from 'components/globals/FillerContent';

// Components Import
import DemoCta from 'components/cta/DemoCta';
import ZestyImage from 'blocks/Image/ZestyImage';

const AlternateColumns = ({
  isHeaderEnabled = true,
  header_content,
  cta_link,
  cta_text,
  column_data = FillerContent.simpleContents,
  alternateColors,
  paddingYContent = 10,
}) => {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  const isDarkMode = theme.palette.mode === 'dark';

  // check if features_header richtext if not convert it to richtext format for consistency
  const htmlCheck = new RegExp('<("[^"]*"|\'[^\']*\'|[^\'">])*>');
  const isRichText = htmlCheck.test(header_content);

  if (!isRichText && header_content) {
    header_content = `<h2>${header_content}</h2>`;
  }

  const COLORS = [
    theme.palette.common.white,
    theme.palette.zesty.zestyWhite,
    theme.palette.zesty.zestyDarkBlue,
    theme.palette.zesty.zestyWhite,
    theme.palette.common.white,
    theme.palette.zesty.zestyWhite,
    theme.palette.zesty.zestyDarkBlue,
    theme.palette.common.white,
    theme.palette.zesty.zestyWhite,
    theme.palette.common.white,
  ];

  return (
    <Box
      sx={{
        pt: header_content && 15,
      }}
      component="section"
    >
      <Container>
        {isHeaderEnabled && (
          <MuiMarkdown
            options={{
              overrides: {
                h2: {
                  component: Typography,
                  props: {
                    component: 'h2',
                    variant: 'h4',
                    sx: {
                      color: theme.palette.zesty.zestyZambezi,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    },
                  },
                },
                p: {
                  component: Typography,
                  props: {
                    component: 'p',
                    variant: 'h6',
                    sx: {
                      mt: 2,
                      color: theme.palette.zesty.zestyZambezi,
                      textAlign: 'center',
                    },
                  },
                },
              },
            }}
          >
            {header_content || FillerContent.headerAndDescription}
          </MuiMarkdown>
         )} 

        {cta_text && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <DemoCta
              icon={false}
              href={cta_link || FillerContent.href}
              sx={{
                mt: 4,
                background: theme.palette.zesty.zestyOrange,
                color: theme.palette.common.white,
                '&:hover': {
                  background: theme.palette.zesty.zestyOrange,
                },
              }}
              text={cta_text || FillerContent.cta}
            />
          </Box>
        )}
      </Container>
      <Box>
        {column_data?.map((item, idx) => (
          <Card
            key={idx}
            variant="outlined"
            sx={{
              py: paddingYContent,
              background: isDarkMode
                ? theme.palette.zesty.zestyDarkBlue
                : alternateColors
                ? alternateColors[idx].backgroundColor
                : COLORS[idx],
              border: 'none',
              borderRadius: 0,
            }}
          >
            <Container>
              <Grid container spacing={5}>
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 4,
                  }}
                  item
                  xs={12}
                  md={6}
                  order={{ sm: idx % 2 ? 1 : 0 }}
                >
                  <Box>
                    {item.header && (
                      <Typography
                        variant={'h5'}
                        component={'h3'}
                        sx={{
                          color: alternateColors
                            ? alternateColors[idx].textColor
                            : idx === 2 || idx === 6
                            ? theme.palette.common.white
                            : theme.palette.zesty.zestyZambezi,
                          fontWeight: 'bold',
                        }}
                      >
                        {item.header || FillerContent.header}
                      </Typography>
                    )}

                    <MuiMarkdown
                      options={{
                        overrides: {
                          h2: {
                            component: Typography,
                            props: {
                              variant: 'h5',
                              component: 'h3',
                              color: alternateColors
                                ? alternateColors[idx].textColor
                                : idx === 2 || idx === 6
                                ? theme.palette.common.white
                                : theme.palette.zesty.zestyZambezi,
                              fontWeight: 'bold',
                            },
                          },
                          h3: {
                            component: Typography,
                            props: {
                              variant: 'h5',
                              component: 'h3',
                              color: alternateColors
                                ? alternateColors[idx].textColor
                                : idx === 2 || idx === 6
                                ? theme.palette.common.white
                                : theme.palette.zesty.zestyZambezi,
                              fontWeight: 'bold',
                            },
                          },
                          span: {
                            component: Typography,
                            props: {
                              variant: 'h5',
                              component: 'h3',
                              color: alternateColors
                                ? alternateColors[idx].textColor
                                : idx === 2 || idx === 6
                                ? theme.palette.common.white
                                : theme.palette.zesty.zestyZambezi,
                              fontWeight: 'bold',
                            },
                          },
                          p: {
                            component: Typography,
                            props: {
                              variant: 'h6',
                              mt: 3,
                              component: 'p',
                              color: alternateColors
                                ? alternateColors[idx].textColor
                                : idx === 2 || idx === 6
                                ? theme.palette.common.white
                                : theme.palette.zesty.zestyZambezi,
                            },
                          },
                          ul: {
                            component: Typography,
                            props: {
                              mt: 2,
                              component: 'ul',
                            },
                          },
                          li: {
                            component: Typography,
                            props: {
                              variant: 'h6',
                              component: 'li',
                              color: alternateColors
                                ? alternateColors[idx].textColor
                                : idx === 2 || idx === 6
                                ? theme.palette.common.white
                                : theme.palette.zesty.zestyZambezi,
                            },
                          },
                        },
                      }}
                    >
                      {item.content || FillerContent.rich_text}
                    </MuiMarkdown>
                  </Box>
                </Grid>
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  item
                  xs={12}
                  md={6}
                >
                  <Box>
                    <ZestyImage
                      width={600}
                      // height={350}
                      alt={item?.header || ''}
                      style={{ width: '100%', maxWidth: 600, height: 'auto' }}
                      src={item?.image || FillerContent.photos[0].src}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AlternateColumns;
