import { Box, Stack, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

import addUser from '../../../../public/assets/images/add_user.svg';

type NoCustomRolesProps = {
  onCreateCustomRoleClick: () => void;
};
export const NoCustomRoles = ({
  onCreateCustomRoleClick,
}: NoCustomRolesProps) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Custom Roles
      </Typography>

      <Stack
        height={414}
        bgcolor="grey.50"
        alignItems="center"
        justifyContent="center"
        borderRadius={2}
      >
        <Box
          component="img"
          src={addUser?.src}
          alt={addUser?.title}
          loading="lazy"
          width={161}
          height={120}
        />
        <Box my={4} width={480} textAlign="center">
          <Typography variant="h5" fontWeight={700}>
            Create your first Custom Role
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Custom roles allow you to tailor permissions to fit specific needs.
            Click the button below to define a role name, set permissions, and
            assign users.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<Add />}
          onClick={() => onCreateCustomRoleClick?.()}
        >
          Create Custom Role
        </Button>
      </Stack>
    </Box>
  );
};
