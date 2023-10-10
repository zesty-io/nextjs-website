import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { generateAlt } from 'utils';
import { useEffect, useState } from 'react';
import { FONT_FAMILY } from 'components/globals/constants';

const media =
    'https://kfg6bckb.media.zestyio.com/Zesty-io-2023-Homepage-hero.webp',
  acorns = 'https://kfg6bckb.media.zestyio.com/acornsHero.svg',
  bjs = 'https://kfg6bckb.media.zestyio.com/bjsHero.svg',
  phoenixSuns = 'https://kfg6bckb.media.zestyio.com/phoenixSunsHero.svg',
  rocketLeague = 'https://kfg6bckb.media.zestyio.com/rocketLeagueHero.svg',
  singlife = 'https://kfg6bckb.media.zestyio.com/singlifeHero.svg',
  sony = 'https://kfg6bckb.media.zestyio.com/sonyHero.svg',
  circle = 'https://kfg6bckb.media.zestyio.com/Ellipse.svg';

const logos = [
  {
    src: sony,
    width: 91,
    height: 32,
    title: 'Sony',
    alt: generateAlt('Sony'),
  },
  {
    src: rocketLeague,
    width: 88.35,
    height: 32,
    title: 'Rocket League',
    alt: generateAlt('Rocket League'),
  },
  {
    src: singlife,
    width: 102.12,
    height: 32,
    title: 'Singlife',
    alt: generateAlt('Singlife'),
  },
  {
    src: acorns,
    width: 94,
    height: 32,
    title: 'Acorns',
    alt: generateAlt('Acorns'),
  },
  {
    src: bjs,
    width: 36.48,
    height: 32,
    title: 'Bjs',
    alt: generateAlt('Bjs'),
  },
  {
    src: phoenixSuns,
    width: 31.59,
    height: 32,
    title: 'Phoenix Suns',
    alt: generateAlt('Phoenix Suns'),
  },
];

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

  const HeroText = ['Composable', 'Data Driven', 'Drag & Drop', 'AI Assisted'];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % HeroText.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Container
        sx={(theme) => ({
          [theme.breakpoints.up('xs')]: {
            px: 2,
            py: 4,
          },
          [theme.breakpoints.up('tablet')]: {
            px: 4,
            py: 6,
          },
          [theme.breakpoints.up('lg')]: {
            px: 3,
            py: 8,
          },
          [theme.breakpoints.up('xl')]: {
            mx: 'auto',
            maxWidth: theme.maxWidth,
          },
        })}
      >
        <Grid container position="relative">
          <Grid
            item
            xs={12}
            sm={12}
            lg={6}
            mb={4}
            sx={(theme) => ({
              [theme.breakpoints.up('2xl')]: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            })}
          >
            <Stack mb={4}>
              {HeroText.map((text, index) => (
                <Typography
                  key={index}
                  py={0}
                  variant="h1"
                  color={index === currentTextIndex ? '' : '#474747'}
                  fontWeight={index === currentTextIndex ? 800 : 400}
                  fontSize={{ xs: 24, sm: 32, tablet: '62px' }}
                  lineHeight={{ xs: '18px', sm: '32px', tablet: '56px' }}
                  mb={{ xs: 2, tablet: '20px', lg: '4px', desktopWide: '12px' }}
                  style={{
                    opacity: index === currentTextIndex ? 1 : 0.5, // Set opacity based on the current index
                    transition: 'opacity 0.5s ease-in-out', // Add a smooth transition
                    fontFamily: FONT_FAMILY,
                  }}
                >
                  {text}
                </Typography>
              ))}

              <Typography
                py={0}
                variant="h1"
                fontWeight={800}
                fontSize={{ xs: 24, tablet: '62px' }}
                lineHeight={{ xs: '18px', tablet: '56px' }}
                style={{
                  fontFamily: FONT_FAMILY,
                }}
                mb={{ xs: 2, tablet: '20px', lg: '4px', desktopWide: '12px' }}
              >
                Headless CMS
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
                style={{ fontFamily: FONT_FAMILY }}
              >
                {primaryBtn}
              </Button>
              <Button
                href={secondaryBtnLink}
                variant="outlined"
                color="primary"
                size={isLg ? 'extraLarge' : 'large'}
                title={secondaryBtn}
                style={{ fontFamily: FONT_FAMILY }}
              >
                {secondaryBtn}
              </Button>
            </Stack>

            <Typography
              mb={3}
              sx={(theme) => ({
                fontFamily: FONT_FAMILY,
                [theme.breakpoints.down('lg')]: {
                  letterSpacing: '1px',
                  fontSize: '12px',
                  lineHeight: '12px',
                },
                [theme.breakpoints.down('sm')]: {
                  textAlign: 'center',
                },
              })}
              color="text.secondary"
            >
              {subtitle2}
            </Typography>

            <Stack
              direction="row"
              flexWrap="wrap"
              sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              })}
              rowGap="24px"
              columnGap="20px"
            >
              {logos.map((image, index) => (
                <img
                  src={image.src}
                  alt={generateAlt()}
                  loading="lazy"
                  width={image.width}
                  height={image.height}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={(theme) => ({
          [theme.breakpoints.up('lg')]: {
            position: 'absolute',
            top: '-30%',
            left: '40%',
          },
          [theme.breakpoints.up('xl')]: {
            position: 'absolute',
            top: '-25%',
            left: '40%',
            width: '1500px',
          },

          [theme.breakpoints.up('xs')]: {
            position: 'absolute',
            top: '-7%',
            left: '40%',
            width: '100%',
          },
          [theme.breakpoints.between(500, 600)]: {
            position: 'absolute',
            top: '-15%',
            left: '40%',
            width: '90%',
          },
          [theme.breakpoints.up(600)]: {
            position: 'absolute',
            top: '-20%',
            left: '40%',
            width: '100%',
          },
        })}
      >
        <img
          src={media}
          alt={generateAlt('Zesty image')}
          loading="eager"
          width={'100%'}
          height={'100%'}
        />
      </Box>
    </Box>
  );
};

export default Hero;
