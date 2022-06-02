import {axiosRequest} from '../../helpers/axios';
import formatLocalToken from '../../helpers/formatLocalToken';

export async function sendLogin(payload) {
  return axiosRequest({
    method: 'POST',
    url: '/auth/login',
    data: payload,
  });
}

export async function sendRegister(payload) {
  return axiosRequest({
    method: 'POST',
    url: '/auth/register',
    data: {
      ...payload,
      birthdate: `${payload.birthdate.getFullYear()}-${
        payload.birthdate.getMonth() + 1
      }-${payload.birthdate.getDate()}`,
    },
  });
}

export async function fetchUser(token) {
  return axiosRequest({
    method: 'GET',
    url: '/auth/me',
    headers: {
      Authorization: formatLocalToken(token),
    },
  });
}
