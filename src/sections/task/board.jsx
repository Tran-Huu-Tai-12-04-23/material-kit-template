import { DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import { Stack } from "@mui/material";
// eslint-disable-next-line import/no-cycle
import Column from "./column";

 const TaskBoard = () => <Stack  direction="row" spacing={2} sx={{marginTop: 2}}>
  <SortableContext items={[1,2,3,4,5,6].map((col) => col.id)} >
    {[1,2,3,4,5,6].map((col) => <Column  key={col} data={{id: col}}/>)}
  </SortableContext>
      <DragOverlay adjustScale={false}>
        {/* {taskActive && <TaskItem data={taskActive} isRotate isActive />}
        {columnActive && <Column data={columnActive} isActive />} */}
      </DragOverlay></Stack>

export default TaskBoard