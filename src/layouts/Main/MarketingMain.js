import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';

import useScrollTrigger from '@mui/material/useScrollTrigger';

// import Container from 'components/Container';
import TopNav from 'components/globals/TopNav';
import { Topbar, Sidebar, Footer } from './components';
import { setCookie } from 'cookies-next';
import { useZestyStore } from 'store';
import { Container, Stack, ThemeProvider } from '@mui/material';
import useIsLoggedIn from 'components/hooks/useIsLoggedIn';
import SiteBanner from 'components/marketing/SiteBanner/SiteBanner';
import ProgressBar from 'react-scroll-progress-bar';
import revampTheme from 'theme/revampTheme';

const MarketingMain = ({
  children,
  customRouting,
  nav = [],
  colorInvert = false,
  bgcolor = 'transparent',
  model = '',
  flyoutNavigation,
}) => {
  // main should verify the user as boolean
  const router = useRouter();
  const { loading, userInfo } = useZestyStore((state) => state);
  const hasRouting = customRouting !== undefined ? true : false;
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 5,
  });

  const isPpcShortPage = router.asPath.includes('ppc' && '-demo');
  const isCapterraPage = router.asPath.includes('/capterra');
  const isDxpTemplatePage = router.asPath.includes('/dxp-rfp-template/');
  const isExplorePage = router.asPath.includes('/ppc/explore/');
  const isDiscover = router.asPath.includes('/discover/');
  const isLoginPage = router.asPath.includes('/login/');
  // override over invert based on pages that we know have a dark image heading

  const hideNav =
    isPpcShortPage || isCapterraPage || isDxpTemplatePage || isDiscover;
  const isLoggedIn = useIsLoggedIn();
  const pageNavColorRegex = new RegExp(/\bmindshare\b|article\b|category/gi);
  const blogMain = new RegExp(/\bmindshare\b/gi);
  const isBlogPage = model?.match(pageNavColorRegex) !== null ? true : false;
  const isBlogHome = model?.match(blogMain) !== null ? true : false;
  const headerColorInvert =
    model?.match(pageNavColorRegex) !== null ? true : false;

  const bgColorSwitch = () => {
    if (isExplorePage) {
      return theme.palette.alternate.main;
    } else if (trigger) {
      return theme.palette.background.paper;
    } else if (hideNav) {
      return 'transparent';
    } else {
      return bgcolor;
    }
  };

  useEffect(() => {
    if (Object.keys(userInfo?.data || {}) !== 0) {
      setCookie('APP_USER_ZUID', userInfo?.ZUID);
      setCookie('APP_USER_EMAIL', userInfo?.email);
      setCookie('APP_USER_FIRST_NAME', userInfo?.firstName);
      setCookie('APP_USER_LAST_NAME', userInfo?.lastName);
    }
  }, [userInfo]);

  return (
    <>
      {isLoggedIn === false && !isLoginPage && <SiteBanner />}
      {!isLoginPage && (
        <Box
          data-testid="topBar"
          id="topNavBox"
          bgcolor={bgcolor}
          position={'relative'}
          zIndex={theme.zIndex.appBar}
          display={router?.query?.slug?.[0] === 'login' && 'none'}
        >
          <Container
            sx={(theme) => ({
              paddingTop:
                hideNav || isExplorePage ? '0px !important' : '8px !important',
              paddingBottom: '0 !important',
              maxWidth: '1440px !important',
              mx: 'auto',
            })}
          >
            <TopNav
              hideNav={hideNav}
              nav={nav}
              // colorInvert={isBlogHome}
            />
          </Container>
        </Box>
      )}
      {!isLoginPage && (
        <AppBar
          data-testid="mainNav"
          position={isDiscover ? 'sticky' : hideNav ? 'fixed' : 'sticky'}
          sx={{
            zIndex: 10,
            outline: 'none',
            border: 'none',
            boxShadow: hideNav ? '' : '',
            top: 0,
            backgroundColor: bgColorSwitch(),
            pt: 1,
            borderBottom: '1px solid #F2F4F7',
            display: router?.query?.slug?.[0] === 'login' && 'none',
          }}
          elevation={trigger ? 1 : 0}
        >
          <Container
            sx={(theme) => ({
              maxWidth: '1440px !important',
              mx: 'auto',
              paddingY: isExplorePage ? 2 : 1,
            })}
          >
            <Stack>
              <Topbar
                hideNav={hideNav}
                onSidebarOpen={handleSidebarOpen}
                flyoutNavigation={flyoutNavigation}
                customRouting={hasRouting ? customRouting : []}
                // colorInvert={isBlogHome && !trigger}
                trigger={trigger}
                isAuthenticated={isLoggedIn}
                userInfo={userInfo?.data}
                loading={loading}
              />
            </Stack>
          </Container>
        </AppBar>
      )}
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant="temporary"
        flyoutNavigation={flyoutNavigation}
        customRouting={hasRouting ? customRouting : []}
      />
      {isBlogPage && (
        <Box
          sx={{
            '& div': {
              zIndex: '99999 !important',
            },
          }}
        >
          <ThemeProvider theme={() => revampTheme(theme.palette.mode)}>
            <ProgressBar height="6px" bgcolor="#FF5D0A" duration="0.2" />
          </ThemeProvider>
        </Box>
      )}
      <main>
        {children}
        <Divider />
      </main>
      {!isLoginPage && (
        <Footer
          // colorInvert={colorInvert}
          customRouting={hasRouting ? customRouting : []}
        />
      )}
    </>
  );
};

MarketingMain.propTypes = {
  children: PropTypes.node,
  routing: PropTypes.array,
  colorInvert: PropTypes.bool,
  bgcolor: PropTypes.string,
};

export default MarketingMain;
