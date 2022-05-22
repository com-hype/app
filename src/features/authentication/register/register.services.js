import {axiosRequest} from '../../../helpers/axios';

export async function sendregister(payload) {
  return axiosRequest({
    method: 'POST',
    url: '/auth/register',
    data: {
      first_name: payload.firstName,
      last_name: payload.lastName,
      pseudo: payload.pseudo,
      birthdate: `${payload.birthDate.getFullYear()}-${
        payload.birthDate.getMonth() + 1
      }-${payload.birthDate.getDate()}`,
      email: payload.email,
      password: payload.password,
    },
  });
}
