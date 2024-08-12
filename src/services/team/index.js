import { toast } from 'react-toastify';
import { handleErrorApi } from '../../helper/index';
import { endpoints } from '../endpoints';
import rootApi from '../root-api';

export const createNewTeam = async (team) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.create_team, team);
    toast.success(res.message);
    return res.data;
  });

export const getLstUserToInviteTeam = async (data) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.lst_user_to_invite_team, {
      where: {
        lstUserTeamExist: data.lstUserExist,
        name: data.name,
      },
      skip: 10 * data.page,
      take: data?.take || 10,
    });
    return res[0];
  });

export const paginationTeamOfUser = async (page) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.team_of_user_pagination, {
      skip: 10 * page,
      take: 10,
    });
    return res[0];
  });
