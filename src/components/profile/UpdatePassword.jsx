import { useState, useContext } from "react";
import { AuthContext } from "../../state-mangement/contextApi";
import Styles from "./_profile.module.css";

const UpdatePassword = () => {
  const { updatePassword } = useContext(AuthContext);

  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const { oldPassword, newPassword } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      oldPassword,
      newPassword,
    };

    try {
      const response = await updatePassword(payload);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className={Styles.password_form}
      onSubmit={handleSubmit}
    >
      <div className={Styles.password_group}>
        <label htmlFor="oldPassword">
          Old Password
        </label>

        <input
          type="password"
          id="oldPassword"
          name="oldPassword"
          value={oldPassword}
          onChange={handleChange}
          placeholder="Enter old password"
        />
      </div>

      <div className={Styles.password_group}>
        <label htmlFor="newPassword">
          New Password
        </label>

        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
        />
      </div>

      <button
        className={Styles.update_btn}
        type="submit" >
        Update Password
      </button>
    </form>
  );
};

export default UpdatePassword;