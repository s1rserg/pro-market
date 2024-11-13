import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Properties = {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  showTimeSelect?: boolean;
  label?: string;
  placeholder?: string;
};

const DateTimeInput: React.FC<Properties> = ({
  selected,
  onChange,
  showTimeSelect = false,
  label,
  placeholder,
}) => (
  <div style={{ marginBottom: '1rem' }}>
    {label && <label>{label}</label>}
    <DatePicker
      selected={selected}
      onChange={onChange}
      showTimeSelect={showTimeSelect}
      timeIntervals={15}
      dateFormat={showTimeSelect ? 'Pp' : 'P'}
      placeholderText={placeholder}
    />
  </div>
);

export default DateTimeInput;
