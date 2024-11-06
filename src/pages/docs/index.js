import React from 'react';
import { useZestyStore } from 'store';

import MainWrapper from 'layouts/Main';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ZestyAccountsHead } from 'components/globals/ZestyAccountsHead';

import { DocSearch } from '@docsearch/react';
import '@docsearch/css';

export { default as getServerSideProps } from 'lib/accounts/protectedRouteGetServerSideProps';

const DocsPage = (props) => {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  const { setalgoliaApiKey, setalgoliaAppId, setalgoliaIndex } = useZestyStore(
    (e) => e,
  );

  React.useEffect(() => {
    setalgoliaApiKey(props.algolia.search_key);
    setalgoliaAppId(props.algolia.appId);
    setalgoliaIndex(props.algolia.index);
  }, []);

  return (
    <Box data-testid="docs-landing">
      <ZestyAccountsHead title={'Zesty.io - Documentation'} />
      <MainWrapper docsLanding customRouting={[]}>
        <Box
          sx={{
            backgroundSize: 'cover',
            height: 450,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderBottom: `1px solid ${theme.palette.zesty.whiteGray}`,
            gap: 2,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box
            component="img"
            src="https://kfg6bckb.media.zestyio.com/rocket.svg"
            sx={{
              width: 500,
              height: 300,
              position: 'absolute',
              bottom: 10,
              left: 0,
              opacity: 0.5,
              display: isMedium ? 'none' : 'block',
            }}
          />
          <Box
            component="img"
            src="https://kfg6bckb.media.zestyio.com/Group-851.svg"
            sx={{
              width: 400,
              height: 400,
              position: 'absolute',
              bottom: 10,
              right: -10,
              opacity: 0.2,
              zIndex: -1,
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: theme.palette.zesty.zestyZambezi,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Zesty.io Documentation
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              color: theme.palette.zesty.zestyZambezi,
              textAlign: 'center',
            }}
          >
            Explore guides, code samples, API references, and more to learn
            about Zesty
          </Typography>
          <DocSearchModal {...props} />
        </Box>

        <Container sx={{ py: 10 }}>
          <Box>
            <Grid container spacing={2}>
              {cardData.map((item, index) => (
                <Grid item sm={12} md={4} width="100%" key={index}>
                  <Card
                    variant="outlined"
                    sx={{
                      minHeight: 300,
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.zesty.zestyZambezi,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 2,
                        minHeight: 200,
                        color: theme.palette.zesty.zestyZambezi,
                      }}
                    >
                      {item.description}
                    </Typography>
                    <Button
                      data-testid={`${item.title}-btn`}
                      component={'a'}
                      href={item.link}
                      variant="outlined"
                      color="secondary"
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.zesty.zestyOrange,
                          color: theme.palette.common.white,
                        },
                      }}
                    >
                      Learn more
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </MainWrapper>
    </Box>
  );
};

export default DocsPage;

const cardData = [
  {
    title: 'Instances API',
    description:
      'A collection of available REST endpoints scoped to your unique instance.',
    link: 'https://docs.zesty.io/reference/instances-api-reference',
  },
  {
    title: 'Authentication API',
    description:
      'Auth API is used to authenticate users with Zesty.io, which returns a token that grants to access services like Instances API, Accounts API, and Media API. Auth was setup as a stand alone service so it can connect to many services in our infrastructure.',
    link: 'https://docs.zesty.io/reference/authentication-api-reference',
  },
  {
    title: 'Accounts API',
    description:
      'API used to control management of users, roles, instances, and teams.',
    link: 'https://docs.zesty.io/reference/accounts-api-reference',
  },
  {
    title: 'Guides',
    description:
      'Zesty.org is the knowledge base for the Zesty.io CMS Platform. Learn the intricacies of Zesty.io content technology and how to implement websites, headless CMS apps, and marketing components.',
    link: '/docs/getting-started',
  },
  {
    title: 'Next.js',
    description: 'Quick start Next.js v12 with Zesty.io as a data source',
    link: 'https://github.com/zesty-io/nextjs-starter',
  },
  {
    title: 'Parsley',
    description:
      'Zesty’s in-house templating language, Parsley, provides powerful programming capabilities to manage your content.',
    link: '/docs/parsley',
  },
];

export function DocSearchModal() {
  const {
    algoliaApiKey: apiKey,
    algoliaAppId: appId,
    algoliaIndex: index,
  } = useZestyStore((e) => e);

  return (
    <DocSearch
      transformItems={(items) => {
        /*
         * Group items by hierarchy and remove items without hierarchy
         */
        const groupBy = items.reduce((acc, item) => {
          if (!item.hierarchy) {
            return acc;
          }
          const list = acc[item.hierarchy.lvl1] || [];

          return {
            ...acc,
            [item.hierarchy.lvl1]: list.concat(item),
          };
        }, {});

        /**
         * Group based on parent page
         */
        const groups = Object.keys(groupBy).map((level) => ({
          items: groupBy[level],
        }));

        const groupItems = groups?.[0]?.items || [];

        /**
         * Find the parent page from groupItems
         */
        const parent = groupItems?.find((item) => {
          if (
            item.hierarchy.lvl1 !== null &&
            item.hierarchy.lvl2 == null &&
            item.hierarchy.lvl3 == null &&
            item.hierarchy.lvl4 == null &&
            item.hierarchy.lvl5 == null &&
            item.hierarchy.lvl6 == null
          ) {
            return item;
          }
        });

        /**
         * find the index of the parent from groupItems and put it in the first index
         */
        const parentIndex = groupItems?.indexOf(parent);
        return groupItems.splice(parentIndex, 1).concat(groupItems.reverse());
      }}
      placeholder="Search docs..."
      maxResultsPerGroup={100}
      appId={appId}
      indexName={index}
      apiKey={apiKey}
    />
  );
}
