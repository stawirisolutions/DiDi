import React from 'react';
import '@/utils/highlight';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { StyledEditor } from './styles';
import EditorToolbar, { formats } from './EditorToolbar';

// Update the interface with the correct type for onChange
interface ED {
  id?: string;
  error?: any;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (content: string) => void; // Changed to accept a string parameter
  simple?: boolean;
  helperText?: React.ReactNode;
  sx?: object;
  [key: string]: any; // Allow for additional props
}

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  placeholder,
  required,
  simple = false,
  helperText,
  sx,
  ...other
}: ED) {
  const modules = {
    toolbar: {
      container: `#${id}`,
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme: any) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} />

        {/* Use a type assertion to fix the TypeScript error */}
        {React.createElement(ReactQuill as any, {
          value,
          onChange,
          modules,
          formats,
          placeholder,
          ...other
        })}
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}