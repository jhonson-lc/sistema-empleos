import React from "react";

import ProfileClient from "./ProfileClient";
import ProfileEmployee from "./ProfileEmployee";

interface Props {
  session: any;
}

const createProfile: React.FC<Props> = ({ session }) => {
  return (
    <>
      {session.user.role === "CLIENT" && <ProfileClient session={session} />}
      {session.user.role === "EMPLOYEE" && (
        <ProfileEmployee session={session} />
      )}
    </>
  );
};

export default createProfile;
