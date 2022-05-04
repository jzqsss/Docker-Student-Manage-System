import { useState, useEffect } from "react";
import { useHistory} from "react-router-dom";
import axios from "axios";
import "./PrivateScreen.css";
import { Link } from "react-router-dom";
import user from "../forms/containers";
import { Table, Tag, Space } from "antd";
import 'antd/dist/antd.css';
import { post } from "superagent";








const PrivateScreen = () => {

  
  const [error, setError] = useState("");
  const [data1, setData1] = useState("");
  const [privateData, setPrivateData] = useState("");
  const history = useHistory();

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

  useEffect(() => {
    const display_data = async () => {
      try {
         const res = await axios.post("http://localhost:10348/api/auth/image");
         const newData=res.data.map(item=>{return {key:item._id,...item}})
         setData1(newData);
         //console.log("newData:",newData);
      } catch (error) {

        setError("accquire data ");
      }
    };

    display_data();
  }, []);
  const selectHandler = async (object) => {
    console.log(object.image_url);

    try{
      
      history.push("/input",object.image_url);

      


    }catch (error) {
      setError("send failed ");
    }

    

  };
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
  const columns = [
    { title: '镜像名称', dataIndex: 'name', key: 'age' },
    { title: 'URL （image）', dataIndex: 'image_url', key: 'url' },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (object) => {
        let name = "hello world";

        return (
          <div>
            <a onClick={() => { selectHandler(object); } }>创建实例</a>
          </div>
        );
      },
    },
  ];
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    
    <div>
      <button onClick={handleImageLibrary}>镜像库</button>
      <button onClick={handleContainerLibrary}>我的实验</button>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={data1}
      />
      <button onClick={handleLogout}>logout</button>
    </div>
    
  
      
    // <div style={{ background:'green', color:'white' }}>
    //   {privateData}
      
    //   <button onClick={handleLogout}>logout</button>
    // </div>
  );
};

export default PrivateScreen;
