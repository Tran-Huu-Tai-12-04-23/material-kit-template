import { toast } from 'react-toastify';

import { handleErrorApi, saveAccessToken, saveRefreshToken } from 'src/helper';
import { endpoints } from 'src/services/endpoints';
import rootApi from 'src/services/root-api';

export const login = async (loginDTO) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.sign_in, loginDTO);
    if (!res) {
      toast.error('Login failed! Try again!');
      return null;
    }
    saveAccessToken(res.accessToken);
    saveRefreshToken(res.refreshToken);
    setTimeout(() => {}, 1000);
    const user = await rootApi.get(endpoints.get_profile);

    return {
      loginResponse: res,
      user,
    };
  });

export const getProfileUser = () => handleErrorApi(() => rootApi.get(endpoints.get_profile));
