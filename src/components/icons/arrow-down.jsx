const ArrowDownIcon = ({width, height, color, props}) => (
  <svg
    width={width ||20}
    height={height||12}
    viewBox="0 0 20 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.4208 0C18.0166 0 17.6124 0.153685 17.304 0.462106L9.99975 7.76738L2.69553 0.462106C2.07869 -0.153685 1.07869 -0.153685 0.461843 0.462106C-0.153948 1.07895 -0.153948 2.07895 0.461843 2.69579L8.88291 11.1169C9.49975 11.7326 10.4998 11.7326 11.1166 11.1169L19.5377 2.69579C20.1534 2.07895 20.1534 1.07895 19.5377 0.462106C19.2292 0.153685 18.825 0 18.4208 0Z"
      fill={color || "black"}
    />
  </svg>
);
export default ArrowDownIcon;
