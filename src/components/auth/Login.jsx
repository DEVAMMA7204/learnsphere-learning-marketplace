import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../state-mangement/contextApi";
import Styles from "./auth.module.css";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
    isLoading: false,
  });

  const { email, password, isLoading } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: email.trim(),
        password: password,
      };

      console.log("LOGIN PAYLOAD:", payload);

      setState((previous) => ({
        ...previous,
        isLoading: true,
      }));

      await login(payload);

      toast.success("Successfully logged in");

      navigate("/");
    } catch (error) {
      console.log(
        "LOGIN ERROR:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setState({
        email: "",
        password: "",
        isLoading: false,
      });
    }
  };

  return (
    <section id={Styles.auth}>
      <article className={Styles.auth_block}>

        <header>
          <h1>Login</h1>
        </header>

        <main>
          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">
                Username
              </label>

              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={handleChange}
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="Enter password"
                required
                value={password}
                onChange={handleChange}
              />
            </div>

            {/* BUTTON */}
            <div className="form-group">
              <button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>

          </form>
        </main>

      </article>
    </section>
  );
};

export default Login;