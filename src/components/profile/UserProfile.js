import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";

const UserProfile = () => {
  const { signOut } = useContext(AuthContext);
  const {
    userData: { user },
  } = useContext(UserContext);

  return (
    <section>
      {user.name}
      <button className="btn-secondary" onClick={() => signOut()}>
        SIGN OUT
      </button>
    </section>
  );
};

export default UserProfile;
