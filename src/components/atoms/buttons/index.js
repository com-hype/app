import {TouchableOpacity, Text} from 'react-native';

import styles from './buttons.style';

export function Button({children, onPress, style, ...props}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      {...props}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
