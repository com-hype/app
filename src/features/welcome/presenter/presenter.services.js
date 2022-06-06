import {axiosRequest} from '../../../helpers/axios';
import formatLocalToken from '../../../helpers/formatLocalToken';

export async function sendDiscovererRegistration(payload, token) {
  return axiosRequest({
    method: 'POST',
    url: '/auth/register/discoverer',
    data: payload,
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}
