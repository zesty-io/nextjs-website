import {
  Box,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import algoliasearch from 'algoliasearch';
import SearchIcon from '@mui/icons-material/Search';
import {
  connectSearchBox,
  InstantSearch,
  Hits,

  // SearchBox,
  // Pagination,
  // Highlight,
  // ClearRefinements,
  // RefinementList,
  Configure,
  Index,
} from 'react-instantsearch-dom';
import { useZestyStore } from 'store';
import MuiMarkdown from 'markdown-to-jsx';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const SearchBoxMui = ({ currentRefinement, _isSearchStalled, refine }) => (
  <form noValidate action="" role="search">
    <TextField
      data-testid="algolia-search"
      autoFocus
      placeholder="Search..."
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
      size="small"
      color="secondary"
      fullWidth
      sx={{ cursor: 'text' }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  </form>
);

const CustomSearchBox = connectSearchBox(SearchBoxMui);

export const AlgoSearch = () => {
  const {
    algoliaApiKey: apiKey,
    algoliaAppId: appId,
    algoliaIndex: index,
  } = useZestyStore((e) => e);

  const searchClient = algoliasearch(appId, apiKey);

  return (
    <Stack data-testid="algolia-search-container">
      <InstantSearch indexName={index} searchClient={searchClient}>
        <CustomSearchBox />

        <Stack maxHeight={'50vh'} overflow={'auto'}>
          <Index indexName={'zesty_docs'}>
            <Box sx={{ px: 2, py: 2 }}>
              <Typography
                data-testid="zesty-docs-index"
                variant="body1"
                sx={{ color: (theme) => theme.palette.zesty.zestyOrange }}
                component="h2"
              >
                Docs
              </Typography>
            </Box>

            <Configure hitsPerPage={8} />
            <Hits hitComponent={Hit} />
          </Index>
          <Index indexName="products">
            <Box sx={{ px: 2, py: 2 }}>
              <Typography
                data-testid="products-index"
                variant="body1"
                sx={{ color: (theme) => theme.palette.zesty.zestyOrange }}
                component="h2"
              >
                Products
              </Typography>
            </Box>

            <Configure hitsPerPage={8} />
            <Hits hitComponent={Hit} />
          </Index>

          <Index indexName="parsley">
            <Box sx={{ px: 2, py: 2 }}>
              <Typography
                data-testid="parsley-index"
                variant="body1"
                sx={{ color: (theme) => theme.palette.zesty.zestyOrange }}
                component="h2"
              >
                Parsley
              </Typography>
            </Box>

            <Configure hitsPerPage={8} />
            <Hits hitComponent={Hit} />
          </Index>
        </Stack>
      </InstantSearch>
    </Stack>
  );
};
const Hit = (props) => {
  const { hit } = props;

  console.log(props);

  return (
    <Stack divider direction={'row'} spacingY={4}>
      <Link
        data-testid={`${hit.name}-algolia-links`}
        component={'a'}
        elevation={0}
        sx={{
          textDecoration: 'none',
          borderRadius: 2,
          width: '100%',
          my: 0.2,
          '&:hover': {
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
          },
        }}
        variant="outlined"
        href={hit.uri || `/docs/${hit.url}`}
      >
        <Box
          sx={{
            px: 2,
            display: 'flex',
            justifyContent: 'space-between',
            color: (theme) => theme.palette.zesty.zestyZambezi,
            py: 1,
            my: 1,
            borderRadius: 2,
          }}
        >
          <Box>
            <Typography
              sx={{ color: (theme) => theme.palette.zesty.zestyZambezi }}
            >
              {hit.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: (theme) => theme.palette.zesty.zestyZambezi }}
            ></Typography>

            {hit.description && (
              <MuiMarkdown
                options={{
                  overrides: {
                    p: {
                      component: Typography,
                      props: {
                        variant: 'caption',
                      },
                    },
                    a: {
                      component: Typography,
                      props: {
                        variant: 'caption',
                      },
                    },
                    span: {
                      component: Typography,
                      props: {
                        variant: 'caption',
                      },
                    },
                  },
                }}
              >
                {hit?.description}
              </MuiMarkdown>
            )}

            <Typography>
              Test {hit._highlightResult?.name?.matchedWords}
            </Typography>
          </Box>

          <ArrowOutwardIcon
            sx={{ color: (theme) => theme.palette.zesty.zestyOrange }}
          />
        </Box>
      </Link>
    </Stack>
  );
};
