import { Stack, Typography, Button, Box } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';

import noSearchResults from '../../../../public/assets/images/no_search_results.svg';

type NoSearchResultsProps = {
  onSearchAgain: () => void;
  keyword: string;
};
export const NoSearchResults = ({
  onSearchAgain,
  keyword,
}: NoSearchResultsProps) => {
  return (
    <Stack
      width="100%"
      height="100%"
      minHeight={460}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="img"
        src={noSearchResults?.src}
        alt={noSearchResults?.title}
        loading="lazy"
        width={220}
        height={200}
      />
      <Box mt={4} mb={3} width={387} textAlign="center">
        <Typography variant="h4" fontWeight={600} mb={1}>
          Your filter{' '}
          <Box
            component="span"
            fontWeight={700}
            sx={{ wordBreak: 'break-all' }}
          >
            &quot;{keyword}&quot;
          </Box>{' '}
          could not find any results
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your search. We suggest check all words are spelled
          correctly or try using different keywords.
        </Typography>
      </Box>
      <Button
        variant="contained"
        startIcon={<SearchRounded />}
        onClick={onSearchAgain}
      >
        Search Again
      </Button>
    </Stack>
  );
};
