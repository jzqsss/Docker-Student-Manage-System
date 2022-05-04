import { useState, useEffect } from "react";
import { useHistory,useLocation} from "react-router-dom";
import "./LoginScreen.css";  
import axios from "axios";   
import PrivateScreen from "./PrivateScreen";
const InputScreen = () => {
    const [lab, setLab] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    const location = useLocation();
    const [privateData, setPrivateData] = useState("");
    useEffect(() => { 
      const fetchPrivateDate = async () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
  
        try {
          const { data } = await axios.get("http://localhost:10348/api/auth/private", config);
          setPrivateData(data);
        } catch (error) {
          localStorage.removeItem("authToken");
          setError("You are not authorized please login");
        }
      };
      fetchPrivateDate();
    }, []);

    const inputHandler = async (e) => {
        try{
          const res =  axios.post(
            "http://localhost:10348/api/auth/run",
            {
              lab :lab,
              image_url:location.state,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          )
          history.push("/");
        }catch(error){
          setError("start容器失败");
        }
      
    }
    useEffect(() => {
        console.log("history",location.state);
    }, [])
    
  
    return (
      <div className="login-screen">
        <form  onSubmit={inputHandler}className="login-screen__form">
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
              onChange={(e) => setLab(e.target.value)}
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