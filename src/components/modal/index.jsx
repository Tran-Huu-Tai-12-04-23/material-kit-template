/* eslint-disable import/no-cycle */
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useModal } from 'src/contexts/modal-context';
import CloseIcon from '../icons/close-icon';

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  borderRadius: 2,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

export default function ModalCustom({children, isOpen, onClose}) {
  const {hideModal}  = useModal()
  return (
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <IconButton onClick={hideModal} sx={{position: 'absolute', top: 2, right: 2}}>
           <CloseIcon color="red"/>
         </IconButton>
          {children}
        </Box>
      </Modal>
  );
}
