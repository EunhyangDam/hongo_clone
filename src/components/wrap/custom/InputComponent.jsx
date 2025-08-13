import React from "react";

export default function InputComponent({
  type,
  name,
  id,
  checked,
  value,
  onChange,
  onBlur,
  placeholder,
  maxLength,
  dataKey,
  ref,
  readOnly,
  disable,
}) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      checked={checked}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      maxLength={maxLength}
      data-key={dataKey}
      ref={ref}
      readOnly={readOnly}
      disabled={disable}
    />
  );
}
