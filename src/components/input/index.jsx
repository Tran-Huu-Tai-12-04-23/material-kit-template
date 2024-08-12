import { styled } from '@mui/material/styles';

export const InputWrapper = styled('div')(
  ({ theme, minWidth }) => `
  width:${minWidth} ;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 6px;

  padding: 4px;
  display: flex;
  overflow: auto-scroll;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
      height: 30px;

  }


`
);

function InputCustom({minWidth='100%', ...props}) {
  return (
    <InputWrapper minWidth={minWidth}>
      <input {...props} />
    </InputWrapper>
  );
}

export default InputCustom;
