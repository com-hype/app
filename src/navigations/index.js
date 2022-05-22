import React from 'react';

import {useSelector} from 'react-redux';
import {selectAll} from '../features/authentication/user.redux';
import Loading from '../features/authentication/_components/loading';
import AuthNavigation from './auth';
import WelcomeNavigation from './welcome';

const RootContainer = () => {
  const user = useSelector(selectAll);

  if (user.header.status === 'nothing') {
    return <Loading />;
  } else if (!user.header.connected) {
    return <AuthNavigation />;
  } else {
    return <WelcomeNavigation />;
  }
};

export default RootContainer;
