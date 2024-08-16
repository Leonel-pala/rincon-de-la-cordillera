import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PhoneInput from 'react-phone-number-input/input';
import {
  getCountries,
  getCountryCallingCode,
} from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';
import ReactLoading from 'react-loading';

const inputColor = 'rgb(185, 185, 185)';
const countrySelectWidth = '80px';

const PhoneInputs = styled.div`
  display: flex;
  height: 48px;
`;

const StyledPhoneInput = styled(PhoneInput)`
  width: calc(100% - ${countrySelectWidth}) !important;
  height: 100% !important;
  border: 1px solid ${inputColor} !important;
  border-left: 0 !important;
  border-radius: 0 !important;
  padding: 10px 15px !important;

  &::placeholder {
    color: ${inputColor} !important;
  }

  &:focus {
    outline: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }

  &:disabled {
    background: rgba(239, 239, 239, 0.3) !important;
  }
`;

const SelectContainer = styled.div`
  position: relative;
  width: ${countrySelectWidth};
`;

const Loading = styled(ReactLoading)`
  margin-left: 4px;
`;

const Select = styled.select`
  position: absolute;
  display: flex;
  opacity: 0;
  width: 100%;
  height: 100%;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: initial;
  }
`;

interface ButtonProps {
  disabled: boolean;
  hovered: boolean;
}

const Button = styled.button<ButtonProps>`
  font-size: 14px;
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid ${inputColor};
  background-color: ${(props) =>
    props.disabled
      ? 'rgba(239, 239, 239, 0.3)'
      : props.hovered
      ? 'rgb(243, 243, 243)'
      : 'white'};
  padding: 10px;
`;

const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid ${inputColor};
  margin-right: 6px;
`;

interface AddressComponent {
  short_name: string;
  types: string[];
}

function getCountry(results: google.maps.GeocoderResult[]): string | undefined {
  for (let i = 0; i < results[0].address_components.length; i++) {
    const { short_name, types } = results[0].address_components[i];
    if (types.includes('country')) {
      return short_name;
    }
  }
}

interface PhoneNumberInputProps {
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: string | null) => void;
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  phoneNumber,
  setPhoneNumber,
}) => {
  const [hovered, setHovered] = useState(false);
  const [isFetchingCountry, setIsFetchingCountry] = useState(true);
  const [countryCode, setCountryCode] = useState<string>('US');

  useEffect(() => {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
    };

    function success(position: GeolocationPosition) {
      const { latitude: lat, longitude: lng } = position.coords;

      if (window.google) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { location: { lat, lng } },
          function (results, status) {
            if (status === google.maps.GeocoderStatus.OK && results[0]) {
              const countryCode = getCountry(results);
              if (countryCode) {
                setCountryCode(countryCode);
              }
            }

            setIsFetchingCountry(false);
          }
        );
      } else {
        setIsFetchingCountry(false);
      }
    }

    function error() {
      setIsFetchingCountry(false);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  function onCountryChange(value: string) {
    setCountryCode(value);
    const callingCode = `+${getCountryCallingCode(countryCode)}`;
    if (phoneNumber && phoneNumber.startsWith(callingCode)) {
      const newCallingCode = `+${getCountryCallingCode(value)}`;
      setPhoneNumber(
        `${newCallingCode}${phoneNumber.slice(callingCode.length)}`
      );
    }
  }

  return (
    <PhoneInputs>
      <SelectContainer>
        <Button disabled={isFetchingCountry} hovered={hovered}>
          <ArrowDown />
          {isFetchingCountry ? (
            <Loading
              type="spinningBubbles"
              color={inputColor}
              height={22}
              width={22}
              delay={0}
            />
          ) : (
            `+${getCountryCallingCode(countryCode)}`
          )}
        </Button>

        <Select
          disabled={isFetchingCountry}
          onPointerEnter={() => !isFetchingCountry && setHovered(true)}
          onPointerLeave={() => !isFetchingCountry && setHovered(false)}
          value={countryCode}
          onChange={(e) => onCountryChange(e.target.value)}
        >
          {getCountries().map((countryCode) => (
            <option key={countryCode} value={countryCode}>
              {en[countryCode]} &nbsp; +{getCountryCallingCode(countryCode)}
            </option>
          ))}
        </Select>
      </SelectContainer>
      <StyledPhoneInput
        disabled={isFetchingCountry}
        placeholder="Phone number"
        country={countryCode}
        value={phoneNumber}
        onChange={(val) => setPhoneNumber(val || null)}
      />
    </PhoneInputs>
  );
};
