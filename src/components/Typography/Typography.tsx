import React from 'react';
import styles from './Typography.module.css';

type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type BodyVariant = 'body-lg' | 'body-md' | 'body-sm' | 'body-xs';
type LabelVariant = 'label-lg' | 'label-sm';
type TypographyVariant = HeadingVariant | BodyVariant | LabelVariant;

type TypographyColor = 'primary' | 'secondary' | 'muted' | 'disabled' | 'accent';
type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type BodyTag = 'p' | 'span' | 'div' | 'li' | 'blockquote';
type LabelTag = 'label' | 'span' | 'p';
type AnyTag = HeadingTag | BodyTag | LabelTag;

export interface TypographyProps {
  variant?: TypographyVariant;
  as?: AnyTag;
  color?: TypographyColor;
  weight?: TypographyWeight;
  truncate?: boolean;
  mono?: boolean;
  className?: string;
  children: React.ReactNode;
}

const defaultTags: Record<TypographyVariant, AnyTag> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'body-lg': 'p',
  'body-md': 'p',
  'body-sm': 'p',
  'body-xs': 'p',
  'label-lg': 'span',
  'label-sm': 'span',
};

export const Typography = ({
  variant = 'body-md',
  as,
  color = 'primary',
  weight,
  truncate = false,
  mono = false,
  className,
  children,
}: TypographyProps) => {
  const Tag = (as ?? defaultTags[variant]) as React.ElementType;

  const variantKey = variant.replace('-', '-') as string;

  const classes = [
    styles.root,
    styles[variantKey],
    styles[color],
    weight ? styles[weight] : '',
    truncate ? styles.truncate : '',
    mono ? styles.mono : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <Tag className={classes}>{children}</Tag>;
};

Typography.displayName = 'Typography';