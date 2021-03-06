import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends Omit<BoxProps, "size"> {
  size?: number;
}

const HelpCircleIcon: React.FC<Props> = ({ size = 24, ...props }) => {
  return (
    <Box {...props}>
      <svg
        className="feather feather-help-circle"
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
        <path d="M12 17L12.01 17" />
      </svg>
    </Box>
  );
};

export default HelpCircleIcon;
