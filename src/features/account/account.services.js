import {axiosRequest} from '../../helpers/axios';
import formatLocalToken from '../../helpers/formatLocalToken';

export async function getPersonnalProject(token) {
  return axiosRequest({
    method: 'GET',
    url: '/projects/me',
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}
