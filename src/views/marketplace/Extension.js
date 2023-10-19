import {
  Box,
  Button,
  Grid,
  Link,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FillerContent from 'components/globals/FillerContent';
import ExtensionsIntaller from 'components/marketplace/ExtensionsIntaller';
import { AppInstallerComp } from 'components/marketplace/AppInstallerComp';
import { ResourceLinkComp } from 'components/marketplace/ResourceLinkComp';
import LaunchIcon from '@mui/icons-material/Launch';
import MuiMarkdown from 'markdown-to-jsx';
import { useZestyStore } from 'store';
import { useRouter } from 'next/router';

const InstallButton = ({ data, theme }) => {
  const { workingInstance } = useZestyStore((state) => state);

  const router = useRouter();
  const isTemplate = data?.meta?.web?.uri?.includes('template') ? true : false;
  const handleTemplate = () => {
    router.push({
      pathname: `/start/`,
      query: { template: data?.meta?.zuid },
    });
  };

  if (data.app_zuid) {
    return <AppInstallerComp data={data} />;
  } else if (isTemplate) {
    return (
      <Button
        onClick={handleTemplate}
        variant="contained"
        color="secondary"
        fullWidth
      >
        Install {data.name}
      </Button>
    );
  } else if (data.github_url && !data.app_zuid && !data.resource_link) {
    return (
      <ExtensionsIntaller
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        fullWidth
        extensionName={data?.name}
        githubUrl={data?.github_url}
        instance={workingInstance}
        data={data}
      />
    );
  } else if (data.resource_link) {
    return <ResourceLinkComp data={data} />;
  } else {
    return (
      <Button
        href="#"
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: theme.palette.zesty.zestyLightGrey,
          color: theme.palette.common.white,
        }}
        disabled
        fullWidth
      >
        Coming Soon
      </Button>
    );
  }
};

const Extension = (props) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const links = [
    {
      name: 'Github',
      link: props.github_url,
    },
    {
      name: 'Youtube',
      link: props.youtube_video_hash,
    },
    {
      name: 'Resource Link',
      link: props.resource_link,
    },
  ];

  return (
    <>
      <Box sx={{ py: 5 }}>
        <Grid container>
          <Grid sx={{ pr: 4 }} item sm={12} md={8}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Card
                sx={{
                  width: 170,

                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: '100%',
                    }}
                    component="img"
                    src={props?.image?.data[0]?.url || FillerContent.image}
                  />
                </CardContent>
              </Card>
              <Box sx={{ width: '70%' }}>
                <Typography
                  variant="h3"
                  component="h1"
                  fontWeight="bold"
                  sx={{
                    color: theme.palette.zesty.zestyOrange,
                  }}
                  mt={{ xs: 2, md: 0 }}
                >
                  {props.name}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 5 }}>
              {props.available != 1 && (
                <Box
                  sx={{
                    textAlign: 'center',
                    color: theme.palette.common.white,
                    py: 2,
                    my: 4,
                    background: theme.palette.zesty.zestyGray99,
                    border: `1px solid ${theme.palette.common.grey}`,
                    borderRadius: 2,
                  }}
                >
                  <Typography sx={{ color: theme.palette.zesty.zestyOrange }}>
                    Coming Soon!
                  </Typography>
                </Box>
              )}
              <Typography
                variant="h5"
                component="p"
                color="text.secondary"
                mb={1}
              >
                {props.subtitle}
              </Typography>

              <Box sx={{ mt: 5 }}>
                <Box
                  sx={{ width: '100%' }}
                  component="img"
                  src={
                    props?.placard_image?.data[0]?.url ||
                    FillerContent.logos[0].url
                  }
                />
              </Box>

              <Box
                sx={{
                  mt: 2,
                }}
              >
                <MuiMarkdown
                  options={{
                    overrides: {
                      p: {
                        component: Typography,
                        props: {
                          sx: {
                            color: theme.palette.zesty.zestyZambezi,
                          },
                          variant: 'h5',
                          component: 'p',
                        },
                      },
                      img: {
                        component: Box,
                        props: {
                          component: 'img',
                          sx: {
                            width: '100%',
                            maxWidth: 900,
                            color: theme.palette.zesty.zestyZambezi,
                          },
                        },
                      },
                    },
                  }}
                >
                  {props.info || FillerContent.description}
                </MuiMarkdown>
              </Box>
            </Box>
          </Grid>
          <Grid sx={{ width: '100%' }} item sm={12} md={4}>
            <Box>
              <InstallButton data={props} theme={theme} />
              <Box
                sx={{
                  p: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  border: `1px solid ${
                    isDarkMode
                      ? theme.palette.common.white
                      : theme.palette.common.grey
                  }`,
                  borderRadius: 2,
                  background: theme.palette.background.paper,
                  mt: 2,
                }}
              >
                <Typography
                  variant="Subtitle2"
                  sx={{
                    color: theme.palette.zesty.zestyZambezi,
                    fontWeight: 'bold',
                  }}
                >
                  Type
                  <Typography>
                    <Link
                      sx={{
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                      href={`/marketplace/${props?.meta?.model_name?.toLowerCase()}/`}
                    >
                      {props?.meta?.model_name}
                    </Link>
                  </Typography>
                </Typography>

                <Typography
                  variant="Subtitle2"
                  sx={{
                    color: theme.palette.zesty.zestyZambezi,
                    fontWeight: 'bold',
                  }}
                >
                  Published
                  <Typography>
                    {new Date(`${props?.meta?.createdAt}`).toLocaleDateString()}
                  </Typography>
                </Typography>

                <Typography
                  variant="Subtitle2"
                  sx={{
                    color: theme.palette.zesty.zestyZambezi,
                    fontWeight: 'bold',
                  }}
                >
                  Author
                  <Typography>{props?.author?.data?.[0]?.name}</Typography>
                </Typography>
              </Box>
            </Box>

            <Box>
              <Box
                sx={{
                  p: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  border: `1px solid ${
                    isDarkMode
                      ? theme.palette.common.white
                      : theme.palette.common.grey
                  }`,
                  borderRadius: 2,
                  background: theme.palette.background.paper,
                  mt: 2,
                }}
              >
                <Typography
                  variant="Subtitle2"
                  sx={{
                    color: theme.palette.zesty.zestyZambezi,
                    fontWeight: 'bold',
                    mb: 2,
                  }}
                >
                  Links
                </Typography>

                {links.map((item) => (
                  <Typography
                    sx={{
                      color: theme.palette.zesty.zestyOrange,
                      fontWeight: 'bold',
                      display: item.link ? 'flex' : 'none',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <Link
                      href={item.link}
                      sx={{
                        color: theme.palette.zesty.zestyOrange,
                        textDecoration: 'none',
                      }}
                    >
                      {item.name}
                    </Link>
                    <LaunchIcon sx={{ width: 14, height: 14 }} />
                  </Typography>
                ))}
              </Box>
            </Box>
            {/* Tags */}

            <Box>
              <Box
                sx={{
                  p: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  border: `1px solid ${
                    isDarkMode
                      ? theme.palette.common.white
                      : theme.palette.common.grey
                  }`,
                  borderRadius: 2,
                  background: theme.palette.background.paper,
                  mt: 2,
                }}
              >
                <Typography
                  variant="Subtitle2"
                  sx={{
                    color: theme.palette.zesty.zestyZambezi,
                    fontWeight: 'bold',
                  }}
                >
                  Tags
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                  {props?.tags?.data.map((item) => (
                    <Typography
                      sx={{
                        width: '100%',
                        maxWidth: 90,
                        border: `1px solid ${theme.palette.zesty.zestyOrange}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 2,
                      }}
                    >
                      <Link
                        href={item.meta.web.uri}
                        sx={{
                          color: theme.palette.zesty.zestyOrange,
                          textDecoration: 'none',
                        }}
                      >
                        {item.name}
                      </Link>
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Extension;
