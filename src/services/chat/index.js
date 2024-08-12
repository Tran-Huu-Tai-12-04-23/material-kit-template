import { toast } from 'react-toastify';
import { handleErrorApi } from '../../helper/index';
import { endpoints } from '../endpoints';
import rootApi from '../root-api';

export const createNewChat = async (body) => {
  const res = await handleErrorApi(() => rootApi.post(endpoints.create_new_chat, body));
  toast.success(res.message);
  return res.data;
};

export const onGroupChatPagination = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.group_chat_pagination, {
      where: body.where,
      skip: 10 * body.page,
      take: 10,
    });
    return res[0];
  });

export const messagePagination = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.message_pagination, {
      where: body.where,
      skip: 15 * body.page,
      take: 15,
    });
    return res[0];
  });
