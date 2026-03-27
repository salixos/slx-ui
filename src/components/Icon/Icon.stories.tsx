import type { Meta, StoryObj } from '@storybook/react';
import {
  CircleUser, Mail, Search, Settings, Bell,
  ArrowRight, Check, X, AlertCircle, Info,
  Home, FileText, Download, Upload, Trash,
} from 'lucide-react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'disabled', 'accent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: CircleUser,
    size: 'md',
    color: 'primary',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Icon icon={Bell} size="xs" />
      <Icon icon={Bell} size="sm" />
      <Icon icon={Bell} size="md" />
      <Icon icon={Bell} size="lg" />
      <Icon icon={Bell} size="xl" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Icon icon={Info} color="primary" />
      <Icon icon={Info} color="secondary" />
      <Icon icon={Info} color="muted" />
      <Icon icon={Info} color="disabled" />
      <Icon icon={Info} color="accent" />
    </div>
  ),
};

export const IconSet: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {[
        CircleUser, Mail, Search, Settings, Bell,
        ArrowRight, Check, X, AlertCircle, Info,
        Home, FileText, Download, Upload, Trash,
      ].map((icon, i) => (
        <Icon key={i} icon={icon} size="md" color="primary" />
      ))}
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    icon: AlertCircle,
    size: 'md',
    color: 'accent',
    label: 'Warning',
  },
};