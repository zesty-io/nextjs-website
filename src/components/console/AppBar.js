import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Button, useMediaQuery } from '@mui/material';
import { getCookie, setCookie } from 'cookies-next';
import HomeIcon from '@mui/icons-material/Home';
import { useZestyStore } from 'store';
import useIsLoggedIn from 'components/hooks/useIsLoggedIn';
import { useRouter } from 'next/router';

export default function AppBar() {
  const [url, setUrl] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const router = useRouter();
  const { verifySuccess, ZestyAPI, loading, setworkingInstance } =
    useZestyStore((state) => state);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  let instanceZUID = getCookie('ZESTY_WORKING_INSTANCE');
  const [instance, setinstance] = useState([]);
  const isLoggedIn = useIsLoggedIn();
  const { zuid } = router.query;

  // get param from url to look for instance
  const params = new Proxy(new URLSearchParams(locationSearch), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  if (params.instanceZUID) {
    setCookie('ZESTY_WORKING_INSTANCE', params.instanceZUID);
    instanceZUID = params.instanceZUID;
  }

  // remove query param and splits the url
  let pathnames = url
    .split('?')[0]
    .split('/')
    .filter((e) => e);

  const handleGetInstanceSuccess = (res) => {
    setinstance(res.data);
  };
  const handleGetInstanceError = (res) => {
    setinstance(res.data);
  };

  const getInstance = async () => {
    const res = await ZestyAPI.getInstance(zuid);
    !res.error && handleGetInstanceSuccess(res);
    res.error && handleGetInstanceError(res);
  };

  useEffect(() => {
    if (router.isReady) {
      getInstance();
      setUrl(router.asPath);
      setLocationSearch(window.location.search);
    }
  }, [router.isReady, url, router.asPath]);

  useEffect(() => {
    setworkingInstance(instanceZUID);
  }, [instanceZUID]);

  return (
    <Box
      sx={{
        py: 1,
      }}
    >
      <Container
        maxWidth={isLoggedIn ? false : true}
        sx={(theme) => ({
          maxWidth: isLoggedIn
            ? theme.breakpoints.values.xl2
            : theme.breakpoints.values.lg,
        })}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'left' : 'center',
            flexDirection: isMobile ? 'column' : 'flex',
          }}
        >
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Link
              underline="none"
              color="inherit"
              href={'/'}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <HomeIcon sx={{ mr: 0.5, color: 'GrayText' }} />
            </Link>
            {pathnames?.map((url, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}/`;
              const isLastItem = index === pathnames.length - 1;
              let name = url.replaceAll('-', ' ');
              if (url.match(/^8-.*$/)) {
                name = instance.name;
              }
              return isLastItem ? (
                <Link
                  sx={{
                    textTransform: 'capitalize',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    px: 2,
                    pointerEvents: 'none',
                  }}
                  underline="none"
                  color="text.secondary"
                  href={routeTo}
                  aria-current="page"
                  key={name}
                >
                  {name}
                </Link>
              ) : (
                <Link
                  underline="none"
                  color="text.secondary"
                  href={routeTo}
                  key={index}
                  sx={{
                    textTransform: 'capitalize',
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                  }}
                >
                  {name}
                </Link>
              );
            })}
          </Breadcrumbs>
          {!loading && (
            <Box>
              {!verifySuccess ? (
                <Button
                  href="/login/"
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Sign in to Zesty.io
                </Button>
              ) : (
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                ></Box>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
