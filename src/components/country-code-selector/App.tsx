import React, { useState, useRef } from 'react';
import './styles.css';

import { phoneCodes, phoneCodesMap } from './newCodes';

interface PhoneCode {
  code: string;
  dial_code: string;
  name: string;
  flag: string;
}

export default function CountryCodeSelector() {
  const [value, setValue] = useState<string>('US');
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const addClassName = () => {
    const el = buttonRef.current;
    if (el && !el.classList.contains('hover')) el.classList.add('hover');
  };

  const removeClassName = () => {
    const el = buttonRef.current;
    if (el && el.classList.contains('hover')) el.classList.remove('hover');
  };

  return (
    <div className="select-container">
      <button ref={buttonRef}>
        <div className="arrow-down" />
        {phoneCodesMap[value].dial_code}
      </button>
      <select
        onPointerEnter={addClassName}
        onPointerLeave={removeClassName}
        value={value}
        onChange={onChange}
      >
        {phoneCodes.map((phoneCode: PhoneCode) => {
          return (
            <option key={phoneCode.code} value={phoneCode.code}>
              {phoneCode.flag}
              {'\u00a0'}
              {'\u00a0'}
              {phoneCode.name}
              {'\u00a0'}
              {'\u00a0'}
              {phoneCode.dial_code}
            </option>
          );
        })}
      </select>
    </div>
  );
}
