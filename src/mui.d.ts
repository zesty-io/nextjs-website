import { Color } from '@mui/material';

declare module '@mui/material/Typography' {
  export interface TypographyPropsVariantOverrides {
    body3: true;
  }
}

declare module '@mui/material/styles' {
  export interface Palette {
    red: Color;
    deepPurple: Color;
    deepOrange: Color;
    pink: Color;
    blue: Color;
    green: Color;
    purple: Color;
    yellow: Color;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsSizeOverrides {
    xsmall: true;
    xxsmall: true;
  }
}
