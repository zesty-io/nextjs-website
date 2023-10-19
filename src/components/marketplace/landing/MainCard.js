/**
 * MUI Imports
 */
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
/**
 * Helpers Imports
 */
import FillerContent from 'components/globals/FillerContent';

const MainCard = ({
  name,
  image,
  uri,
  meta_description,
  available,
  recommended,
  meta,
}) => {
  /**
   * Theme Settings
   */
  const theme = useTheme();

  const landingPage = uri;
  const productPage = meta?.web.uri;

  return (
    <Box
      component={'a'}
      href={uri || meta.web.uri || FillerContent.href}
      sx={{
        textDecoration: 'none',
        background: 'red',
      }}
    >
      <Card
        sx={{
          '&:hover': {
            border: `1px solid ${theme.palette.zesty.zestyOrange}`,
          },
          width: '100%',
          margin: 'auto',
          minHeight: 300,
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          border:
            theme.palette.mode === 'light' &&
            `1px solid ${theme.palette.common.grey}`,
        }}
      >
        <CardContent sx={{ width: '100%' }}>
          {available != 1 && (
            <Box
              sx={{
                position: 'absolute',
                top: 5,
                right: 10,
                mt: 1,
                width: '100%',
                maxWidth: 115,
                height: 22,
                p: 1,
                background: theme.palette.zesty.zestyGray99,
                border: `1px solid ${theme.palette.common.grey}`,
                borderRadius: 47,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  textAlign: 'center',
                  color: theme.palette.zesty.zestyLightText,
                  fontSize: 11,
                }}
              >
                Coming Soon
              </Typography>
            </Box>
          )}

          <Box>
            <Box
              sx={{
                display: 'flex',
                gap: 1,

                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{ width: 50 }}
                  component="img"
                  alt=""
                  src={
                    (landingPage && image) ||
                    (productPage && image.data[0].url) ||
                    FillerContent.logos[0].url
                  }
                />
              </Box>

              <Typography
                sx={{
                  fontWeight: 'bold',
                  color: theme.palette.zesty.zestyZambezi,
                }}
                variant="h5"
                component="h2"
              >
                {name}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography
                    sx={{
                      color: theme.palette.zesty.zestyLightText,
                    }}
                    variant="caption"
                    component="p"
                  >
                    By zesty.io
                  </Typography>
                  <CheckCircleIcon
                    color="primary"
                    sx={{ width: 18, height: 18 }}
                  />
                </Box>
              </Typography>
            </Box>

            <Box>
              <Box sx={{ mt: 1 }}>
                <Typography
                  sx={{ color: theme.palette.zesty.zestyLightText }}
                  variant="body1"
                  component="p"
                >
                  {meta_description ||
                    meta?.web.seo_meta_description ||
                    FillerContent.description}
                </Typography>

                {recommended == 1 && (
                  <Box
                    sx={{
                      mt: 1,
                      width: '100%',
                      maxWidth: 115,
                      height: 22,
                      p: 1,
                      background: theme.palette.zesty.zestyGray99,
                      border: `1px solid ${theme.palette.common.grey}`,
                      borderRadius: 47,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        width: 13,
                        height: 13,
                      }}
                      src="https://brand.zesty.io/zesty-io-logo.svg"
                    />
                    <Typography
                      sx={{
                        color: theme.palette.zesty.zestyLightText,
                        fontSize: 11,
                      }}
                    >
                      Recommended
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MainCard;
