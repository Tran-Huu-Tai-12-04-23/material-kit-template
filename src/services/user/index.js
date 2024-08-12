import { handleErrorApi } from '../../helper/index';
import { endpoints } from '../endpoints';
import rootApi from '../root-api';

export const getLstUserToInvite = () =>
  handleErrorApi(() => rootApi.get(endpoints.lst_user_to_invite_team));
