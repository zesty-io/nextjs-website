import { Stack, Typography, Box, Button } from '@mui/material';
import { AddRounded } from '@mui/icons-material';

import dataTable from '../../../../../../../public/assets/images/data_table.svg';

type NoRulesProps = {
  onAddRulesClick: () => void;
};
export const NoRules = ({ onAddRulesClick }: NoRulesProps) => {
  return (
    <Box borderRadius={2} border={1} borderColor="border">
      <Stack
        direction="row"
        bgcolor="grey.100"
        height={56}
        borderRadius="8px 8px 0px 0px"
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
      <Stack
        borderRadius="0px 0px 8px 8px"
        bgcolor="background.paper"
        height={410}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          component="img"
          src={dataTable?.src}
          alt={dataTable?.title}
          loading="lazy"
          width={145}
          height={120}
        />
        <Typography mt={4} variant="h5" fontWeight={700}>
          Add Rules
        </Typography>
        <Typography
          mb={4}
          variant="body3"
          fontWeight={600}
          color="text.secondary"
          width={360}
          textAlign="center"
        >
          Assign specific rules (create, read, update, delete, publish) for any
          resource
        </Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddRounded />}
          onClick={() => onAddRulesClick?.()}
        >
          Add Rule
        </Button>
      </Stack>
    </Box>
  );
};
