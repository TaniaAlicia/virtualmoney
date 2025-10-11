type ArrowIconProps = {
  className?: string;
};

const ArrowIcon = ({ className }: ArrowIconProps) => {
  return (
    <div data-svg-wrapper className="flex items-center justify-center">
      <svg
        viewBox="0 0 22 24"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5L2 10.5ZM21.0607 13.0607C21.6464 12.4749 21.6464 11.5251 21.0607 10.9393L11.5147 1.3934C10.9289 0.807611 9.97918 0.807611 9.3934 1.3934C8.80761 1.97918 8.80761 2.92893 9.3934 3.51472L17.8787 12L9.3934 20.4853C8.80761 21.0711 8.80761 22.0208 9.3934 22.6066C9.97919 23.1924 10.9289 23.1924 11.5147 22.6066L21.0607 13.0607ZM2 13.5L20 13.5L20 10.5L2 10.5L2 13.5Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default ArrowIcon;
