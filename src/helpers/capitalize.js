export default function capitalize (value) {
  return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1)
};