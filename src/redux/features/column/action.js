/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import {
  addTaskToColumn,
  createNewColumn,
  getAllColumnOfTeam,
  getDataToFilter,
  moveTaskInTheSameCol,
  moveTaskToDiffCol,
  swapBetweenCol,
} from '../../../services/column';

import { useTeamState } from '../team/teamSlice';
// eslint-disable-next-line import/no-cycle
import {
  changeCurrentColumn,
  changeFilter,
  clearColumnFilter,
  moveTaskInTheDifferentColumn,
  moveTaskInTheSameColumn,
  swapBetweenColumn,
  toggleColumnActive,
  useColumnState,
} from './columnSlice';

export const ColumnActionKey = {
  ADD_COLUMN: 'column/add_column',
  LOAD_ALL_COLUMN_OF_TEAM: 'column/all_column',
  LOAD_DATA_TO_FILTER: 'column/filter_data',
  ADD_TASK: 'column/add_task',
  SWAP_BETWEEN_COLUMN: 'column/swap_between_column',
  MOVE_TASK_IN_THE_SAME_COL: 'task/move-task-in-the-same-column',
  MOVE_TASK_TO_DIFF_COL: 'task/move-task-in-the-same-column',
};

export const createColumnAsync = createAsyncThunk(ColumnActionKey.ADD_COLUMN, createNewColumn);

export const moveTaskToTheSameColAsync = createAsyncThunk(
  ColumnActionKey.MOVE_TASK_IN_THE_SAME_COL,
  moveTaskInTheSameCol
);

export const moveTaskToDiffColAsync = createAsyncThunk(
  ColumnActionKey.MOVE_TASK_TO_DIFF_COL,
  moveTaskToDiffCol
);

export const swapBetweenColAsync = createAsyncThunk(
  ColumnActionKey.SWAP_BETWEEN_COLUMN,
  swapBetweenCol
);

export const loadListColumnOfTeamAsync = createAsyncThunk(
  ColumnActionKey.LOAD_ALL_COLUMN_OF_TEAM,
  getAllColumnOfTeam
);

export const loadDataToFilterAsync = createAsyncThunk(
  ColumnActionKey.LOAD_DATA_TO_FILTER,
  getDataToFilter
);

export const createTaskAsync = createAsyncThunk(ColumnActionKey.ADD_TASK, addTaskToColumn);

export const useColumnAction = () => {
  const dispatch = useDispatch();
  const teamState = useTeamState();
  const { currentColumn, filter } = useColumnState();

  const onClearColumnFilter = () => {
    dispatch(clearColumnFilter());
  };
  const onChangeFilter = async (key, value) => {
    dispatch(
      changeFilter({
        key,
        value,
      })
    );
  };

  const onMoveTaskInTheSameColumn = async (body) => {
    const { columnId, taskCurrentIndex, taskNewIndex } = body;
    dispatch(moveTaskInTheSameColumn(body));
    dispatch(
      moveTaskToTheSameColAsync({
        columnId,
        taskCurrentIndex: taskCurrentIndex + 1,
        taskNewIndex: taskNewIndex + 1,
      })
    );
  };
  const onMoveTaskInTheDifferentColumn = async (body) => {
    const { activeItemIndex, overItemIndex, columnIdFrom, columnIdTo } = body;
    dispatch(moveTaskInTheDifferentColumn(body));
    dispatch(
      moveTaskToDiffColAsync({
        taskCurrentIndex: activeItemIndex + 1,
        taskNewIndex: overItemIndex + 1,
        columnIdFrom,
        columnIdTo,
      })
    );
  };

  const onSwapBetweenColumn = (body) => {
    dispatch(swapBetweenColumn(body.columns));
    dispatch(
      swapBetweenColAsync({
        colCurrentIndex: body.colCurrentIndex + 1,
        colTargetIndex: body.colTargetIndex + 1,
      })
    );
  };

  const onLoadDataToFilter = () => {
    dispatch(
      loadDataToFilterAsync({
        teamId: teamState?.currentTeam?.id,
      })
    );
  };

  const onCreateNewColumn = async (body) => {
    dispatch(createColumnAsync(body));
  };

  const onGetAllColumnOfTeam = async () => {
    dispatch(
      loadListColumnOfTeamAsync({
        teamId: teamState.currentTeam?.id,
        lstStatus: filter.lstStatus,
        members: filter.members,
        searchKey: filter.searchKey,
      })
    );
  };

  const onCreateTask = async (body) => {
    if (currentColumn?.id) dispatch(createTaskAsync({ ...body }));
  };

  const onToggleColumnActive = (id) => {
    dispatch(toggleColumnActive(id));
  };

  return {
    onClearColumnFilter,
    onChangeFilter,
    onCreateNewColumn,
    onGetAllColumnOfTeam,
    onCreateTask,
    onMoveTaskInTheSameColumn,
    onMoveTaskInTheDifferentColumn,
    onSwapBetweenColumn,
    changeCurrentColumn: (column) => {
      dispatch(changeCurrentColumn(column));
    },
    onLoadDataToFilter,
    onToggleColumnActive,
  };
};
