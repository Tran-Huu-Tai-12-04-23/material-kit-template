/* eslint-disable import/no-cycle */
import { DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import { Stack } from '@mui/material';
// eslint-disable-next-line import/no-cycle
import { useColumnState } from 'src/redux/features/column/columnSlice';
import Column from './column';
import TaskItem from './components/task-item';

const TaskBoard = ({ taskActive, columnActive }) => {
  const { columns, columnsActive } = useColumnState();
  return (
    <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
      <SortableContext items={columns.map((col) => col.id)}>
        {columns.map((col) => {
          if(columnsActive?.includes(col.id)){
            return  <Column key={col.id} data={col} />
          }
          return null
        })}
      </SortableContext>
      <DragOverlay adjustScale={false}>
        {taskActive && <TaskItem data={taskActive} isRotate />}
        {columnActive && <Column data={columnActive} isActive />}
      </DragOverlay>
    </Stack>
  );
};

export default TaskBoard;
