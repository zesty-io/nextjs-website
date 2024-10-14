import { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from '@mui/material';
import { Search, AddRounded } from '@mui/icons-material';

import { NoRules } from './NoRules';
import { useZestyStore } from 'store';
import { GranularRole } from 'store/types';
import { ErrorMsg } from 'components/accounts/ui';
import { AddRule } from './AddRule';
import { Loading } from './Loading';

// const DUMMY_PERMISSIONS = [
//   {
//     ZUID: '32-c8c8b9fdfd-nq5nbl',
//     resourceZUID: '6-a1a600-k0b6f0',
//     name: 'Homepage model access',
//     create: true,
//     read: true,
//     update: true,
//     delete: false,
//     publish: false,
//     grant: false,
//     createdAt: '2024-10-09T04:34:59Z',
//     updatedAt: '2024-10-09T04:34:59Z',
//   },
//   {
//     ZUID: '32-c8c8b9fdfd-nq5nbl',
//     resourceZUID: '7-a1be38-1b42ht',
//     name: 'Homepage access',
//     create: true,
//     read: true,
//     update: true,
//     delete: false,
//     publish: false,
//     grant: false,
//     createdAt: '2024-10-09T04:16:36Z',
//     updatedAt: '2024-10-09T04:16:36Z',
//   },
//   {
//     ZUID: '32-c8c8b9fdfd-nq5nbl',
//     resourceZUID: '7-dcfacfcbe0-k13jqt',
//     name: 'Some random content item',
//     create: true,
//     read: true,
//     update: true,
//     delete: false,
//     publish: false,
//     grant: false,
//     createdAt: '2024-10-09T04:45:37Z',
//     updatedAt: '2024-10-09T04:45:37Z',
//   },
// ];

export type NewGranularRole = Pick<
  GranularRole,
  'resourceZUID' | 'create' | 'read' | 'update' | 'delete' | 'publish'
>;
type PermissionsProps = {
  ZUID: string;
};
export const Permissions = ({ ZUID }: PermissionsProps) => {
  const { ZestyAPI } = useZestyStore((state: any) => state);
  const [filterKeyword, setFilterKeyword] = useState<string>('');
  const [granularRoles, setGranularRoles] = useState<GranularRole[]>([]);
  const [showAddRule, setShowAddRule] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [pendingNewGranularRoles, setPendingNewGranularRoles] = useState<
  //   NewGranularRole[]
  // >([]);

  useEffect(() => {
    if (!ZUID) return;

    getPermissions(ZUID).finally(() => {
      setIsLoading(false);
    });
  }, [ZUID]);

  const getPermissions = async (ZUID: string) => {
    const res = await ZestyAPI.getAllGranularRoles(ZUID);

    if (res.error) {
      ErrorMsg({ text: res.error });
      setGranularRoles([]);
    } else {
      setGranularRoles(res.data);
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Resource Permissions
          </Typography>
          <Typography variant="body3" fontWeight={600} color="text.secondary">
            Grant users access only to resources you specify
          </Typography>
        </Box>
        <Box>
          <TextField
            value={filterKeyword}
            onChange={(evt) => setFilterKeyword(evt.target.value)}
            disabled={isLoading}
            size="small"
            placeholder="Filter Resources"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<AddRounded />}
            disabled={isLoading}
            sx={{ ml: 1 }}
            onClick={() => setShowAddRule(true)}
          >
            Add Rule
          </Button>
        </Box>
      </Stack>
      {isLoading && <Loading />}
      {!isLoading && !granularRoles?.length && !showAddRule && (
        <NoRules onAddRulesClick={() => setShowAddRule(true)} />
      )}
      {!isLoading && !!granularRoles?.length && (
        <Typography>permissions table</Typography>
      )}
      {!isLoading && showAddRule && (
        <AddRule
          onCancel={() => setShowAddRule(false)}
          onAddRuleClick={(newRuleData) => {
            console.log('new rule', newRuleData);
            setShowAddRule(false);
          }}
        />
      )}
    </Box>
  );
};
