import {axiosRequest} from '../../helpers/axios';
import formatLocalToken from '../../helpers/formatLocalToken';

export async function sendProjectImage(payload, token) {
  console.log('payload -> ', JSON.stringify(payload));
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

export async function sendReplaceProjectImage(id, payload, token) {
  return axiosRequest({
    method: 'POST',
    url: `/upload/image/${id}`,
    data: payload,
    headers: {
      Authorization: formatLocalToken(token),
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function fetchFeatures(id, token) {
  return axiosRequest({
    method: 'GET',
    url: `/projects/${id}/features`,
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}

export async function fetchStats(token) {
  return axiosRequest({
    method: 'GET',
    url: `/projects/me/stats`,
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}

export async function sendFeatures(id, payload, token) {
  return axiosRequest({
    method: 'POST',
    url: `/projects/${id}/features`,
    data: {features: payload},
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}
