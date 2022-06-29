import {axiosRequest} from '../../../helpers/axios';
import formatLocalToken from '../../../helpers/formatLocalToken';

export async function sendPresenterRegistration(payload, token) {
  return axiosRequest({
    method: 'POST',
    url: '/auth/register/presenter',
    data: payload,
    headers: {
      Authorization: formatLocalToken(token),
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function sendProjectImage(payload, token) {
  return axiosRequest({
    method: 'POST',
    url: '/upload/image',
    data: payload,
    headers: {
      Authorization: formatLocalToken(token),
      'Content-Type': 'multipart/form-data',
    },
  });
}
