import { NavLink as RouterNavLink } from 'react-router-dom';

import { Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type UserLayoutNavLinkProps = {
  href: string;
  text: string;
};

const UserLayoutNavLink = ({ href, text }: UserLayoutNavLinkProps) => {
  const theme = useTheme();
  return (
    <Link
      component={RouterNavLink}
      to={href}
      underline='hover'
      // @ts-ignore
      style={({ isActive }) => ({
        color: isActive
          ? theme.palette.primary.main
          : theme.palette.text.primary
      })}
      sx={theme => ({
        px: 1,
        '&:hover': {
          color: theme.palette.primary.main
        }
      })}
    >
      {text}
    </Link>
  );
};

export default UserLayoutNavLink;
