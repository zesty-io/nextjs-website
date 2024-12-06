import { useMemo, forwardRef, useState } from 'react';
import {
  TextField,
  Autocomplete,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputAdornment,
} from '@mui/material';
import { EditRounded } from '@mui/icons-material';
import { Database } from '@zesty-io/material';

import { useInstance } from 'store/instance';
import { VirtualizedList } from 'components/accounts/ui/VirtualizedList';
import { ContentItem } from 'store/types';

const VirtualizedListComp = (defaultprops: any, ref) => {
  return <VirtualizedList ref={ref} {...defaultprops} rowheight={36} />;
};

const getLangCode = (content: ContentItem) => {
  if (!content || !Object.keys(content)?.length) {
    return '';
  }

  const { languages } = useInstance.getState();

  return languages?.find((lang) => lang.ID === content?.meta?.langID)?.code;
};

type ResourceSelectorProps = {
  onChange: (zuid: string) => void;
  initialValue?: string;
  resourcesToFilter: string[];
};
export const ResourceSelector = ({
  onChange,
  initialValue,
  resourcesToFilter,
}: ResourceSelectorProps) => {
  const { instanceModels, instanceContentItems } = useInstance(
    (state) => state,
  );

  const options = useMemo(() => {
    if (!instanceModels?.length && !instanceContentItems?.length) return [];

    const models = instanceModels?.map((model) => ({
      label: model.label,
      value: model.ZUID,
      type: 'model',
      sortText: model.label,
    }));
    const items = instanceContentItems?.map((item) => {
      const label = item?.web?.metaTitle || 'Missing Meta Title';

      return {
        label: getLangCode(item) ? `(${getLangCode(item)}) ${label}` : label,
        value: item?.meta?.ZUID,
        type: 'item',
        sortText: label,
      };
    });

    return [...models, ...items].sort(
      (a, b) => a?.sortText?.localeCompare(b?.sortText),
    );
  }, [instanceModels, instanceContentItems]);

  const filteredOptions = useMemo(() => {
    return options?.filter(
      (option) => !resourcesToFilter.includes(option.value),
    );
  }, [options, resourcesToFilter]);

  const [value, setValue] = useState(
    options?.find((option) => option.value === initialValue),
  );

  return (
    <Autocomplete
      fullWidth
      disableClearable
      options={filteredOptions}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {value?.value?.startsWith('6-') && <Database />}
                {value?.value?.startsWith('7-') && <EditRounded />}
              </InputAdornment>
            ),
          }}
          placeholder="Select Resource"
        />
      )}
      renderOption={(props, option) => {
        return (
          <ListItem
            {...props}
            key={option.value}
            sx={{
              height: 36,
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              {option.type === 'model' ? <Database /> : <EditRounded />}
            </ListItemIcon>
            <ListItemText
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordBreak: 'break-word',
                wordWrap: 'break-word',
              }}
            >
              {option.label}
            </ListItemText>
          </ListItem>
        );
      }}
      onChange={(_, value) => {
        onChange(value?.value || '');
        setValue(value);
      }}
      ListboxComponent={forwardRef(VirtualizedListComp)}
      onKeyDown={(evt) => {
        evt.stopPropagation();
      }}
    />
  );
};
