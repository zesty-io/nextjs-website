import * as zestyBlocks from 'blocks/layoutsBlocks';
import { useContext } from 'react';
import { GlobalContext } from 'pages/[...slug]';
import { ThemeProvider } from '@mui/material';
import revampTheme from 'theme/revampTheme';

const ComponentSelector = (props) => {
  // Initialize Context
  const ctx = useContext(GlobalContext);

  console.log(ctx);

  // Grab component name from react-auto-layout
  const componentName = props.data.name;

  // Map component from react-auto-layout to nextjs component
  const Component = zestyBlocks[componentName];

  // check if ther's an error hydrating data

  if (props.data.name.toLowerCase() in ctx) {
    // Read the context and grab component data
    const content = ctx[props.data.name.toLowerCase()]?.data[0];

    // console.log('content', content);
    return <Component {...content} />;
  }

  // return component without data by default
  return (
    <ThemeProvider theme={() => revampTheme('light')}>
      <Component />
    </ThemeProvider>
  );
};

export default ComponentSelector;
