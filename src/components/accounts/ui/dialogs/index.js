import { Box, Button, Grid, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { light } from 'theme/paletteAccounts';

const MySwal = withReactContent(Swal);

export const SuccessMsg = ({
  title = 'Success',
  action = () => {},
  html = '',
}) => {
  MySwal.fire({
    position: 'center',
    icon: 'success',
    html,
    title,
    timer: 2500,
    confirmButtonColor: light.primary.main,
    customClass: {
      container: 'swal-zindex-override',
    },
  }).then(() => action());
};

export const ErrorMsg = ({
  title = 'Error',
  text = 'Something went wrong',
  html = '',
  timerProgressBar = false,
  timer = 2500,
}) => {
  MySwal.fire({
    position: 'center',
    icon: 'error',
    title,
    html,
    text,
    confirmButtonColor: light.zesty.zestyRose,
    timer,
    timerProgressBar,
    customClass: {
      container: 'swal-zindex-override',
    },
  });
};

export const TokenPrompt = ({ token = '' }) => {
  const copyToClipboard = () => {
    navigator?.clipboard?.writeText(token);
  };
  return (
    <Box>
      <Box paddingBottom={4}>
        <Typography variant="p" fontSize={'small'}>
          Once this modal is closed you will not be able to retrieve the access
          token again. Access tokens are secrets which should be stored
          securely. Anyone who has the token will be able to make API requests
          to this instance at the selected role & permissions level.
        </Typography>
      </Box>
      <Grid
        container
        display={'flex'}
        sx={{ background: '#f1f1f1', alignItems: 'center' }}
      >
        <Grid item xs={10}>
          <Typography variant="p" fontSize={'small'}>
            {token}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={copyToClipboard} type="button" variant="contained">
            Copy
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export const DeleteMsg = ({
  title = 'Please confirm below',
  action = () => {},
  html = '',
}) => {
  MySwal.fire({
    title,
    html,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    customClass: {
      container: 'swal-zindex-override',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      action();
    }
  });
};
