import {axiosRequest} from '../../helpers/axios';
import formatLocalToken from '../../helpers/formatLocalToken';

export async function sendProjectImage(payload, token) {
  return axiosRequest({
    method: 'POST',
    url: '/upload/image',
    data: payload,
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}
export async function sendReplaceProjectImage(id, payload, token) {
  return axiosRequest({
    method: 'POST',
    url: `/upload/image/${id}`,
    data: payload,
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}
