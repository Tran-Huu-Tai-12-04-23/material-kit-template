/* eslint-disable import/no-cycle */
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useTheme } from "@emotion/react";
import { alpha, Box, Button, Chip, Stack, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import Iconify from "src/components/iconify";
import { HEADER } from "src/layouts/dashboard/config-layout";
import TaskItem from "./components/task-item";
import { COLUMN } from "./wrapper-task-layout";

function Column({ data }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data.id,
    data: {
      type: COLUMN,
    },
  });

  const theme = useTheme()


  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      // {...listeners}
      sx={{
        transition,
        transform: CSS.Translate?.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        background: isDragging ? '' : '',
        minHeight: '70vh',
        minWidth:  350,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
  <Stack justifyContent="space-between" alignItems="center" direction="row" sx={{padding : 2, height: HEADER.H_DESKTOP /2, minWidth: 200}} >
        <Stack {...listeners} direction="row" gap={1} alignItems="center">
            <Typography variant="h7" fontWeight={800}> Backlog Task</Typography>
            <Chip  label="9" sx={{background: 'rgba(59, 130, 246, 0.1)', color: 'rgba(59, 130, 246, 1)'}} />
        </Stack>
        <Button variant="text">
            <Iconify icon="eva:more-vertical-fill" />
        </Button>
        </Stack>

          <SortableContext items={[1,2,3,4,5,6].map((item) => item.id)}>
        <Stack sx={{padding: 1}} direction="column" gap={1}>
          {[1,2,3,4,5,6].map((task, index) => (
           <TaskItem key={index} data={{id: index}} />
          ))}
        </Stack>

       <Stack sx={{padding: 2}}>
         <Button variant="outlined" sx={{
          '&:hover': {
            bgcolor: () => alpha(theme.palette.primary.contrastText, 0.16),
          },
         }}><Iconify icon="eva:plus-fill" /></Button>
       </Stack>
      </SortableContext>
    </Box>
  );
}

Column.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Column;