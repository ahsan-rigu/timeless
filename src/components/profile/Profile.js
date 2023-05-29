import React, { useContext, useState } from "react";
import "./profile.css";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { UserContext } from "../../contexts/UserContextProvider";
import { SessionContext } from "../../contexts/SessionContextProvider";
import { CiUser } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";
import UserProfile from "./UserProfile";
import LogInPrompt from "./LogInForm";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";

const Profile = () => {
  const [flipped, setFlipped] = useState(false);
  const { loggedIn, signIn } = useContext(AuthContext);
  const { setProfileActive, profileActive } = useContext(SessionContext);

  return (
    <section
      className={
        profileActive
          ? "profile-container active"
          : "profile-container inactive"
      }
    >
      <header>
        <CiUser className="icon" size={24} />
        <h2>your profile</h2>
        <button>
          <MdOutlineClose
            className="icon"
            onClick={() => setProfileActive(false)}
            size={"1.5rem"}
          />
        </button>
      </header>
      {loggedIn ? (
        <UserProfile />
      ) : (
        <div className={flipped ? "container-filp flipped" : "container-filp"}>
          <LogInForm setFlipped={setFlipped} />
          <SignUpForm setFlipped={setFlipped} />
        </div>
      )}
    </section>
  );
};

export default Profile;
