import { Typography } from '@mui/material';

function Text(props) {
  /**
   * Fix me!
   * the !important in attributes break the styles and disregard it
   */
  return (
    <Typography
      variant={props?.data?.htmlElement}
      sx={{ my: 1 }}
      style={{ ...props?.data?.styles }}
    >
      {props.data.content}
    </Typography>
  );
}
export default Text;
