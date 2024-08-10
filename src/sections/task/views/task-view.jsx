import { Box } from '@mui/material';
import Filter from '../filter';
import Header from '../header';
import WrapperTaskLayout from '../wrapper-task-layout';

// ----------------------------------------------------------------------

export default function TaskView() {
  return (
      <Box>
        <Header/>
        <Filter/>

        <WrapperTaskLayout/>
      </Box>
  );
}
