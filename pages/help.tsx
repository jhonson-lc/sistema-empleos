import React from "react";

interface Props {}

const Help: React.FC<Props> = () => {
  return (
    <iframe
      height="600px"
      src="https://docs.google.com/viewer?srcid=1tJIq0QuIh_jtepSA1EAcsNGEs0TLrWvi&pid=explorer&efh=false&a=v&chrome=false&embedded=true"
      width="100%"
    />
  );
};

export default Help;
