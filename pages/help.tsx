import React from "react";

interface Props {}

const Help: React.FC<Props> = () => {
  return (
    <iframe
      height="600px"
      src="https://docs.google.com/viewer?srcid=1uIE4Bb3uX_80-dITtwSl8OjgkyAwJOsV&pid=explorer&efh=false&a=v&chrome=false&embedded=true"
      width="100%"
    />
  );
};

export default Help;
