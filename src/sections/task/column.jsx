/* eslint-disable import/no-cycle */
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { useTheme } from '@emotion/react';
import { Box, Chip, IconButton, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Iconify from 'src/components/iconify';
import { HEADER } from 'src/layouts/dashboard/config-layout';
import TaskItem from './components/task-item';
import { COLUMN } from './wrapper-task-layout';

function Column({ data }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: data.id,
    data: {
      type: COLUMN,
    },
  });

  const theme = useTheme();

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
        height: '70vh',
        minWidth: 350,
        borderRadius: 2,
        overflow: 'hidden',

      }}
    >
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        sx={{ padding: 2, height: HEADER.H_DESKTOP / 2, minWidth: 200 }}
      >
        <Stack className="ignore-scroll" {...listeners} direction="row" gap={1} alignItems="center">
          <Typography variant="h7" fontWeight={800}>
            {data?.name}
          </Typography>
          <Chip
            label={data?.tasks?.length}
            sx={{ fontWeight: 900, background: data?.background, color: data?.color }}
          />
        </Stack>
          <IconButton
          className='ignore-scroll'
            aria-label="fingerprint"
            color="primary"
            size="medium"
            sx={{
              border: () => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Iconify icon="eva:plus-fill" />
          </IconButton>
      </Stack>

      <SortableContext items={data?.tasks?.map((item) => item.id)}>
        <Stack sx={{ padding: 1 }} direction="column" gap={1}>
          {data?.tasks?.map((task) => (
            <TaskItem key={task?.id} data={task} />
          ))}
        </Stack>

  
      </SortableContext>
    </Box>
  );
}

Column.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Column;
