import {axiosRequest} from '../../../helpers/axios';
import formatLocalToken from '../../../helpers/formatLocalToken';

export async function sendFinishRegistration(payload, token) {
  return axiosRequest({
    method: 'POST',
    url: '/auth/register/finish',
    data: payload,
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}
