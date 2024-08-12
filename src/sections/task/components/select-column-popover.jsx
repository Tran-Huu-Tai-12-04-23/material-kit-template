import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';

import { useTheme } from '@emotion/react';
import { Box, MenuItem, Paper, Switch, Typography } from '@mui/material';
import SettingVerticalIcon from 'src/components/icons/setting-vertical-icon';
import { useColumnAction } from 'src/redux/features/column/action';
import { useColumnState } from 'src/redux/features/column/columnSlice';

// ----------------------------------------------------------------------

export default function SelectColumnPopover() {
  const [open, setOpen] = useState(null);
  const {columns, columnsActive} = useColumnState()
  const {onToggleColumnActive}= useColumnAction()
  const theme = useTheme()

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };


  return (
    <>
       <IconButton onClick={handleOpen} sx={{background: () => alpha(theme.palette.primary.main, 0.2), width: 50, height: 50 } }>
              <SettingVerticalIcon color={theme.palette.primary.main}/>
            </IconButton>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            width: 300,
            p: 1
          },
        }}
      >
        <Box onClick={e => e.stopPropagation()}/>
          {columns.map((option, index) => (
            <MenuItem  
            onClick={() => onToggleColumnActive(option.id)}
            sx={{borderRadius: 2,mt:1, mb:1}} key={index}
            >
              <Switch checked={columnsActive?.includes(option.id)}/>
              <Typography  variant='h7' sx={{fontSize: 12}}>
                {option.name}
              </Typography>
              <Paper sx={{width: 20, height: 20, background: option.color,ml:2 }}/>
            </MenuItem>
          ))}
      </Popover>
    </>
  );
}
