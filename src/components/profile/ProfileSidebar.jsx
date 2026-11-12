import { Link } from "react-router-dom";
import Styles from "./_profile.module.css";
import { useAuth } from "../../hooks/fetchUser";
import { FaPencilAlt } from "react-icons/fa";
// import photo from "../../assets/photo.jpg";
import photo from "../../assets/photo.jpg";
import { HiOutlinePencilAlt } from "react-icons/hi";

const ProfileSidebar = () => {
  const { user } = useAuth();
  return (
    <aside className={Styles.sidebar}>

      <picture>
        <Link to={"update-profile-picture"} className={Styles.profilePic}>
          <HiOutlinePencilAlt />
        <img
          src={user?.avatar?.url}
          alt="avatar"
        />
        </Link>
      </picture>

      <figcaption>
        <Link to={"update-user-info"}>
          <span className={Styles.icon}>
            <FaPencilAlt />
          </span>
        </Link>

        <h1>{user?.name}</h1>
        
         <Link to={"update-password"} className={Styles.update_password}>
          Update Password
        </Link>
      </figcaption>

    </aside>
  );
};

export default ProfileSidebar;
