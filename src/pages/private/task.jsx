import { Helmet } from 'react-helmet-async';

import { TaskView } from 'src/sections/task/views';

// ----------------------------------------------------------------------

export default function TaskPage() {
  return (
    <>
      <Helmet>
        <title> Task | Life Wise </title>
      </Helmet>
      <TaskView />
    </>
  );
}
