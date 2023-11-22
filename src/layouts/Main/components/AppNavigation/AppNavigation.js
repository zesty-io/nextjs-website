import React, { useEffect, useState } from 'react';
import { DeveloperDocMenu, ProfileMenu } from 'components/accounts';
import { useZestyStore } from 'store';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { hashMD5 } from 'utils/Md5Hash';
import { useRouter } from 'next/router';
import {
  Collapse,
  IconButton,
  lighten,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { isProtectedRoute } from 'lib/accounts/protectedRouteGetServerSideProps';
import { AccountsThemeToggler } from 'components/globals/AccountsThemeToggler';
import { AccountsSingleNavItem } from '../Topbar/components/NavItem/AccountsSingleNavItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { grey } from '@mui/material/colors';
import * as helpers from 'utils';
import { LoadingButton } from '@mui/lab';

const legacyAccountsLink = `https://accounts${
  helpers?.isProd ? '' : '.dev'
}.zesty.io/`;

const createInstanceLink = '/start';

const navigationLinks = [
  {
    title: 'Dashboard',
    id: 'dashboard',
    url: '/dashboard/',
  },
  {
    title: 'Instances',
    id: 'instances',
    url: '/instances/',
  },
  {
    title: 'Teams',
    id: 'teams',
    url: '/teams/',
  },
  {
    title: 'Marketplace',
    id: 'marketplace',
    url: '/marketplace/',
  },
];

const mobileNavLinks = [
  ...navigationLinks,
  {
    title: 'Profile',
    id: 'profile',
    url: '/profile/',
  },
  {
    title: 'Security',
    id: 'security',
    url: '/profile/security/',
  },
  {
    title: 'Preferences',
    id: 'preferences',
    url: '/profile/preferences/',
  },
  {
    title: 'Create Instance',
    id: 'createInstance',
    url: createInstanceLink,
  },
  {
    title: 'Legacy Accounts',
    id: 'legacyAccounts',
    url: legacyAccountsLink,
  },
  {
    title: 'Logout',
    id: 'logout',
    url: '/logout/',
  },
];

const AppNavigation = ({ colorInvert = false }) => {
  const router = useRouter();
  const [pathname, setPathname] = useState('');
  const { ZestyAPI, userInfo, setInstances } = useZestyStore((state) => state);
  const [loading, setLoading] = useState(false);
  const profileUrl =
    'https://www.gravatar.com/avatar/' + hashMD5(userInfo?.email);

  const isAccounts = isProtectedRoute(pathname);
  const theme = useTheme();
  const isXL = useMediaQuery(theme.breakpoints.up('xl'));
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isSM = useMediaQuery(theme.breakpoints.down('md'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const [isToggle, setIsToggle] = useState(false);

  const getInstances = async () => {
    setLoading(true);
    const res = await ZestyAPI.getInstances();
    !res.error && setInstances(res);
    res.error && setInstances([]);
    setLoading(false);
  };

  const userPrefs =
    typeof userInfo?.prefs === 'string' && JSON.parse(userInfo?.prefs);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  useEffect(() => {
    setIsToggle(false);
  }, [isMD]);

  useEffect(() => {
    getInstances();
  }, []);
  return (
    <>
      <Stack direction="row" alignItems={isSM && 'center'} py={1}>
        <Link href="/" display="flex" alignItems="center">
          <img
            src="https://brand.zesty.io/zesty-io-logo.svg"
            height={40}
            width={40}
          />
        </Link>
        {isSM && (
          <Typography
            variant="h6"
            color="primary"
            sx={{ width: '100%', textAlign: 'center' }}
          >
            Zesty.io
          </Typography>
        )}

        <Stack
          direction="row"
          width="100%"
          ml={2}
          display={{ xs: 'none', md: 'flex' }}
        >
          <Stack direction="row" alignItems="center" spacing={{ xs: 1, xl: 2 }}>
            {navigationLinks.map((nav) => (
              <AccountsSingleNavItem
                key={nav.id}
                title={nav.title}
                url={nav.url}
                colorInvert={colorInvert}
              />
            ))}
            <DeveloperDocMenu colorInvert={colorInvert} />
          </Stack>
          <Stack
            direction="row"
            ml="auto"
            spacing={{ xs: 1, xl: 2 }}
            alignItems="center"
            pl={isXL ? 0 : 1}
          >
            {isLG && (
              <>
                <LoadingButton
                  loading={Object.keys(userPrefs)?.length === 0 || loading}
                  title="Create Instance"
                  color={
                    isAccounts || pathname === '/' ? 'primary' : 'secondary'
                  }
                  size={'small'}
                  variant="contained"
                  startIcon={<AddIcon />}
                  href={createInstanceLink}
                  sx={{
                    whiteSpace: 'nowrap',
                    height: '2.3rem',
                  }}
                >
                  Create Instance
                </LoadingButton>
              </>
            )}

            {isMD && !isLG && (
              <>
                <IconButton
                  title="Create Instance"
                  href={createInstanceLink}
                  color={
                    isAccounts || pathname === '/' ? 'primary' : 'secondary'
                  }
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  title="Legacy Accounts"
                  href={legacyAccountsLink}
                  sx={{ color: grey[500] }}
                >
                  <ExitToAppIcon />
                </IconButton>
              </>
            )}

            <AccountsThemeToggler />

            <ProfileMenu
              userInfo={userInfo}
              profilePic={
                <Stack direction="row" data-testid="user-avatar">
                  {Object.keys(userPrefs)?.length === 0 || loading ? (
                    <Skeleton width={30} height={30} variant="circular" />
                  ) : (
                    <img
                      src={profileUrl}
                      alt="Zesty User"
                      height={30}
                      width={30}
                      style={{ borderRadius: '50%' }}
                    />
                  )}
                  <ArrowDropDownIcon color={'disabled'} fontSize="medium" />
                </Stack>
              }
            />
          </Stack>
        </Stack>
        {isSM && (
          <IconButton
            onClick={() => setIsToggle((prev) => !prev)}
            sx={{ ml: 'auto' }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Stack>
      <Collapse in={isToggle}>
        <List>
          {mobileNavLinks.map((list, index) => (
            <ListItem
              key={index}
              href={list.url}
              component="a"
              disablePadding
              selected={
                list.url === '/' || list.url === '/profile/'
                  ? list.url === router.asPath
                  : router.asPath.startsWith(list.url)
              }
              sx={(theme) => ({
                borderRadius: '5px',
                my: 1,
                color: theme.palette.text.secondary,
                '&.Mui-selected': {
                  ' .MuiListItemIcon-root': {
                    color: theme.palette.primary.main,
                  },
                  bgcolor: lighten(theme.palette.primary.light, 0.9),
                  pointerEvents: 'none',
                  color: theme.palette.primary.main,
                },
              })}
            >
              <ListItemButton color="warning" sx={{ borderRadius: '5px' }}>
                <ListItemText primary={list.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default React.memo(AppNavigation);
