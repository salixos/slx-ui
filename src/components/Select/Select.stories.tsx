import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import type { SelectOption, SelectGroup } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px', paddingBottom: '320px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    searchable: { control: 'boolean' },
    multiline: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const basicOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
];

const groupedOptions: SelectGroup[] = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ],
  },
];

const multilineOptions: SelectOption[] = [
  {
    value: 'ow60',
    label: 'Owlab OW60',
    description: 'Premium',
    meta: '€399,99',
  },
  {
    value: 'mode65',
    label: 'Mode Sixty Five',
    description: 'Competitive',
    meta: '€299,99',
  },
  {
    value: 'tfv2',
    label: 'TF V2',
    description: 'Tenkeyless',
    meta: '€249,99',
  },
  {
    value: 'zoom75',
    label: 'Zoom75',
    description: 'With LED Bar',
    meta: '€189,99',
  },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        options={basicOptions}
        value={value}
        onChange={setValue}
        label="Fruit"
        placeholder="Select a fruit..."
      />
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        options={basicOptions}
        value={value}
        onChange={setValue}
        label="Fruit"
        helperText="Choose your favourite fruit."
        placeholder="Select a fruit..."
      />
    );
  },
};

export const ErrorState: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        options={basicOptions}
        value={value}
        onChange={setValue}
        label="Fruit"
        state="error"
        errorText="Please select a fruit."
        placeholder="Select a fruit..."
      />
    );
  },
};

export const SuccessState: Story = {
  render: () => {
    const [value, setValue] = useState('apple');
    return (
      <Select
        options={basicOptions}
        value={value}
        onChange={setValue}
        label="Fruit"
        state="success"
        successText="Great choice!"
        placeholder="Select a fruit..."
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Select
      options={basicOptions}
      value="apple"
      onChange={() => {}}
      label="Fruit"
      disabled
    />
  ),
};

export const Sizes: Story = {
  render: () => {
    const [v1, setV1] = useState('');
    const [v2, setV2] = useState('');
    const [v3, setV3] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Select options={basicOptions} value={v1} onChange={setV1} size="sm" label="Small" placeholder="Select..." />
        <Select options={basicOptions} value={v2} onChange={setV2} size="md" label="Medium" placeholder="Select..." />
        <Select options={basicOptions} value={v3} onChange={setV3} size="lg" label="Large" placeholder="Select..." />
      </div>
    );
  },
};

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        options={basicOptions}
        value={value}
        onChange={setValue}
        label="Fruit"
        placeholder="Select a fruit..."
        searchable
      />
    );
  },
};

export const Grouped: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        groups={groupedOptions}
        value={value}
        onChange={setValue}
        label="Food"
        placeholder="Select an item..."
      />
    );
  },
};

export const Multiline: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        options={multilineOptions}
        value={value}
        onChange={setValue}
        label="Keyboard"
        placeholder="Select a keyboard..."
        multiline
      />
    );
  },
};

export const Required: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        options={basicOptions}
        value={value}
        onChange={setValue}
        label="Fruit"
        placeholder="Select a fruit..."
        required
      />
    );
  },
};