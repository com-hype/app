import React, {useContext, useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {HideTabBar} from '../../core/app.context';
import colors from '../../theme/colors';
import * as Animatable from 'react-native-animatable';
export default function TabBar({state, descriptors, navigation}) {
  const {status} = useContext(HideTabBar);

  return (
    <Animatable.View
      style={[styles.container, status && styles.hiddenTabBar]}
      transition="height">
      {!status &&
        state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName;
          let size = 24;

          let color = isFocused ? colors.primary : '#BEBEBE';

          if (route.name === 'Accueil') {
            iconName = isFocused ? 'brain' : 'brain';
          } else if (route.name === 'Messages') {
            iconName = isFocused ? 'comments' : 'comments';
          } else if (route.name === 'Compte') {
            iconName = isFocused ? 'user' : 'user';
          } else if (route.name === 'Liste') {
            iconName = isFocused ? 'bookmark' : 'bookmark';
          }

          // if (route.name === 'Messages' && isFocused) {
          //   setHidde = true;
          // } else {
          //   setHidde = false;
          // }

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              key={route.name}
              style={{flex: 1, alignItems: 'center'}}>
              <FontAwesome5Icon
                name={iconName}
                size={size}
                color={color}
                solid
              />
              {isFocused && <View style={styles.point} />}
            </TouchableOpacity>
          );
        })}
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 80 : 60,
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    borderWidth: 1,

    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  hiddenTabBar: {
    height: 0,
    overflow: 'hidden',
    paddingBottom: 0,
    borderWidth: 0,
  },
  point: {
    marginTop: 10,
    height: 5,
    width: 5,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});
