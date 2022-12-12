import React from 'react';
import { IMaskInput } from 'react-imask';

export type CreditCardNumberMaskProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

const CreditCardNumberMask = React.forwardRef<
  HTMLElement,
  CreditCardNumberMaskProps
>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask='#000 0000 0000 0000'
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
});

export default CreditCardNumberMask;
