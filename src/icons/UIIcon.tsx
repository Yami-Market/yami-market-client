import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faArrowRightFromBracket,
  faBars,
  faCartPlus,
  faCartShopping,
  faCircleUser,
  faCreditCard,
  faHouse,
  faLocationDot,
  faMagnifyingGlass,
  faMoon,
  faPlus,
  faReceipt,
  faSun,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome';

export type PartialFontAwesomeIconProps = Omit<FontAwesomeIconProps, 'icon'>;

export const HomeIcon = (props: PartialFontAwesomeIconProps) => (
  <FontAwesomeIcon icon={faHouse} {...props} />
);

export const MenuIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faBars} {...props} />;
};

export const SearchIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faMagnifyingGlass} {...props} />;
};

export const LightModeIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faSun} {...props} />;
};

export const DarkModeIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faMoon} {...props} />;
};

export const ShoppingCartIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faCartShopping} {...props} />;
};

export const ShoppingCartAddIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faCartPlus} {...props} />;
};

export const AccountIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faCircleUser} {...props} />;
};

export const AngleUpIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faAngleUp} {...props} />;
};

export const AngleDownIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faAngleDown} {...props} />;
};

export const AngleLeftIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faAngleLeft} {...props} />;
};

export const AngleRightIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faAngleRight} {...props} />;
};

export const AddIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faPlus} {...props} />;
};

export const CloseIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faXmark} {...props} />;
};

export const CreditCardIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faCreditCard} {...props} />;
};

export const ReceiptIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faReceipt} {...props} />;
};

export const LogoutIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faArrowRightFromBracket} {...props} />;
};

export const AddressIcon = (props: PartialFontAwesomeIconProps) => {
  return <FontAwesomeIcon icon={faLocationDot} {...props} />;
};
