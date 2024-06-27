import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';

import useScrollTrigger from '@mui/material/useScrollTrigger';

import TopNav from 'components/globals/TopNav';
import { Topbar, Sidebar, Footer, AppNavigation } from './components';
import { setCookie } from 'cookies-next';
import { useZestyStore } from 'store';
import { Container, Stack, ThemeProvider } from '@mui/material';
import useIsLoggedIn from 'components/hooks/useIsLoggedIn';
import { AccountsAppbar } from 'components/console/AccountsAppbar';
import { grey } from '@mui/material/colors';
import { isProtectedRoute } from 'lib/accounts/protectedRouteGetServerSideProps';
import AppFooter from './components/Footer/AppFooter';
import SiteBanner from 'components/marketing/SiteBanner/SiteBanner';
import { useRouterCheck } from 'utils';
import { DocsAppbar } from 'components/console/DocsAppbar';
import revampTheme from 'theme/revampTheme';
import ProgressBar from 'react-scroll-progress-bar';

const Main = ({
  docsLanding = false,
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
  const [pathname, setPathname] = useState('');
  const isAccounts = isProtectedRoute(pathname);
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
  const isLoginPage = router.asPath.includes('/login/');
  const isDiscover = router.asPath.includes('/discover/');
  const isProductPage = router.asPath.includes('/product/');
  const isDocsPage = useRouterCheck('docs');
  // override over invert based on pages that we know have a dark image heading

  const hideNav =
    isPpcShortPage || isCapterraPage || isDxpTemplatePage || isDiscover;
  const isLoggedIn = useIsLoggedIn();
  const pageNavColorRegex = new RegExp(/\bmindshare\b|article\b|category/gi);
  const isBlogPage = model?.match(pageNavColorRegex) !== null ? true : false;
  const blogMain = new RegExp(/\bmindshare\b/gi);
  const isBlogHome = model?.match(blogMain) !== null ? true : false;

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

  const willShowMarketingFooter = () => {
    if (isLoggedIn) {
      if (isAccounts || pathname === '/') return false;

      return true;
    }

    return true;
  };

  const willShowAppFooter = () => {
    if (isLoggedIn) {
      if (isAccounts || pathname === '/') return true;

      return false;
    }

    return false;
  };

  useEffect(() => {
    if (Object.keys(userInfo?.data || {}) !== 0) {
      setCookie('APP_USER_ZUID', userInfo?.ZUID);
      setCookie('APP_USER_EMAIL', userInfo?.email);
      setCookie('APP_USER_FIRST_NAME', userInfo?.firstName);
      setCookie('APP_USER_LAST_NAME', userInfo?.lastName);
    }
  }, [userInfo]);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <>
      {!isProductPage && isLoggedIn === false && !isLoginPage && <SiteBanner />}

      {isLoggedIn === false && (
        <Box
          data-testid="topBar"
          id="topNavBox"
          bgcolor={bgcolor}
          position={'relative'}
          zIndex={theme.zIndex.appBar}
          display={router?.query?.slug?.[0] === 'login' && 'none'}
        >
          <Container
            maxWidth={isLoggedIn ? false : ''}
            sx={(theme) => ({
              paddingTop:
                hideNav || isExplorePage ? '0px !important' : '8px !important',
              paddingBottom: '0 !important',
              maxWidth: isLoggedIn
                ? theme.breakpoints.values.xl2
                : theme.breakpoints.values.lg,
            })}
          >
            <TopNav hideNav={hideNav} nav={nav} colorInvert={isBlogHome} />
          </Container>
        </Box>
      )}
      <AppBar
        data-testid="mainNav"
        position={isDiscover ? 'sticky' : hideNav ? 'fixed' : 'sticky'}
        sx={{
          outline: 'none',
          border: 'none',
          boxShadow: hideNav ? '' : '',
          top: 0,
          backgroundColor: bgColorSwitch(),
          py: 1,
          display: router?.query?.slug?.[0] === 'login' && 'none',
          borderBottom: (isLoggedIn || isDocsPage) && `1px solid ${grey[200]}`,
          zIndex: theme.zIndex.appBar,
        }}
        elevation={trigger ? 1 : 0}
      >
        <Container
          maxWidth={isLoggedIn ? false : ''}
          sx={(theme) => ({
            maxWidth: isLoggedIn
              ? theme.breakpoints.values.xl2
              : theme.breakpoints.values.lg,
            paddingY: isExplorePage ? 2 : 1,
          })}
        >
          {!isLoggedIn && (
            <Stack>
              <Topbar
                hideNav={hideNav}
                onSidebarOpen={handleSidebarOpen}
                flyoutNavigation={flyoutNavigation}
                customRouting={hasRouting ? customRouting : []}
                colorInvert={isBlogHome && !trigger}
                trigger={trigger}
                isAuthenticated={isLoggedIn}
                userInfo={userInfo?.data}
                loading={loading}
                cta={'Contact Sales'}
              />
            </Stack>
          )}
          {isLoggedIn && (
            <>
              <AppNavigation
                onSidebarOpen={handleSidebarOpen}
                // colorInvert={isBlogHome && !trigger}
                trigger={trigger}
                userInfo={userInfo?.data}
                loading={loading}
              />
              <AccountsAppbar
              // colorInvert={isBlogHome && !trigger}
              />
            </>
          )}
        </Container>

        {isDocsPage && !docsLanding && (
          <>
            <DocsAppbar />
          </>
        )}
      </AppBar>
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
        <Divider
          sx={{
            display:
              (router?.query?.slug?.[0] === 'login' || willShowAppFooter()) &&
              'none',
            mt: 5,
          }}
        />
      </main>
      {willShowMarketingFooter() && (
        <Footer
          colorInvert={colorInvert}
          customRouting={hasRouting ? customRouting : []}
        />
      )}

      {willShowAppFooter() && <AppFooter />}
    </>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  routing: PropTypes.array,
  colorInvert: PropTypes.bool,
  bgcolor: PropTypes.string,
};

export default Main;
