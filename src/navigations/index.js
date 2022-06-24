import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import Loading from '../components/templates/loading';
import {checkToken, selectAll} from '../features/authentication/user.redux';

import AuthNavigation from './auth';
import DiscovererNavigation from './discoverer';
import DefaultNavigation from './discoverer';
import PresenterNavigation from './presenter';
import WelcomeNavigation from './welcome';

const RootContainer = () => {
  const user = useSelector(selectAll);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.token) {
      dispatch(checkToken(user.token));
    }
  }, []);

  if (user.header.status === 'pending') return <Loading />;

  if (!user.header.connected) {
    return <AuthNavigation />;
  } else if (user.data.status === 'in_registration') {
    return <WelcomeNavigation />;
  } else if (user.data.status === 'active') {
    if (user.data.type === 'discoverer') {
      return <DiscovererNavigation />;
    } else if (user.data.type === 'presenter') {
      return <PresenterNavigation />;
    }
  } else {
    return <Loading />;
  }
};

export default RootContainer;
