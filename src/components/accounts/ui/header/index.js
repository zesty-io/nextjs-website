import React from 'react';
import { Grid, Stack, Typography, ThemeProvider } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { theme } from '@zesty-io/material';

const Index = ({ title, description, info, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} px={4} py={2}>
        <Stack direction={{ xs: 'column', md: 'row' }}>
          <Stack direction="column" justifyContent="space-between">
            <Stack direction="row" alignItems="center" mb={1.5} spacing={1}>
              <Typography variant="h4" data-testid={title} fontWeight={700}>
                {title}
              </Typography>
              <HelpOutlineIcon
                color="disabled"
                titleAccess={info || description}
                fontSize="small"
              />
            </Stack>
            <Stack>
              <Typography variant="body3" color="text.secondary">
                {description}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            ml={{ xs: 'none', md: 'auto' }}
            mt={{ xs: 1, md: 0 }}
            alignItems="flex-start"
            direction="row"
            spacing={{ xs: 1, md: 2 }}
            flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
          >
            {children}
          </Stack>
        </Stack>
      </Grid>
    </ThemeProvider>
  );
};
export const AccountsHeader = React.memo(Index);
