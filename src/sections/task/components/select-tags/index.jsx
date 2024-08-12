import { useAutocomplete } from '@mui/base/useAutocomplete';
import { Box, Stack, Typography } from '@mui/material';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { alpha, styled } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import CloseIcon from 'src/components/icons/close-icon';
import { InputWrapper } from 'src/components/input';
import { useTeamState } from 'src/redux/features/team/teamSlice';
import { BOARD_TAG } from './tag-enum';

const Root = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
  font-size: 14px;
  width: 100%;
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <Box {...other}>
      <Typography variant="h7">{label}</Typography>
      <CloseIcon onClick={onDelete} color={props?.color} />
    </Box>
  );
}

const StyledTag = styled(Tag)(
  ({ theme, backgroundColor, color }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${backgroundColor};
  border: 1px solid ${color};
  border-radius: 100px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color:${color}
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
    color:${color}
  }
`
);
const Listbox = styled('ul')(
  ({ theme }) => `
  width: 370px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${alpha(theme.palette.primary.main, 0.2)};
    font-weight: 600;
    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${alpha(theme.palette.primary.main, 0.2)};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

export default function SelectTag({onChangeValue}) {
  const {teams} = useTeamState()
  const [selectedValue, setSelectedValue] = useState([]);
 const values = useMemo(() => Object.keys(BOARD_TAG).map((key) => BOARD_TAG[key]), [teams])
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: true,
    options: values|| [],
    value: selectedValue,
    getOptionLabel: (option) => option.name,
    onChange: (event, newValue) => {
      setSelectedValue(newValue);
      onChangeValue( newValue.map( item => item.code))
    }
  });


  
  return (
    <Root>
      <Box sx={{width: '100%'}} {...getRootProps()}>
        <InputWrapper minWidth="100%" ref={setAnchorEl} className={focused ? 'focused' : ''}>
          <Stack
            direction="row"
            sx={{ maxWidth: '250px', overflow: 'auto-scroll' }}
            alignItems="center"
            gap={1}
          >
            {value
              .reverse()
              .slice(0, 2)
              .map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <StyledTag
                    key={key}
                    {...tagProps}
                    label={option.name}
                    color={option?.color}
                    backgroundColor={option?.background}
                  />
                );
              })}
            {value.length > 2 && (
              <Typography variant="h7" color="gray">
                +{value.length - 2}
              </Typography>
            )}
          </Stack>
          <input placeholder="select status" {...getInputProps()} />
        </InputWrapper>
      </Box>
      {groupedOptions.length > 0 ? (
        <Listbox  {...getListboxProps()}>
          {values?.map((option, index) => {
            const { key,  ...optionProps } = getOptionProps({ option, index });
            return (
              <li 
              key={key}
                {...optionProps}
              >
                {option.name}
              </li>
            );
          })}
        </Listbox>
      ) : null}
    </Root>
  );
}
