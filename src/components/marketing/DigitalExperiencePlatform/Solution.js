/**
 * MUI Imports
 */
import { Box, Container, Grid, Typography, Card, Link } from '@mui/material';
import ZoomMui from '@mui/material/Zoom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import MuiMarkdown from 'mui-markdown';

/**
 * React Imports
 */
import { useState } from 'react';

/**
 * Helpers Imports
 */
import * as helper from 'utils';

const Solution = ({ content, theme, isMobile }) => {
  const [active, setactive] = useState(0);
  const headerRegex = /\>(.*?)\</;
  const cardData = [
    {
      id: 0,
      name: 'personalize',
      icon: content.solutions_icon_1?.data[0]?.url,
      text: content.solution_1_description,
      subText: content.solution_1_description?.match(headerRegex)[1],
      img: content.solution_1_graphic.data[0]?.url,
      ctaName: 'Learn More',
      href: '#',
    },
    {
      id: 1,
      name: 'ecom',
      icon: content.solutions_icon_2?.data[0]?.url,
      text: content.solution_2_description,
      subText: content.solution_2_description?.match(headerRegex)[1],
      img: content.solution_2_graphic?.data[0]?.url,
      ctaName: 'Learn More',
      href: '#',
    },
    {
      id: 2,
      name: 'distribution',
      icon: content.solutions_icon_3?.data[0]?.url,
      text: content.solution_3_description,
      subText: content.solution_3_description?.match(headerRegex)[1],
      img: content.solution_3_graphic.data[0]?.url,
      ctaName: 'Learn More',
      href: '#',
    },
    {
      id: 3,
      name: 'innovate',
      icon: content.solutions_icon_4.data[0]?.url,
      text: content.solution_4_description,
      subText: content.solution_4_description?.match(headerRegex)[1],
      img: content.solution_4_graphic.data[0]?.url,
      ctaName: 'Learn More',
      href: '#',
    },
  ];

  const imgWidth = isMobile ? 300 : 500;
  return (
    <Box paddingY={1}>
      <Container>
        <Box paddingBottom={isMobile ? 10 : 10} sx={{}}>
          <MuiMarkdown
            overrides={{
              span: {
                component: Typography,
                props: {
                  component: 'span',
                  sx: {
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    color: theme.palette.zesty.zestyOrange,
                  },
                },
              },
              h2: {
                component: Typography,
                props: {
                  variant: 'h4',
                  component: 'h2',
                  sx: {
                    textAlign: 'center',
                    fontWeight: 'bold',
                  },
                },
              },
            }}
          >
            {content.solutions_h2}
          </MuiMarkdown>
        </Box>

        <Box>
          <Grid container>
            <Grid item sm={12} md={6}>
              <Box data-aos="fade-right">
                <Box>
                  <ZoomMui
                    in={active === 0}
                    style={{ display: active === 0 ? 'block' : 'none' }}
                  >
                    <Box
                      src={content[`solution_1_graphic`].data[0].url}
                      alt=""
                      component="img"
                      sx={{
                        width: isMobile ? 500 : '100%',
                      }}
                    />
                  </ZoomMui>
                  {/* <ZoomMui
                    in={active === 1}
                    style={{ display: active === 1 ? 'block' : 'none' }}
                  >
                    <img
                      width={imgWidth}
                      src={content[`solution_2_graphic`].data[0].url}
                      alt=""
                    />
                  </ZoomMui>
                  <ZoomMui
                    in={active === 2}
                    style={{ display: active === 2 ? 'block' : 'none' }}
                  >
                    <img
                      width={imgWidth}
                      src={content[`solution_3_graphic`].data[0].url}
                      alt=""
                    />
                  </ZoomMui>
                  <ZoomMui
                    in={active === 3}
                    style={{ display: active === 3 ? 'block' : 'none' }}
                  >
                    <img
                      width={imgWidth}
                      src={content[`solution_4_graphic`].data[0].url}
                      alt=""
                    />
                  </ZoomMui> */}
                </Box>
              </Box>
            </Grid>

            <Grid item sm={12} md={6}>
              <Box data-aos="fade-left">
                <Box>
                  {cardData.map((e, i) => {
                    return i === active ? (
                      <CustomCard data={e} theme={theme} />
                    ) : (
                      <Box
                        onClick={() => setactive(i)}
                        paddingY={2}
                        paddingLeft={4}
                        sx={{
                          borderBottom: `1px solid ${theme.palette.secondary.whiteSmoke}`,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          cursor: 'pointer',
                        }}
                      >
                        <img src={e.icon} alt="" width={50} />
                        <Typography
                          component={'p'}
                          variant={'p'}
                          sx={{
                            color: theme.palette.secondary.darkCharcoal,
                            fontWeight: 'light',
                            textAlign: 'left',
                          }}
                          dangerouslySetInnerHTML={{
                            __html: e.subText,
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <div data-aos="zoom-in">
          <Grid item xs={12} md={9}>
            <Box
              paddingTop={isMobile ? 10 : 10}
              paddingBottom={10}
              sx={{
                textAlign: 'center',
                color: theme.palette.secondary.darkCharcoal,
                fontSize: isMobile ? '1rem' : '1.5rem',
              }}
              dangerouslySetInnerHTML={{
                __html: helper.strColorChanger(
                  content.about_zesty_dxp,
                  'Zesty',
                  theme.palette.zesty.zestyOrange,
                ),
              }}
            ></Box>
          </Grid>
        </div>
      </Container>
    </Box>
  );
};

const CustomCard = ({ data, theme }) => {
  return (
    <Card
      sx={{
        marginTop: '1rem',
        padding: '3rem 1rem',
        display: 'flex',
        alignItems: 'flex-start',
        borderTop: `6px solid ${theme.palette.zesty.zestyTealWhite}`,
      }}
    >
      <Box paddingX={2} paddingTop={2}>
        <img src={data.icon} alt="" width={50} />
      </Box>
      <Box>
        <Typography
          component={'p'}
          variant={'p'}
          sx={{
            color: theme.palette.secondary.darkCharcoal,
            textAlign: 'left',
          }}
          dangerouslySetInnerHTML={{
            __html: helper.strColorChanger(
              data.text,
              data.subText,
              theme.palette.zesty.zestyOrange,
            ),
          }}
        />
        <Link
          href="#"
          underline="always"
          paddingTop={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '.5rem',
            color: theme.palette.zesty.zestyTealDark,
            fontWeight: 'bold',
          }}
        >
          {data.ctaName} <ArrowRightAltIcon />
        </Link>
      </Box>
    </Card>
  );
};

export default Solution;
