import { ComponentProps } from 'react';

export interface IconProps extends ComponentProps<'svg'> {
  className?: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: (props: IconProps) => JSX.Element;
}

export interface Feature {
  name: string;
  description: string;
  icon: (props: IconProps) => JSX.Element;
  forProjectHolders: boolean;
}

export interface Step {
  name: string;
  description: string;
  icon: (props: IconProps) => JSX.Element;
} 