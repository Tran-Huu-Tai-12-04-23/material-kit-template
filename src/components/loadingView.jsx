import { useTheme } from '@emotion/react';
import { Box, CircularProgress, alpha } from '@mui/material';

function LoadingView() {
  const theme = useTheme()
  return (
    <Box
      sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backdropFilter: 'blur(6px)', background: alpha(theme.palette.primary.main, 0.02)}}
    >
      <CircularProgress size={32} color="primary" />
    </Box>
  );
}

export default LoadingView;
