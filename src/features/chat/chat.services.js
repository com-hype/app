import {axiosRequest} from '../../helpers/axios';
import formatLocalToken from '../../helpers/formatLocalToken';

export async function sendCreateDiscussion(id, token) {
  return axiosRequest({
    method: 'POST',
    url: '/discussions',
    data: {
      user_id: id,
    },
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}

export async function fetchDiscussions(token) {
  return axiosRequest({
    method: 'GET',
    url: '/discussions',
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}

export async function fetchMessages(id, token) {
  return axiosRequest({
    method: 'GET',
    url: `/discussions/${id}/messages`,
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}

export async function sendMessage(id, message, token) {
  return axiosRequest({
    method: 'POST',
    url: `/discussions/${id}/messages`,
    data: {
      body: message,
    },
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}
