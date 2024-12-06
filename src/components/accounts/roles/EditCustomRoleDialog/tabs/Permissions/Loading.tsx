import { Box, Stack, Typography, Skeleton } from '@mui/material';

export const Loading = () => {
  return (
    <Box borderRadius={2} border={1} borderColor="border">
      <Stack
        direction="row"
        bgcolor="grey.100"
        height={52}
        borderRadius="8px 8px 0px 0px"
        alignItems="center"
        textAlign="center"
        borderBottom={1}
        borderColor="border"
      >
        <Typography fontWeight={600} flex={1} textAlign="left" pl={2}>
          Resource Name
        </Typography>
        <Typography fontWeight={600} width={100}>
          Create
        </Typography>
        <Typography fontWeight={600} width={100}>
          Read
        </Typography>
        <Typography fontWeight={600} width={100}>
          Update
        </Typography>
        <Typography fontWeight={600} width={100}>
          Delete
        </Typography>
        <Typography fontWeight={600} width={100}>
          Publish
        </Typography>
      </Stack>
      <Stack borderRadius="0px 0px 8px 8px" bgcolor="background.paper">
        <Skeleton variant="rounded" height={20} sx={{ m: 2 }} />
        <Skeleton variant="rounded" height={20} sx={{ m: 2 }} />
        <Skeleton variant="rounded" height={20} sx={{ m: 2 }} />
        <Skeleton variant="rounded" height={20} sx={{ m: 2 }} />
        <Skeleton variant="rounded" height={20} sx={{ m: 2 }} />
      </Stack>
    </Box>
  );
};
