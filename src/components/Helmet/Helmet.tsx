import { Helmet as ReactHelmet } from 'react-helmet-async';

export type HelmetProps = { title?: string };

const Helmet = ({ title }: HelmetProps) => {
  return (
    <ReactHelmet>
      <title>{title ? `${title} | Yami Market` : 'Yami Market'}</title>
    </ReactHelmet>
  );
};

export default Helmet;
