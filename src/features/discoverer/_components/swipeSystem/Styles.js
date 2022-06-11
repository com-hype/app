'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 30,
  },
  touchable: {
    borderRadius: 30,
    overflow: 'hidden',
  },
});
