import { toast } from 'react-toastify';
import { handleErrorApi } from '../../helper/index';
import { endpoints } from '../endpoints';
import rootApi from '../root-api';

export const createNewColumn = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.create_column, body);
    toast.success(res.message);
    return res.data;
  });

export const getAllColumnOfTeam = async (loadAllColOfTeamDTO) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.all_column_of_team, loadAllColOfTeamDTO);
    return res;
  });

export const addTaskToColumn = async (taskToCreateDTO) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.add_task_to_column, taskToCreateDTO);
    toast.success(res.message);
    return res.data;
  });

export const moveTaskInTheSameCol = async (taskToMove) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.move_task_in_the_same_col, taskToMove);
    return res.data;
  });

export const moveTaskToDiffCol = async (moveTaskToDiffColDTO) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.move_task_to_diff_col, moveTaskToDiffColDTO);
    toast.success(res.message);
    return res.message;
  });

export const swapBetweenCol = async (swapBetweenColDTO) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.swap_between_col, swapBetweenColDTO);
    return res.message;
  });

export const getDataToFilter = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.filter_data, body);
    return res;
  });
