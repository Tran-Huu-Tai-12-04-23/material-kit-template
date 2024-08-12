import { Box } from '@mui/material';
import { useTeamState } from 'src/redux/features/team/teamSlice';
import Filter from '../components/filter';
import Header from '../header';
import WrapperTaskLayout from '../wrapper-task-layout';

// ----------------------------------------------------------------------

export default function TaskView() {
  const {currentTeam} = useTeamState()
  return (
    <Box>
      <Header />
      {
        currentTeam &&     <Filter />
      }
      <WrapperTaskLayout />
    </Box>
  );
}
