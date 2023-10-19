// MUI Imports
import { Box, Container, Typography, Grid } from '@mui/material';
import MuiMarkdown from 'markdown-to-jsx';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FillerContent from 'components/globals/FillerContent';
import ZestyImage from 'blocks/Image/ZestyImage';
import DemoCta from 'components/cta/DemoCta';

const TechStack = ({
  headerColor,
  text_content,
  logos,
  cta_text,
  cta_link,
  textHighlight,
  backgroundColor,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // check if features_header richtext if not convert it to richtext format for consistency
  const htmlCheck = new RegExp('<("[^"]*"|\'[^\']*\'|[^\'">])*>');
  const isRichText = htmlCheck.test(text_content);

  if (!isRichText) {
    text_content = `<h2>${text_content}</h2>`;
  }

  return (
    <Box
      component="section"
      sx={{
        px: 4,
        background: backgroundColor
          ? backgroundColor
          : theme.palette.zesty.zestySeaShell,
        py: 15,
      }}
    >
      <Box sx={{}}>
        <Container>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <MuiMarkdown
                options={{
                  overrides: {
                    h2: {
                      component: Typography,
                      props: {
                        variant: 'h4',
                        component: 'h2',
                        sx: {
                          fontWeight: 'bold',
                          color: headerColor
                            ? headerColor
                            : theme.palette.zesty.zestyZambezi,
                        },
                      },
                    },
                    h3: {
                      component: Typography,
                      props: {
                        variant: 'h4',
                        component: 'h3',
                        sx: {
                          mt: 2,
                          fontWeight: 'bold',
                          color: theme.palette.zesty.zestyZambezi,
                        },
                      },
                    },
                    h4: {
                      component: Typography,
                      props: {
                        variant: 'h3',
                        component: 'h2',
                        sx: {
                          fontWeight: 700,
                          color: theme.palette.zesty.zestyOrange,
                        },
                      },
                    },
                    p: {
                      component: Typography,
                      props: {
                        variant: 'h6',
                        component: 'p',
                        sx: {
                          mt: 2,
                          color: theme.palette.zesty.zestyZambezi,
                        },
                      },
                    },
                  },
                }}
              >
                {text_content.replace(
                  textHighlight,
                  `<span>${textHighlight}</span>`,
                )}
              </MuiMarkdown>
              {cta_link && (
                <Box sx={{ width: '100%', mt: 4 }}>
                  <DemoCta
                    icon={false}
                    fullWidth={isMobile}
                    variant="contained"
                    sx={{
                      background: theme.palette.zesty.zestyOrange,
                      px: 6,
                      fontWeight: 'bold',
                    }}
                    text={cta_text || FillerContent.cta}
                    href={cta_link || FillerContent.href}
                  />
                </Box>
              )}
            </Grid>
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              item
              sm={12}
              md={6}
            >
              <Box
                sx={{
                  mt: isMobile ? 4 : 0,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1.0,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    height: 88,
                    width: 230,
                    display: isMobile ? 'none' : 'block',
                  }}
                />
                {logos?.map((item, idx) => {
                  return (
                    <ZestyImage
                      key={idx}
                      width={88}
                      height={88}
                      style={{ height: 88, width: 'auto' }}
                      alt="integration logo's"
                      src={item.logo?.data[0].url}
                    />
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default TechStack;
