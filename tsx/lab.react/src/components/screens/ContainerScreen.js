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

  useEffect(() => {
    const display_data = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
         const res = await axios.post("http://localhost:10348/api/auth/container",config);
         const newData=res.data.map(item=>{return {key:item._id,...item}})
         setData1(newData);
         //console.log("newData:",newData);
      } catch (error) {

        setError("accquire data error");
      }
    };

    display_data();
  }, []);
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
  const selectHandler = async (object) => {
  }
  const columns = [
    { title: '实验名称', dataIndex: 'container_name', key: 'age' },
    { title: '镜像名称', dataIndex: 'image_url', key: 'url' },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (object) => {
        let name = "hello world";

        return (
          <div>
            <a onClick={() => { selectHandler(object); } }>创建实例</a>
            &nbsp;&nbsp; {name}
            <a onClick={() => { selectHandler(object); } }>Start</a>
            &nbsp;&nbsp;
            <a onClick={() => { selectHandler(object); } }>Stop</a>
            &nbsp;&nbsp;
            <a onClick={() => { selectHandler(object); } }>Remove</a>
          </div>
        );
      },
    },
  ];

  return (
    
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
    
  
    
  );
};

export default ContainerScreen;
