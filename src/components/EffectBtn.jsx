import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

export const EffectBtn = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  '&:hover, &.Mui-focusVisible': {
    zIndex: 10000000,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '1px solid currentColor',
    },
  },
}));
