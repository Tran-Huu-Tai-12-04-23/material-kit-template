import { useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Chip, MenuItem, Stack, Typography } from '@mui/material';
import { account } from 'src/_mock/account';
import { EffectBtn } from 'src/components/EffectBtn';
import ArrowDownIcon from 'src/components/icons/arrow-down';
import { useTeamAction } from 'src/redux/features/team/action';
import { useTeamState } from 'src/redux/features/team/teamSlice';

// ----------------------------------------------------------------------

const Root = styled('div')(
  ({ theme }) => `
  width: 100%;
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
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }

  &:hover {
    border-color: #40a9ff;
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const InputWrapper = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? "#C7D0DD" : "#1C2025"};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  flex: 1 0 auto;
`
);

// ----------------------------------------------------------------------

export default function SelectBoardPopover() {
  const [open, setOpen] = useState(null);
   const { teams, currentTeam } = useTeamState();
  const { paginationTeamOfUser, changeCurrent } = useTeamAction();
  const [isFocus, setIsFocus] = useState(false);
  const [dataSelect, setDataSelect] = useState(teams);
  const [search, setSearch] = useState('');
  const theme = useTheme()

  useEffect(() => {
    paginationTeamOfUser();
  }, []);


  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    if (search) {
      const newData = teams.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
      setDataSelect(newData);
    } else {
      setDataSelect(teams);
    }
  }, [search, teams]);

  return (
    <>
     <EffectBtn onClick={handleOpen} sx={{
           borderRadius: 2,
           mb: 1
     }}>
      <Stack direction="row" alignItems="center" gap={2} sx={{p: 2}} >
         <IconButton
        sx={{
          width: 40,
          height: 40,
          overflow: 'hidden',
          background: () => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: () =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={currentTeam ? currentTeam?.thumbnails : account.photoURL}
          alt={currentTeam?.name}
          sx={{
            width: 50,
            height: 50,
            border: () => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {currentTeam?.name?.charAt(0).toUpperCase()}
        </Avatar>

      </IconButton>

  {currentTeam?.name || 'Select board'}
       <Stack direction="row" alignItems="center" gap={1}>
         {currentTeam?.tags.map((tag, index) => {
          if (index < 2) {
            return (
              <Chip
                key={index}
                label={tag.name}
                 sx={{  background: tag.background, color: tag.color }}
              />
            );
          }
          if (index === 2) return "...";
          return null;
        })}
       </Stack>

        <ArrowDownIcon size={12} color={theme.palette.primary.main} />
      </Stack>
     </EffectBtn>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            mt: 1,
            ml: 0.75,
            width: 400,
            p: 2,
            height: 250,
            maxHeight: 700,
            overflow: 'auto'
          },
        }}
      >
        <Root className={`${isFocus ? 'Mui-focused' : ''} `}>
          <InputWrapper value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)}  placeholder="Select board" />
        </Root>
        <Box sx={{ my: 1.5, px: 2 }} />
          {dataSelect.map((option, index) => (
            <MenuItem onClick={() => {
              setOpen(null)
              changeCurrent(option);
            }} 
            sx={{borderRadius: 2,mt:1, mb:1, background: currentTeam?.id === option.id ? alpha(theme.palette.primary.main, 0.2) : 'transparent'}} key={index}
            >
              
              <Avatar src={option.thumbnails} sx={{ mr: 2 }} />
              <Typography>
              {option.name}</Typography></MenuItem>
          ))}
      </Popover>
    </>
  );
}
