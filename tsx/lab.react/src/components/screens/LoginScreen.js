import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";       

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:10348/api/auth/login",
        { username:email, password },
        config
      );
      
      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">学生实验系统</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">学号:</label>
          <input
            type="text"
            required
            id="email"
            placeholder="输入你的学号"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            密码:
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="输入你的密码"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          登录
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
