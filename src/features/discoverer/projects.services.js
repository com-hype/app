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

export async function sendLike(id, action, token) {
  return axiosRequest({
    method: 'POST',
    url: `/projects/${id}/like`,
    data: {action},
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}
