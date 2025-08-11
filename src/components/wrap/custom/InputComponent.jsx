import React from "react";

export default function InputComponent({
  type,
  name,
  id,
  checked,
  value,
  onChange,
  placeholder,
  maxLength,
  dataKey,
  ref,
  readOnly,
}) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      checked={checked}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      data-key={dataKey}
      ref={ref}
      readOnly={readOnly}
    />
  );
}
