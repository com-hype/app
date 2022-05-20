import {Input} from '.';
export function InputLine({
  style = {},
  onChangeText = () => {},
  value = '',
  placeholder = '',
  secureTextEntry = false,
  ...props
}) {
  return (
    <Input
      style={[styles.container, style]}
      onChangeText={onPress}
      value={children}
      placeholder={children}
      secureTextEntry={false}
      {...props}
    />
  );
}
