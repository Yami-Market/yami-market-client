export const getCookie = (cookies: string, name: string) => {
  const value = `; ${cookies}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts[1].split(';').shift();
  } else {
    throw new Error(`Cookie ${name} not found`);
  }
};
