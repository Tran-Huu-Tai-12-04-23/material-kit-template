const CloseIcon = ({ color, ...props }) => (
  <svg
    width={24}
    height={25}
    viewBox="0 0 63 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_35_15862)">
      <path
        d="M13.2067 13.8059L49.5506 50.1498M49.5506 13.8059L13.2067 50.1498"
        stroke={color || 'black'}
        strokeWidth={5.19199}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_35_15862">
        <rect
          width={62.3038}
          height={62.3038}
          fill={color || 'black'}
          transform="translate(0.37854 0.978027)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default CloseIcon;
