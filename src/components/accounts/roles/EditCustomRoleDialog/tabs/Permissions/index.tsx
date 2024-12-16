import { useRef, useState, useDeferredValue, useMemo, useEffect } from 'react';
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
import { GranularRole } from 'store/types';
import { AddRule } from './AddRule';
import { Table } from './Table';
import { useInstance } from 'store/instance';
import { NoFilterMatches } from './NoFilterMatches';

export type GranularRoleWithResourceName = GranularRole & {
  resourceName: string;
};
export type UpdateGranularRole = Pick<NewGranularRole, 'resourceZUID'> &
  Partial<Omit<NewGranularRole, 'resourceZUID'>>;
export type NewGranularRole = Pick<
  GranularRole,
  'resourceZUID' | 'create' | 'read' | 'update' | 'delete' | 'publish'
>;
type PermissionsProps = {
  granularRoles: Partial<GranularRole>[];
  onAddNewGranularRole: (roleData: NewGranularRole) => void;
  onUpdateGranularRole: (roleData: UpdateGranularRole) => void;
  onDeleteGranularRole: (resourceZUID: string) => void;
};
export const Permissions = ({
  granularRoles,
  onAddNewGranularRole,
  onUpdateGranularRole,
  onDeleteGranularRole,
}: PermissionsProps) => {
  const { instanceModels, instanceContentItems, languages } = useInstance(
    (state) => state,
  );
  const [filterKeyword, setFilterKeyword] = useState<string>('');
  const [showAddRule, setShowAddRule] = useState(false);
  const deferredFilterKeyword = useDeferredValue(filterKeyword);
  const searchFieldRef = useRef(null);
  const addGranularRoleRef = useRef(null);

  const resolveResourceZUID = (zuid: string) => {
    if (zuid?.startsWith('6-')) {
      return (
        instanceModels?.find((model) => model.ZUID === zuid)?.label || zuid
      );
    } else if (zuid?.startsWith('7-')) {
      const contentItem = instanceContentItems?.find(
        (item) => item.meta.ZUID === zuid,
      );
      const name = contentItem?.web?.metaTitle || zuid;
      const langCode = languages?.find(
        (lang) => lang.ID === contentItem?.meta?.langID,
      )?.code;

      return langCode ? `(${langCode}) ${name}` : name;
    } else {
      return zuid;
    }
  };

  const granularRolesWithResourceNames = useMemo(() => {
    return granularRoles?.map((role) => ({
      ...role,
      resourceName: resolveResourceZUID(role.resourceZUID),
    }));
  }, [granularRoles]);

  const filteredGranularRoles = useMemo(() => {
    if (!deferredFilterKeyword) return granularRolesWithResourceNames;

    return granularRolesWithResourceNames?.filter(
      (role) =>
        role.resourceName
          ?.toLowerCase()
          ?.includes(deferredFilterKeyword.toLowerCase()),
    );
  }, [granularRolesWithResourceNames, deferredFilterKeyword]);

  useEffect(() => {
    if (showAddRule) {
      setTimeout(() => {
        addGranularRoleRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [showAddRule, addGranularRoleRef]);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={2} height={48}>
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
            ref={searchFieldRef}
            value={filterKeyword}
            onChange={(evt) => setFilterKeyword(evt.target.value)}
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
            sx={{ ml: 1 }}
            onClick={() => setShowAddRule(true)}
          >
            Add Rule
          </Button>
        </Box>
      </Stack>
      {!granularRoles?.length && !showAddRule && !deferredFilterKeyword && (
        <NoRules onAddRulesClick={() => setShowAddRule(true)} />
      )}
      {!!filteredGranularRoles?.length && (
        <Table
          granularRoles={filteredGranularRoles}
          onDataChange={(roleData) => onUpdateGranularRole(roleData)}
          onDelete={onDeleteGranularRole}
        />
      )}
      {!filteredGranularRoles?.length && !!deferredFilterKeyword && (
        <NoFilterMatches
          keyword={deferredFilterKeyword}
          onSearchAgain={() => {
            setFilterKeyword('');
            searchFieldRef.current?.querySelector('input')?.focus();
          }}
        />
      )}
      {showAddRule && (
        <Box pt={2} ref={addGranularRoleRef}>
          <AddRule
            onCancel={() => setShowAddRule(false)}
            onAddRuleClick={(newRoleData) => {
              onAddNewGranularRole(newRoleData);
              setShowAddRule(false);
            }}
            granularRoles={granularRoles}
          />
        </Box>
      )}
    </Box>
  );
};
