/* eslint-disable import/no-cycle */
import { useSortable } from '@dnd-kit/sortable';
import { useTheme } from '@emotion/react';
import {
  alpha,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import Iconify from 'src/components/iconify';
import DocumentIcon from 'src/components/icons/document-icon';
import FileIcon from 'src/components/icons/file-icon';
import MessageIcon from 'src/components/icons/message-icon';
import { COLORS } from 'src/constanst';
import { TASK } from '../wrapper-task-layout';

function TaskItem({ data, isRotate }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: data?.id,
    data: {
      type: TASK,
    },
  });

  const theme = useTheme();
  return (
    <Box
      className="ignore-scroll"
      ref={setNodeRef}
      {...attributes}

      sx={{
        transition,
        transform: isRotate ? 'rotate(10deg)' : CSS.Translate?.toString(transform),
        opacity: isDragging ? '0.5' : '1',
        background: '700',
        padding: 1,
        borderRadius: 1,
        cursor: 'pointer',
        backgroundColor: 'white',
        '&:hover': {
          bgcolor: () => (isRotate ? 'white' : alpha(theme.palette.primary.light, 0.1)),
        },
        '&:hover ' : {
          '.icon-drag' : {
            display: 'block'
          }
        } ,
        boxShadow: isRotate ? '0px 2px 4px rgba(0, 0, 0, 0.08)' : '0px 2px 4px transparent',
      }}
      focusRipple
    >
      <Stack  {...listeners} minHeight={50} direction="row" gap={1} alignItems="center" justifyContent="space-between">
        <Typography   variant="h7" fontSize={12} fontWeight={800}>
          {data?.title}
        </Typography>
         <Button  variant="text" gap={1}>
          <DocumentIcon />
          <Typography variant="h7" color={COLORS.document} fontSize={12} fontWeight={800}>
            9
          </Typography>
        </Button>
        </Stack>
       

      <Stack   direction="row" gap={1} alignItems="center">
        <Chip
          size="small"
          label="#UI003"
          sx={{
            background: 'white',
            color: '#606C80',
            minWidth: 80,
            fontSize: 12,
            fontWeight: 800,
          }}
          variant="outlined"
        />
        <Chip
          size="small"
          label="Development"
          sx={{
            background: 'rgba(236, 72, 153, 0.2)',
            color: '#DB2777',
            minWidth: 80,
            fontSize: 12,
            fontWeight: 800,
          }}
        />
        <Chip
          size="small"
          label={data?.statusName}
          sx={{
            background: data?.statusBackground,
            color: data?.statusColor,
            minWidth: 80,
            fontSize: 12,
            fontWeight: 800,
          }}
        />
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        gap={1}
        alignItems="center"
        sx={{ marginTop: 1, width: '100%' }}
      >
        <Stack direction="row" alignItems="center" gap={1}>
          {data?.lstMember?.length > 0 && (
            <AvatarGroup   max={2}>
              {data?.lstMember?.map((member, index) => (
               <Tooltip key={index} title={member?.username}>
                 <Avatar  alt={member?.username} src={member?.avatar} />
               </Tooltip>
              ))}
            </AvatarGroup>
          )}

          <IconButton
           
            aria-label="fingerprint"
            color="primary"
            size="large"
            sx={{
              border: () => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Iconify icon="eva:plus-fill" sx={{ color: 'gray' }} />
          </IconButton>
        </Stack>

        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <IconButton    variant="text" gap={1}>
            <FileIcon />
            <Typography variant="h7" color={COLORS.file} fontSize={12} fontWeight={800}>
              {' '}
              9
            </Typography>
          </IconButton>
          <IconButton   variant="text" gap={1}>
            <MessageIcon />
            <Typography variant="h7" color={COLORS.message} fontSize={12} fontWeight={800}>
              {' '}
              9
            </Typography>
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}

TaskItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TaskItem;
