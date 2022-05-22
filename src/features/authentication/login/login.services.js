import {axiosRequest} from '../../../helpers/axios';

export async function sendLogin(payload) {
  return axiosRequest({
    method: 'POST',
    url: '/auth/me',
    data: payload,
  });
}
