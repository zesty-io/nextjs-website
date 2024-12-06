import { Box, Container, Grid, Stack } from '@mui/material';

function Row(props) {
  if (props.data.name === 'container') {
    return (
      <Container sx={{ ...props?.data?.styles }}>{props.children}</Container>
    );
  }
  if (props.data.name === 'section') {
    return <Box sx={{ ...props?.data?.styles }}>{props.children}</Box>;
  } else {
    return (
      <Grid container spacing={2} sx={{ ...props?.data?.styles }}>
        {props.children}
      </Grid>
    );
  }
}

export default Row;
