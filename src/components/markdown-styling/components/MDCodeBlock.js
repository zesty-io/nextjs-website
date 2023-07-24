import { githubDarkInit } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { Box } from '@mui/material';

export const MDCodeBlock = ({ node }) => {
  const codeTxt = node?.children[0]?.children[0]?.value;

  return (
    <Box
      data-testid="code-block-box"
      sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
      padding={2}
    >
      <CodeMirror
        data-testid="code-mirror"
        editable={false}
        value={codeTxt}
        placeholder={'Click Run to view the response'}
        // height={'300px'}
        extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
        onChange={() => {}}
        style={{ fontSize: '18px', width: '100%' }}
        theme={githubDarkInit({
          settings: {
            caret: '#ff5c0c',
            fontFamily: 'monospace',
          },
        })}
      />
    </Box>
  );
};
