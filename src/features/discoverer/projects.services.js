import {axiosRequest} from '../../helpers/axios';
import formatLocalToken from '../../helpers/formatLocalToken';

export async function fetchProjects(token) {
  return axiosRequest({
    method: 'GET',
    url: '/projects',
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}
