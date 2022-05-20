import {TextInput} from 'react-native';
import styles from './inputs.style';
export function Input({
  style = {},
  onChangeText = () => {},
  value = '',
  placeholder = '',
  secureTextEntry = false,
  ...props
}) {
  return (
    <View>
      <TextInput
        style={[styles.container, style]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        {...props}
      />
    </View>
  );
}
