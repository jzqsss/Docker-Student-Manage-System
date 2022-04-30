import { useState, useEffect } from "react";
import { useHistory} from "react-router-dom";
import axios from "axios";
import "./ContainerScreen.css";
import { Link } from "react-router-dom";
import user from "../forms/containers";
import { Table, Tag, Space } from "antd";
import 'antd/dist/antd.css';
import { post } from "superagent";








const ContainerScreen = () => {

  
  const [error, setError] = useState("");
  const [data1, setData1] = useState("");
  const [privateData, setPrivateData] = useState("");
  const history = useHistory();


  const handleLogout = () => {
    localStorage.removeItem('authToken');
    history.push('/login')
  }
  const handleImageLibrary = () => {
    history.push('/')
  }
  const handleContainerLibrary = () => {
    history.push('/container')
  }
  
  return (
    
    <div>
      <button onClick={handleImageLibrary}>镜像库</button>
      <button onClick={handleContainerLibrary}>我的实验</button>
      
    <button onClick={handleLogout}>logout</button>
    </div>
    
  
    
  );
};

export default ContainerScreen;
