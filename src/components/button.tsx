import { ReactNode } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  children?: ReactNode;
};

type ButtonTextProps = {
  children: ReactNode;
};
type ButtonIconProps = {
  children: ReactNode;
};

function Button({ children, ...rest }: ButtonTextProps) {
  return (
    <TouchableOpacity
      className="bg-lime-400 rounded-md items-center justify-center flex-row h-12"
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

function ButtonText({ children }: ButtonProps) {
  return (
    <Text className="text-black font-heading text-base mx-2">{children}</Text>
  );
}

function ButtonIcon({ children }: ButtonIconProps) {
  return { children };
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
