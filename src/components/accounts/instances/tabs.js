import TranslateIcon from '@mui/icons-material/Translate';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import LanguageIcon from '@mui/icons-material/Language';
import ApiIcon from '@mui/icons-material/Api';
import WebhookIcon from '@mui/icons-material/Webhook';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import SettingsIcon from '@mui/icons-material/Settings';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';

export const instanceTabs = [
  {
    icon: <AutoGraphIcon fontSize="medium" />,
    filename: '',
    label: 'Overview',
    sort: 0,
  },
  {
    icon: <AccountBoxRoundedIcon fontSize="medium" />,
    filename: 'roles',
    label: 'Roles & Permissions',
    sort: 1,
  },
  {
    icon: <PeopleIcon fontSize="medium" />,
    filename: 'users',
    label: 'Users',
    sort: 2,
  },
  {
    icon: <GroupsIcon fontSize="medium" />,
    filename: 'teams',
    label: 'Teams',
    sort: 3,
  },
  {
    icon: <LanguageIcon fontSize="medium" />,
    filename: 'domains',
    label: 'Domains',
    sort: 4,
  },
  {
    icon: <LeaderboardIcon fontSize="medium" />,
    filename: 'usage',
    label: 'Usage',
    sort: 5,
  },
  {
    icon: <TranslateIcon fontSize="medium" />,
    filename: 'locales',
    label: 'Locales',
    sort: 6,
  },
  {
    icon: <ApiIcon fontSize="medium" />,
    filename: 'apis',
    label: 'APIs & Tokens',
    sort: 7,
  },
  {
    icon: <WebhookIcon fontSize="medium" />,
    filename: 'webhooks',
    label: 'Webhooks',
    sort: 8,
  },
  {
    icon: <SupportAgentIcon fontSize="medium" />,
    filename: 'support',
    label: 'Support',
    sort: 9,
  },
  // comment out for now
  // {
  //   icon: <SettingsIcon fontSize="large" />,
  //   filename: 'billing',
  //   label: 'Billing & Plan',
  //   sort: 8,
  // },
  {
    icon: <CreditCardIcon fontSize="medium" />,
    filename: 'settings',
    label: 'Settings',
    sort: 10,
  },
];
