import { Button } from 'antd';
import classnames from 'classnames';
import React, { CSSProperties, PropsWithChildren } from 'react';

interface ButtonCusProps {
  style?: CSSProperties;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}
function ButtonCus({
  children,
  className,
  style,
  icon,
}: PropsWithChildren<ButtonCusProps>) {
  return (
    <Button
      type="primary"
      className={classnames(
        'text-white flex items-center justify-center',
        className
      )}
      icon={icon}
      style={{
        borderRadius: '4px',
        background: 'var(--main-color)',
        height: '35px',
        ...style,
      }}
    >
      {children}
    </Button>
  );
}
interface ButtonOutlinedProps extends ButtonCusProps {}
function Outlined({
  children,
  style,
  className,
  icon,
  onClick,
}: PropsWithChildren<ButtonOutlinedProps>) {
  return (
    <Button
      className={classnames(
        'border-none shadow-none bg-white flex items-center justify-center',
        className
      )}
      style={{
        borderRadius: '6px',
        color: 'var(--main-color)',
        height: '35px',
        minWidth: '85px',
        ...style,
      }}
      icon={icon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
ButtonCus.Outlined = Outlined;
export default ButtonCus;
