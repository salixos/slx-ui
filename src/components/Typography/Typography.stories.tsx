import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'body-lg', 'body-md', 'body-sm', 'body-xs',
        'label-lg', 'label-sm',
      ],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'disabled', 'accent'],
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
    },
    truncate: { control: 'boolean' },
    mono: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    variant: 'body-md',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
};

export const Headings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
};

export const Body: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="body-lg">Body Large — The quick brown fox jumps over the lazy dog.</Typography>
      <Typography variant="body-md">Body Medium — The quick brown fox jumps over the lazy dog.</Typography>
      <Typography variant="body-sm">Body Small — The quick brown fox jumps over the lazy dog.</Typography>
      <Typography variant="body-xs">Body XSmall — The quick brown fox jumps over the lazy dog.</Typography>
    </div>
  ),
};

export const Labels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="label-lg">Label Large</Typography>
      <Typography variant="label-sm">Label Small</Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography color="primary">Primary color</Typography>
      <Typography color="secondary">Secondary color</Typography>
      <Typography color="muted">Muted color</Typography>
      <Typography color="disabled">Disabled color</Typography>
      <Typography color="accent">Accent color</Typography>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography weight="regular">Regular weight</Typography>
      <Typography weight="medium">Medium weight</Typography>
      <Typography weight="semibold">Semibold weight</Typography>
      <Typography weight="bold">Bold weight</Typography>
    </div>
  ),
};

export const Mono: Story = {
  args: {
    variant: 'body-md',
    mono: true,
    children: 'const greeting = "Hello, world!";',
  },
};

export const Truncate: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Typography truncate>
        This is a very long text that should be truncated when it exceeds the width of its container.
      </Typography>
    </div>
  ),
};

export const SemanticOverride: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography variant="h1" as="p">Looks like h1, renders as p</Typography>
      <Typography variant="body-md" as="span">Looks like body-md, renders as span</Typography>
    </div>
  ),
};

export const HeadingWithBody: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography variant="h1">The quick brown fox</Typography>
      <Typography variant="body-md" color="secondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
      </Typography>
    </div>
  ),
};

export const AllHeadingsWithBody: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((level) => (
        <div key={level} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography variant={level}>Heading {level.toUpperCase()}</Typography>
          <Typography variant="body-md" color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </div>
      ))}
    </div>
  ),
};