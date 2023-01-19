import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { grey } from '@mui/material/colors';
import { Typography } from '@mui/material';

const initialOptions = [{ value: '-', label: 'no data' }];

export const AccountSelect = ({
  // label = 'no label',
  options = initialOptions,
  onChange = () => {},
  value = '',
  width = 150,
}) => {
  const [val, setVal] = React.useState(value);

  const handleChange = (event, data) => {
    setVal(event.target.value);
    onChange(data.props);
  };

  React.useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <Box width={width}>
      <FormControl fullWidth>
        <Select
          size="small"
          displayEmpty
          id="demo-simple-select"
          value={val}
          fullWidth
          onChange={handleChange}
          sx={{
            borderRadius: '6px',
            '& fieldset': {
              border: `1px solid ${grey[200]}`,
              borderRadius: '6px',
            },
          }}
        >
          {options.map((e) => {
            const label = e.label.replace('_', ' ').replace('-', ' ');
            return (
              <MenuItem key={e.ZUID} value={e.value} id={e.ZUID} {...e}>
                <Typography
                  variant="body1"
                  color={'text.primary'}
                  textTransform={'capitalize'}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
