import { Typography, Stack, Box } from '@mui/material';
import { NoSearchResults } from 'components/accounts/ui/NoSearchResults';

type NoFilterMatchesProps = {
  keyword: string;
  onSearchAgain: () => void;
};
export const NoFilterMatches = ({
  keyword,
  onSearchAgain,
}: NoFilterMatchesProps) => {
  return (
    <Box borderRadius={2} border={1} borderColor="border">
      <Stack
        borderRadius="8px 8px 0px 0px"
        direction="row"
        height={52}
        bgcolor="grey.100"
        alignItems="center"
        borderBottom={1}
        borderColor="border"
      >
        <Typography
          variant="body2"
          fontWeight={600}
          width={300}
          px={2}
          boxSizing="border-box"
          flexShrink={0}
        >
          Resource Name
        </Typography>
        <Typography variant="body2" fontWeight={600} width={100} px={2}>
          Create
        </Typography>
        <Typography variant="body2" fontWeight={600} width={100} px={2}>
          Read
        </Typography>
        <Typography variant="body2" fontWeight={600} width={100} px={2}>
          Update
        </Typography>
        <Typography variant="body2" fontWeight={600} width={100} px={2}>
          Delete
        </Typography>
        <Typography variant="body2" fontWeight={600} width={100} px={2}>
          Publish
        </Typography>
        <Box width={120} flexShrink={0}></Box>
      </Stack>
      <Box
        borderRadius="0px 0px 8px 8px"
        bgcolor="background.paper"
        justifyContent="center"
        alignItems="center"
      >
        <NoSearchResults keyword={keyword} onSearchAgain={onSearchAgain} />
      </Box>
    </Box>
  );
};
