import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    autoGrow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Message',
    placeholder: 'Write your message here...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    helperText: 'A brief description of yourself.',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Message',
    state: 'error',
    errorText: 'Message cannot be empty.',
    value: '',
    onChange: () => {},
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Message',
    state: 'success',
    successText: 'Message looks good.',
    value: 'This is a valid message.',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter text...',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Notes',
    value: 'This content is read only and cannot be edited.',
    readOnly: true,
    onChange: () => {},
  },
};

export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Textarea
        label="Bio"
        placeholder="Tell us about yourself..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxChars={200}
      />
    );
  },
};

export const AutoGrow: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Textarea
        label="Auto-growing textarea"
        placeholder="Start typing and watch me grow..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoGrow
      />
    );
  },
};

export const Required: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    required: true,
    helperText: 'This field is required.',
  },
};