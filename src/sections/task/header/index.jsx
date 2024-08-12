import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { useModal } from 'src/contexts/modal-context';
import SelectBoardPopover from 'src/layouts/dashboard/common/select-board-popover';
import { HEADER } from 'src/layouts/dashboard/config-layout';
import { bgBlur } from 'src/theme/css';
import FormAddNewBoard from '../components/form-add-new-board';

function Header() {
  const theme = useTheme();
  const {openModal} = useModal()

  return (
    <Box
      sx={{
        boxShadow: 'none',
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        width: `calc(100%)`,
        height: HEADER.H_DESKTOP - 10,
        position: 'sticky',
        top: HEADER.H_DESKTOP + 10,
        right: 0,
        zIndex: 3,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: '100%' }}
      >
        <Stack gap={1} alignItems="center" direction="row">
         <SelectBoardPopover/>
        </Stack>
        <Stack direction="row" gap={2}>
          <Button
          onClick={() => openModal(<FormAddNewBoard/>)}
            aria-label="fingerprint"
            color="primary"
            size="large"
            sx={{
              border: () => `dashed 1px ${theme.palette.divider}`,
            }}
          >
               <Iconify icon="eva:plus-fill" />
            <Typography variant="caption">Add new board</Typography>
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Header;
