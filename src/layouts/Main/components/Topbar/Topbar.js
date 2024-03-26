import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import TryFreeButton from 'components/cta/TryFreeButton';
import { useRouter } from 'next/router';
import { Skeleton, Typography } from '@mui/material';
import { setCookie } from 'cookies-next';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import dynamic from 'next/dynamic';

const FlyoutNav = dynamic(() => import('./components/FlyoutNav'));

const hashString = (str = '') => {
  let hash = 0,
    i,
    chr;
  if (str?.length === 0) return hash;
  for (i = 0; i < str?.length; i++) {
    chr = str?.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const Topbar = ({
  hideNav,
  onSidebarOpen,
  // customRouting,
  colorInvert = false,
  trigger,
  userInfo = {},
  loading = false,
  flyoutNavigation: data = [],
  cta,
}) => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const router = useRouter();

  //check if page is from ppc for hiding of footer and nav
  const isCapterraPage = router.asPath.includes('/capterra');
  const isDxpTemplatePage = router.asPath.includes('/dxp-rfp-template/');
  const isPpcShortPage = router.asPath.includes('ppc' && '-demo');

  // for changing the logo color base on pages
  // affected pages dxp, capterra, ppc, ppc long , ppc short ,ppc explore
  const changeLogoColor = () => {
    if (isDxpTemplatePage || isCapterraPage || isPpcShortPage) {
      return trigger;
    }
    return mode === 'light' && !colorInvert;
  };

  useEffect(() => {
    if (userInfo) {
      setCookie('APP_USER_ZUID', userInfo?.ZUID);
      setCookie('APP_USER_EMAIL', userInfo?.email);
      setCookie('APP_USER_FIRST_NAME', userInfo?.firstName);
      setCookie('APP_USER_LAST_NAME', userInfo?.lastName);
    }
  }, [userInfo]);

  // Sort the navigation data array to match with the sorting on the cms
  const flyoutNavigation = data.sort((item1, item2) =>
    item1.sort_order > item2.sort_order
      ? 1
      : item1.sort_order < item2.sort_order
      ? -1
      : 0,
  );

  /**
   * Hold navigation state and track which flyout is active
   */
  const [activeNav, setActiveNav] = useState(
    flyoutNavigation
      .filter((route) => route.link === null)
      .map((url) => {
        return { id: hashString(url.nav_title), isActive: false };
      }),
  );

  /**
   * Mutate navigation state to set new active flyout or close it once clickawayhandler is triggered
   */
  const navHandler = (e, id) => {
    setActiveNav((current) =>
      current.map((obj) => {
        if (obj.id === id) {
          return { ...obj, isActive: !obj.isActive };
        }
        return { ...obj, isActive: false };
      }),
    );
  };

  const flyoutNavProps = {
    hideNav,
    flyoutNavigation,
    hashString,
    router,
    activeNav,
    navHandler,
    colorInvert,
  };

  return (
    <ClickAwayListener onClickAway={navHandler}>
      <Box
        sx={{
          // position: 'relative', comment out to extend full width of menus
          display: 'flex',
          justifyContent: 'space-between',
          // alignItems: 'center',
          width: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            pt: isDxpTemplatePage ? 4 : 0,
          }}
          component="a"
          href="/"
          title="Zesty.io Platform"
          mr={2}
        >
          <img
            alt="zesty.io"
            src={
              changeLogoColor()
                ? 'https://brand.zesty.io/zesty-io-logo-horizontal.svg'
                : 'https://brand.zesty.io/zesty-io-logo-horizontal-light-color.svg'
            }
            height={32}
            width={114.59}
            style={{ display: 'flex', height: '100%' }}
          />
        </Box>

        <FlyoutNav {...flyoutNavProps} />

        {loading && <Skeleton variant="rectangular" width={180} height={30} />}
        {!loading && (
          <Box sx={{ display: { xs: 'none', lg: 'block' }, ml: 'auto' }}>
            <Box display={'flex'} alignItems="center" gap={2}>
              <Box>
                <Typography
                  data-testid="login-btn"
                  variant="text"
                  component="a"
                  href="/login/"
                  sx={(theme) => ({
                    color: theme.palette.mode === 'light' ? '#475467' : '#fff',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      color: '#FF5D0A',
                    },
                  })}
                >
                  Log in
                </Typography>
              </Box>
              <Box>
                <TryFreeButton
                  text={cta}
                  variant="contained"
                  component="a"
                  size="large"
                  width="200px"
                />
              </Box>
            </Box>
          </Box>
        )}

        {!hideNav && (
          <Box
            sx={{ display: { xs: 'block', md: 'none' } }}
            alignItems={'center'}
          >
            <Button
              onClick={() => onSidebarOpen()}
              aria-label="Menu"
              variant={'outlined'}
              sx={{
                borderRadius: 2,
                minWidth: 'auto',
                padding: 1,
                borderColor: alpha(theme.palette.divider, 0.2),
              }}
            >
              <MenuIcon />
            </Button>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  colorInvert: PropTypes.bool,
};

export default React.memo(Topbar);
