export const buildNoPhoto = (name: string, size = 100) => {
  const nameEncoded = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${nameEncoded}?size=${size}`;
};
