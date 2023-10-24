import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { generateAlt } from 'utils';

const media = 'https://kfg6bckb.media.zestyio.com/Hero-Image-2.webp',
  acorns = 'https://kfg6bckb.media.zestyio.com/acornsHero.svg',
  bjs = 'https://kfg6bckb.media.zestyio.com/bjsHero.svg',
  phoenixSuns = 'https://kfg6bckb.media.zestyio.com/phoenixSunsHero.svg',
  rocketLeague = 'https://kfg6bckb.media.zestyio.com/rocketLeagueHero.svg',
  singlife = 'https://kfg6bckb.media.zestyio.com/singlifeHero.svg',
  sony = 'https://kfg6bckb.media.zestyio.com/sonyHero.svg',
  circle = 'https://kfg6bckb.media.zestyio.com/Ellipse.svg';

const Hero = ({
  header = 'Data Driven, Drag & Drop, Composable, Content Management',
  subtitle = 'Drive business growth with a Hybrid Headless CMS to create, deliver, measure, and optimize your content marketing at scale. ',
  primaryBtn = 'Free Consultation',
  primaryBtnLink = '/demo?ab=light',
  secondaryBtn = 'Watch Demo Video',
  secondaryBtnLink = '/demos/video?ab=light',
  subtitle2 = 'TRUSTED BY INDUSTRY LEADING COMPANIES',
}) => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Grid
        container
        px={{ xs: 2, tablet: 4, lg: 14 }}
        py={{ xs: 4, tablet: 6, lg: 8 }}
        spacing={{ lg: 8 }}
        position="relative"
      >
        <Grid
          item
          xs={12}
          lg={6}
          mb={4}
          sx={(theme) => ({
            [theme.breakpoints.up('xl')]: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          })}
        >
          <Stack py={{ lg: '92px' }}>
            <Stack mb={4}>
              <Typography
                py={0}
                variant="h2"
                fontWeight={800}
                fontSize={{ xs: 36, tablet: '52px' }}
                lineHeight={{ xs: '44px', tablet: '56px' }}
                mb={{ xs: 2, tablet: '20px', lg: '4px', desktopWide: '12px' }}
              >
                {header}
              </Typography>

              <Typography
                color="text.secondary"
                variant="body1"
                sx={(theme) => ({
                  [theme.breakpoints.up('tablet')]: {
                    fontSize: '18px',
                    lineHeight: '28px',
                  },
                })}
              >
                {subtitle}
              </Typography>
            </Stack>

            <Stack
              spacing="12px"
              mb={4}
              direction={{
                xs: 'column',
                tablet: 'row',
              }}
            >
              <Button
                href={primaryBtnLink}
                variant="contained"
                color="primary"
                size={isLg ? 'extraLarge' : 'large'}
                title={primaryBtn}
              >
                {primaryBtn}
              </Button>
              <Button
                href={secondaryBtnLink}
                variant="outlined"
                color="primary"
                size={isLg ? 'extraLarge' : 'large'}
                title={secondaryBtn}
              >
                {secondaryBtn}
              </Button>
            </Stack>

            <Typography
              mb={3}
              sx={(theme) => ({
                [theme.breakpoints.down('lg')]: {
                  letterSpacing: '1px',
                  fontSize: '12px',
                  lineHeight: '12px',
                },
              })}
              color="text.secondary"
            >
              {subtitle2}
            </Typography>

            <Stack
              direction="row"
              flexWrap="wrap"
              rowGap="24px"
              columnGap="20px"
            >
              <img
                loading="lazy"
                src={sony}
                width="91px"
                height="32px"
                title="Sony"
                alt={generateAlt('Sony')}
              />
              <img
                loading="lazy"
                src={rocketLeague}
                width="88.35px"
                height="32px"
                title="Rocket League"
                alt={generateAlt('Rocket League')}
              />
              <img
                loading="lazy"
                src={singlife}
                width="102.12px"
                height="32px"
                title="Singlife"
                alt={generateAlt('Singlife')}
              />
              <img
                loading="lazy"
                src={acorns}
                width="94px"
                height="32px"
                title="Acorns"
                alt={generateAlt('Acorns')}
              />
              <img
                loading="lazy"
                src={bjs}
                width="36.48px"
                height="32px"
                title="Bjs"
                alt={generateAlt('Bjs')}
              />
              <img
                loading="lazy"
                src={phoenixSuns}
                width="31.59px"
                height="32px"
                title="Phoenix Suns"
                alt={generateAlt('Phoenix Suns')}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ position: 'relative', zIndex: 1 }}>
          <img
            loading="eager"
            src={media}
            width="100%"
            height="100%"
            alt="Zesty Image"
            style={{ objectFit: 'contain ' }}
          />
        </Grid>
      </Grid>
      <Box
        component="img"
        loading="lazy"
        src={circle}
        alt="Zesty Image"
        sx={(theme) => ({
          [theme.breakpoints.up('lg')]: {
            position: 'absolute',
            top: '-23%',
            left: '40%',
            width: '100%',
            height: '100%',
          },
          [theme.breakpoints.up('desktopWide')]: {
            position: 'absolute',
            top: '-18%',
            left: '35%',
            width: '100%',
            height: '100%',
          },
          [theme.breakpoints.up('xl')]: {
            position: 'absolute',
            top: '-13%',
            left: '35%',
            width: '100%',
            height: '100%',
          },
          [theme.breakpoints.down('lg')]: {
            display: 'none',
          },
        })}
      />
    </Box>
  );
};

export default Hero;
