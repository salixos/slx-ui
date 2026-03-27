import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Mail, User } from 'lucide-react';
import { Input } from './Input';
import { InputAddonPassword } from './addons/InputAddonPassword';
import { InputAddonCopy } from './addons/InputAddonCopy';
import { InputAddonSearch } from './addons/InputAddonSearch';
import { InputAddonLoading } from './addons/InputAddonLoading';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '240px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'flushed'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    helperText: 'This will be your public display name.',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    state: 'error',
    errorText: 'Please enter a valid email address.',
    value: 'notanemail',
    onChange: () => {},
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    state: 'success',
    successText: 'Username is available.',
    value: 'johndoe',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Account ID',
    value: 'ACC-00123456',
    readOnly: true,
    onChange: () => {},
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input variant="default" placeholder="Default" label="Default" />
      <Input variant="filled" placeholder="Filled" label="Filled" />
      <Input variant="flushed" placeholder="Flushed" label="Flushed" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input size="sm" placeholder="Small" label="Small" />
      <Input size="md" placeholder="Medium" label="Medium" />
      <Input size="lg" placeholder="Large" label="Large" />
    </div>
  ),
};

export const WithLeftAddon: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    leftAddon: <Mail size={16} strokeWidth={1.75} />,
  },
};

export const WithRightAddon: Story = {
  args: {
    label: 'Full name',
    placeholder: 'John Doe',
    rightAddon: <User size={16} strokeWidth={1.75} />,
  },
};

export const PasswordAddon: Story = {
  render: () => {
    const ref = useRef<HTMLInputElement>(null);
    return (
      <Input
        ref={ref}
        label="Password"
        type="password"
        placeholder="Enter password..."
        rightAddon={<InputAddonPassword inputRef={ref} />}
      />
    );
  },
};

export const CopyAddon: Story = {
  render: () => {
    const ref = useRef<HTMLInputElement>(null);
    return (
      <Input
        ref={ref}
        label="Promo code"
        value="SUMMER2024"
        readOnly
        onChange={() => {}}
        rightAddon={<InputAddonCopy inputRef={ref} />}
      />
    );
  },
};

export const SearchAddon: Story = {
  render: () => {
    const ref = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState('');
    return (
      <Input
        ref={ref}
        label="Search"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        leftAddon={<InputAddonSearch inputRef={ref} onClear={() => setValue('')} />}
      />
    );
  },
};

export const LoadingAddon: Story = {
  args: {
    label: 'Username',
    placeholder: 'Checking availability...',
    rightAddon: <InputAddonLoading />,
  },
};

export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        label="Bio"
        placeholder="Tell us about yourself..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxChars={100}
      />
    );
  },
};

export const Required: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    required: true,
    helperText: 'We will never share your email.',
  },
};