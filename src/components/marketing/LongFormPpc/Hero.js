// MUI Imports
import { useTheme } from '@mui/material/styles';

import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  Container,
} from '@mui/material';
import FillerContent from 'components/globals/FillerContent';

const Hero = ({
  title,
  // subtitle,
  description,
  image,
  cta_right_text,
  // cta_right_url,
  scrollToContactUs,
  cta_left_text,
  cta_left_url,
}) => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container>
      <Grid sx={{ py: isMobile ? 5 : 0 }} container spacing={4}>
        <Grid item container xs={12} md={6} alignItems={'center'}>
          <Box>
            <Box marginBottom={2}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.zesty.zestyZambezi,
                }}
              >
                {title}
              </Typography>
            </Box>
            <Box marginBottom={3}>
              <Typography
                variant="p"
                component="h3"
                color="text.secondary"
                sx={{
                  fontSize: '20px',
                  fontWeight: '500',
                }}
              >
                {description || FillerContent.description}
              </Typography>
            </Box>
            <Box
              display="flex"
              gap={2}
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'flex-start' }}
            >
              {cta_left_text !== '' && (
                <Button
                  href={cta_left_url}
                  target="_blank"
                  component={'a'}
                  variant="contained"
                  size="large"
                  marginTop={{ xs: 2, sm: 0 }}
                  fullWidth={isMd ? false : true}
                  sx={{
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.zesty.zestyOrange,
                  }}
                >
                  {cta_left_text || FillerContent.cta}
                </Button>
              )}

              <Box
                onClick={() => scrollToContactUs()}
                component={Button}
                variant="contained"
                size="large"
                marginTop={{ xs: 2, sm: 0 }}
                fullWidth={isMd ? false : true}
                sx={{
                  color: theme.palette.common.white,
                  backgroundColor: theme.palette.zesty.zestyOrange,
                }}
              >
                {cta_right_text || FillerContent.cta}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          container
          alignItems={'center'}
          justifyContent={'center'}
          xs={12}
          md={6}
        >
          <Box
            component={'img'}
            height={1}
            width={1}
            src={image || FillerContent.dashboard_image}
            alt="headless cms image"
            borderRadius={2}
            maxWidth={600}
            sx={{
              filter: theme.palette.mode === 'dark' ? 'brightness(1)' : 'none',
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Hero;
