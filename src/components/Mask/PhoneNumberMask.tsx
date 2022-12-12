import React from 'react';
import { IMaskInput } from 'react-imask';

export type PhoneNumberMaskProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

const PhoneNumberMask = React.forwardRef<HTMLElement, PhoneNumberMaskProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask='(#00) 000-0000'
        definitions={{
          '#': /[1-9]/
        }}
        // @ts-ignore
        inputRef={ref}
        onAccept={
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (value: any) => onChange({ target: { name: props.name, value } })
        }
        unmask
        overwrite
      />
    );
  }
);

export default PhoneNumberMask;
