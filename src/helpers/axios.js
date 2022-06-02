import axios from 'axios';

import {getErrorMessage} from './errors';

axios.defaults.baseURL = 'https://comhype.herokuapp.com/api';

export const axiosRequest = async axiosParams => {
  try {
    const response = await axios.request(axiosParams);

    return {status: 'done', response: response.data};
  } catch (error) {
    console.log('error -> ', error);
    const code =
      error.response && error.response.data
        ? error.response.data.error
        : 'AN_ERROR_HAS_OCCURRED';

    return {
      status: 'error',
      response: error.response.data.message
        ? error.response.data.message
        : getErrorMessage(code),
      code: code,
    };
  }
};
