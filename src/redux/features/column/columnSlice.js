import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import {
  createColumnAsync,
  createTaskAsync,
  loadDataToFilterAsync,
  loadListColumnOfTeamAsync,
} from './action';
// export interface IFilter {
//   searchKey: string;
//   status: string;
//   members: IUser[];
// // }

// interface IColumnState {
//   columns: IColumn[];
//   isLoading: boolean;
//   isLoadingCreateNewColumn: boolean;
//   isLoadingCreateNewTask: boolean;
//   currentColumn: IColumn | null;
//   filter: IFilter;
// }
const initFilter = {
  searchKey: '',
  lstStatus: [],
  members: [],
};
const initialState = {
  columns: [],
  isLoading: false,
  isLoadingCreateNewColumn: false,
  isLoadingCreateNewTask: false,
  currentColumn: null,
  filter: initFilter,
  filterData: {
    lstStatus: [],
  },
  columnsActive: [],
};

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter = {
        ...state.filter,
        [action.payload.key]: action.payload.value,
      };
      state.isLoading = true;
    },
    toggleColumnActive: (state, action) => {
      const id = action.payload;
      const columnActiveExist = state.columnsActive.find((item) => item === id);
      if (columnActiveExist) {
        state.columnsActive = [...state.columnsActive.filter((item) => item !== id)];
      } else {
        state.columnsActive = [...state.columnsActive, id];
      }
    },
    addColumn: (state, action) => {
      state.columns = [action.payload, ...state.columns];
    },
    changeCurrentColumn: (state, action) => {
      state.currentColumn = action.payload;
    },
    moveTaskInTheSameColumn: (state, action) => {
      const { activeContainerIndex, tasks } = action.payload;
      state.columns[activeContainerIndex].tasks = tasks;
    },

    swapBetweenColumn: (state, action) => {
      state.columns = action.payload;
    },
    moveTaskInTheDifferentColumn: (state, action) => {
      const { activeItemIndex, overItemIndex, activeContainerIndex, overContainerIndex } =
        action.payload;
      const removedItem = state.columns[activeContainerIndex].tasks.splice(activeItemIndex, 1)[0];
      if (state.columns[overContainerIndex].tasks.length > 0) {
        state.columns[overContainerIndex].tasks.splice(overItemIndex, 0, {
          ...removedItem,
          status: state.columns[overContainerIndex].statusCode,
        });
      } else {
        const task = {
          ...removedItem,
          status: state.columns[overContainerIndex].statusCode,
        };
        state.columns[overContainerIndex].tasks = [task];
      }
    },
    resetColumnState: () => initialState,
    clearColumnFilter: (state) => {
      state.filter = initFilter;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createColumnAsync.fulfilled, (state, action) => {
        state.isLoadingCreateNewColumn = false;
        state.columns = [...state.columns, action.payload];
      })
      .addCase(loadListColumnOfTeamAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns = action.payload;
        if (state.columnsActive.length <= 0)
          state.columnsActive = [...action.payload.map((item) => item.id)];
      })
      .addCase(loadDataToFilterAsync.fulfilled, (state, action) => {
        state.isLoadingCreateNewColumn = false;
        state.filterData = action.payload;
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.currentColumn) {
          const colIndex = state.columns.findIndex(
            (column) => column.id === state.currentColumn?.id
          );
          if (colIndex !== -1) {
            const newCol = {
              ...state.columns[colIndex],
              tasks: [...(state.columns[colIndex]?.tasks || []), action.payload],
            };
            state.columns = [
              ...state.columns.slice(0, colIndex),
              newCol,
              ...state.columns.slice(colIndex + 1),
            ];
          }
          state.currentColumn = null;
        }
      })
      .addCase(createTaskAsync.pending, (state) => {
        state.isLoadingCreateNewTask = true;
      })
      .addCase(createColumnAsync.pending, (state) => {
        state.isLoadingCreateNewColumn = false;
      })
      .addCase(loadListColumnOfTeamAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        (action) =>
          [createColumnAsync.rejected, loadListColumnOfTeamAsync.rejected].includes(action.type),
        (state) => {
          state.isLoadingCreateNewColumn = false;
          state.isLoading = false;
        }
      );
  },
});

export default columnSlice.reducer;

export const {
  addColumn,
  moveTaskInTheSameColumn,
  resetColumnState,
  changeCurrentColumn,
  moveTaskInTheDifferentColumn,
  swapBetweenColumn,
  changeFilter,
  clearColumnFilter,
  toggleColumnActive,
} = columnSlice.actions;

export const selectColumn = (state) => state.column;

export const useColumnState = () => useSelector(selectColumn);
