import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {checkToken, selectAll} from '../features/authentication/user.redux';
import Loading from '../features/authentication/_components/loading';
import AuthNavigation from './auth';
import DefaultNavigation from './default';
import WelcomeNavigation from './welcome';

const RootContainer = () => {
  const user = useSelector(selectAll);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.token) {
      console.log(user);
      dispatch(checkToken(user.token));
    }
  }, []);

  if (!user.header.connected) {
    return <AuthNavigation />;
  } else if (user.data.status === 'in_registration') {
    return <WelcomeNavigation />;
  } else if (user.data.status === 'active') {
    return <DefaultNavigation />;
  } else {
    return <Loading />;
  }
};

export default RootContainer;
