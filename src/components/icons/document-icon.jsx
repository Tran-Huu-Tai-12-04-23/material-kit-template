const DocumentIcon = ({ size = 20, color = '#33BFFF', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.175 6.17501L12.15 2.15001C11.8417 1.84167 11.4167 1.66667 10.975 1.66667H4.99999C4.08333 1.66667 3.34166 2.41667 3.34166 3.33334L3.33333 16.6667C3.33333 17.5833 4.07499 18.3333 4.99166 18.3333H15C15.9167 18.3333 16.6667 17.5833 16.6667 16.6667V7.35834C16.6667 6.91667 16.4917 6.49167 16.175 6.17501ZM8.52499 14.4083L6.75833 12.6417C6.43333 12.3167 6.43333 11.7917 6.75833 11.4667C7.08333 11.1417 7.60833 11.1417 7.93333 11.4667L9.10833 12.6417L12.0583 9.69167C12.3833 9.36667 12.9083 9.36667 13.2333 9.69167C13.5583 10.0167 13.5583 10.5417 13.2333 10.8667L9.7 14.4C9.38333 14.7333 8.84999 14.7333 8.52499 14.4083ZM11.6667 7.50001C11.2083 7.50001 10.8333 7.12501 10.8333 6.66667V2.91667L15.4167 7.50001H11.6667Z"
      fill={color}
    />
  </svg>
);

export default DocumentIcon;
