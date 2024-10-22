import { useState, useRef } from 'react';
import {
  Chip,
  Box,
  Stack,
  InputLabel,
  Tooltip,
  TextField,
  Autocomplete,
} from '@mui/material';
import { InfoRounded } from '@mui/icons-material';

const emailAddressRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type UsersProps = {
  userEmails: string[];
  onUpdateUserEmails: (emails: string[]) => void;
};
export const Users = ({ userEmails, onUpdateUserEmails }: UsersProps) => {
  const [inputValue, setInputValue] = useState('');
  const [emailError, setEmailError] = useState(false);
  const emailChipsRef = useRef([]);
  const autocompleteRef = useRef(null);

  return (
    <Box>
      <Stack direction="row" alignItems="center" gap={1} mb={0.5}>
        <InputLabel sx={{ mb: 0 }}>Users</InputLabel>
        <Tooltip title="Lorem Ipsum" placement="right">
          <InfoRounded color="action" sx={{ fontSize: 12 }} />
        </Tooltip>
      </Stack>
      <Autocomplete
        multiple
        value={userEmails}
        options={[]}
        freeSolo
        inputValue={inputValue}
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              '.MuiOutlinedInput-root ': {
                alignItems: 'baseline',
                alignContent: 'baseline',
                minHeight: 106,
                height: '100%',
              },
            }}
            ref={autocompleteRef}
            error={emailError}
            placeholder={
              userEmails.length ? '' : 'Email, comma or space separated'
            }
            helperText={
              emailError ? 'Please enter a valid email address.' : ' '
            }
            onKeyDown={(event) => {
              setEmailError(false);
              if (
                event.key === 'Enter' ||
                event.key === ',' ||
                event.key === ' '
              ) {
                if (inputValue && !inputValue.match(/^\s+$/)) {
                  if (inputValue.trim().match(emailAddressRegexp)) {
                    event.preventDefault();
                    onUpdateUserEmails(
                      Array.from(
                        new Set([
                          ...userEmails,
                          inputValue?.toLowerCase()?.trim(),
                        ]),
                      ),
                    );
                    setInputValue('');
                  } else {
                    setEmailError(true);
                  }
                } else {
                  setEmailError(false);
                }
              }

              if (event.key === 'Backspace' && !inputValue) {
                event.stopPropagation();

                // HACK: Needed to prevent the default behavior of autocomplete which autodeletes the right most tag on backspace
                setTimeout(() => {
                  emailChipsRef.current?.[
                    emailChipsRef.current?.filter((ref) => !!ref)?.length - 1
                  ]?.focus({ visible: true });
                }, 100);
              }
            }}
            onChange={(event) => {
              if (event.target.value?.split('').pop() === ',') return;

              // Handle pasted value if it contains comma or space separated emails
              const pastedValue = event.target?.value.replaceAll(',', ' ');

              if (pastedValue.includes(' ')) {
                event.preventDefault();
                const validEmails: string[] = [];
                const invalidEmails: string[] = [];

                pastedValue.split(' ').forEach((email) => {
                  if (email) {
                    if (email.match(emailAddressRegexp)) {
                      validEmails.push(email);
                    } else {
                      invalidEmails.push(email);
                    }
                  }
                });

                onUpdateUserEmails(
                  Array.from(new Set([...userEmails, ...validEmails])),
                );

                if (invalidEmails?.length) {
                  setEmailError(true);
                  setInputValue(invalidEmails.join(', '));
                }
              } else {
                setInputValue(event.target.value);
              }
            }}
            value={inputValue}
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          userEmails.map((email, index) => (
            <Chip
              {...getTagProps({ index })}
              ref={(el) => (emailChipsRef.current[index] = el)}
              size="small"
              color="default"
              clickable={false}
              sx={{
                backgroundColor: 'common.white',
                borderColor: 'grey.300',
                borderWidth: 1,
                borderStyle: 'solid',
              }}
              label={email}
              onDelete={(evt) => {
                if (evt.type === 'click') {
                  onUpdateUserEmails(userEmails.filter((_, i) => i !== index));
                }
              }}
              onKeyDown={(event) => {
                if (event.key === 'Backspace') {
                  // HACK: Needed to override the default behavior of autocomplete where it automatically selects the next tag after deleting a diff tag via backspace
                  setTimeout(() => {
                    onUpdateUserEmails(
                      userEmails.filter((_, i) => i !== index),
                    );
                    autocompleteRef.current?.querySelector('input')?.focus();
                  }, 150);
                }
              }}
            />
          ))
        }
      />
    </Box>
  );
};
