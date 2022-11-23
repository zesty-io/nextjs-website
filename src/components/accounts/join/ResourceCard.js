import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import postmanIcon from '../../../../public/images/postmanIcon.svg';
import graphQLIcon from '../../../../public/images/graphQLIcon.svg';
import starCheckIcon from '../../../../public/images/starCheckIcon.svg';
import slackIcon from '../../../../public/images/slackIcon.svg';
import youtubeIcon from '../../../../public/images/youtubeIcon.svg';
import discordIcon from '../../../../public/images/discordIcon.svg';
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

export const ResourcesCard = () => {
  const handleNavigation = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Box
      sx={{
        width: 400,
        backgroundColor: 'common.white',
        border: (theme) => `1px solid ${theme.palette.border}`,
        borderRadius: '0px',
        height: 'fit-content',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Resources
        </Typography>
        <Typography
          // @ts-ignore
          variant="body3"
          color="text.secondary"
          fontWeight={600}
          sx={{ mt: 1 }}
        >
          Everything you need to get the best out of Zesty.
        </Typography>
      </Box>
      <ListItemButton
        divider
        onClick={() => handleNavigation('https://zesty.org/quick-start-guide')}
      >
        <ListItemIcon sx={{ minWidth: '36px' }}>
          <RocketLaunchRoundedIcon color="primary" />
        </ListItemIcon>
        <ListItemText
          primary="Get Started"
          primaryTypographyProps={{
            variant: 'body2',
          }}
        />
      </ListItemButton>
      <ListItemButton
        divider
        onClick={() => handleNavigation('https://zesty.org/')}
      >
        <ListItemIcon sx={{ minWidth: '36px' }}>
          <MenuBookRoundedIcon color="info" />
        </ListItemIcon>
        <ListItemText
          primary="Platform Docs"
          primaryTypographyProps={{
            variant: 'body2',
          }}
        />
      </ListItemButton>
      <ListItemButton
        divider
        onClick={() => handleNavigation('https://instances-api.zesty.org/')}
      >
        <ListItemIcon sx={{ minWidth: '36px' }}>
          <img src={postmanIcon.src} />
        </ListItemIcon>
        <ListItemText
          primary="Instance API Docs"
          primaryTypographyProps={{
            variant: 'body2',
          }}
        />
      </ListItemButton>
      <ListItemButton
        divider
        onClick={() =>
          handleNavigation('https://github.com/zesty-io/graphql-zesty')
        }
      >
        <ListItemIcon sx={{ minWidth: '36px' }}>
          <img src={graphQLIcon.src} />
        </ListItemIcon>
        <ListItemText
          primary="GraphQL Docs"
          primaryTypographyProps={{
            variant: 'body2',
          }}
        />
      </ListItemButton>
      <ListItemButton
        divider
        onClick={() => handleNavigation('https://parsley.zesty.io/')}
      >
        <ListItemIcon sx={{ minWidth: '36px' }}>
          <img
            width="24px"
            height="24px"
            src={'https://9skdl6.media.zestyio.com/favicon.png'}
          />
        </ListItemIcon>
        <ListItemText
          primary="Parsley Docs"
          primaryTypographyProps={{
            variant: 'body2',
          }}
        />
      </ListItemButton>
      <ListItemButton
        divider
        onClick={() =>
          handleNavigation(
            'https://www.zesty.io/mindshare/product-announcements',
          )
        }
      >
        <ListItemIcon sx={{ minWidth: '36px' }}>
          <img src={starCheckIcon.src} />
        </ListItemIcon>
        <ListItemText
          primary="Release Notes"
          primaryTypographyProps={{
            variant: 'body2',
          }}
        />
      </ListItemButton>
      <Box display="flex" justifyContent="space-between" padding={2}>
        {/* @ts-ignore */}
        <Typography variant="body3" color="text.secondary" noWrap>
          JOIN OUR COMMUNITY
        </Typography>
        <Box
          display="flex"
          gap={2}
          sx={{
            img: {
              cursor: 'pointer',
            },
          }}
        >
          <img
            width="24px"
            height="24px"
            src={slackIcon.src}
            onClick={() =>
              handleNavigation(
                'https://join.slack.com/t/zestyiodevs/shared_invite/zt-1jv3ct6k4-uuDM5ZNLy3NgK2FCzK~xuw',
              )
            }
          />
          <img
            width="24px"
            height="24px"
            src={youtubeIcon.src}
            onClick={() =>
              handleNavigation('https://www.youtube.com/c/Zestyio/videos')
            }
          />
          <img
            src={discordIcon.src}
            onClick={() => handleNavigation('https://discord.gg/uqDqeX8RXE')}
            width="24px"
            height="24px"
          />
          <NewspaperRoundedIcon
            sx={{ cursor: 'pointer' }}
            color="primary"
            fontSize="small"
            onClick={() => handleNavigation('https://www.zesty.io/mindshare/')}
          />
        </Box>
      </Box>
    </Box>
  );
};
