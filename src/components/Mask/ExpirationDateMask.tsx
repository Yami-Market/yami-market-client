import React from 'react';
import { IMask, IMaskInput } from 'react-imask';

export type ExpirationDateMaskProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

const ExpirationDateMask = React.forwardRef<
  HTMLElement,
  ExpirationDateMaskProps
>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask='MM/YY'
      blocks={{
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12
        },
        YY: {
          mask: IMask.MaskedRange,
          from: 22,
          to: 99
        }
      }}
      // @ts-ignore
      inputRef={ref}
      onAccept={
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (value: any) => onChange({ target: { name: props.name, value } })
      }
      overwrite
    />
  );
});

export default ExpirationDateMask;
