import { useState, useEffect } from "react";
import "./LoginScreen.css";     
const InputScreen = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  

  
    
  
    return (
      <div className="login-screen">
        <form  className="login-screen__form">
          <h3 className="login-screen__title">实例配置信息</h3>
          {error && <span className="error-message">{error}</span>}
          <div className="form-group">
            <label htmlFor="email">实例名称:</label>
            <input
              type="text"
              required
              id="labName"
              placeholder="实例名称"
              tabIndex={1}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            确定创建实例
          </button>
        </form>
      </div>
    );
  };
  
  export default InputScreen;