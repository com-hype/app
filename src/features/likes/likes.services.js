import {axiosRequest} from '../../helpers/axios';
import formatLocalToken from '../../helpers/formatLocalToken';

export async function fetchLikes(token) {
  return axiosRequest({
    method: 'GET',
    url: '/projects/liked',
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}
