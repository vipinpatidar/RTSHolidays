import { ComponentPropsWithoutRef, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type BaseType = {
  children: ReactNode;
};

type LinkType = LinkProps &
  BaseType & {
    to: string;
  };

type ButtonType = ComponentPropsWithoutRef<"button"> &
  BaseType & {
    to?: never;
  };

type ButtonProps = LinkType | ButtonType;

function isLink(props: ButtonProps): props is LinkType {
  return "to" in props;
}

const Button = (props: ButtonProps) => {
  if (isLink(props)) {
    const { children, to, ...otherProps } = props;
    return (
      <Link to={to} {...otherProps}>
        {children}
      </Link>
    );
  }

  const { children, ...otherProps } = props;
  return <button {...otherProps}>{children}</button>;
};

export default Button;
