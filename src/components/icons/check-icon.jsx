const CheckIcon = ({ size, color, ...props }) => (
  <svg
    width={size || 14}
    height={size || 14}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 11.6667L4.2 15.9333C4.56667 16.4222 4.75 16.6667 5 16.6667C5.25 16.6667 5.43333 16.4222 5.8 15.9333L17 1"
      stroke={color || 'black'}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);
export default CheckIcon;
