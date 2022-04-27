import { useState, useEffect } from "react";
import { useHistory} from "react-router-dom";
import axios from "axios";
import "./PrivateScreen.css";
import user from "../forms/containers";
import { Table, Tag, Space } from "antd";
import 'antd/dist/antd.css';

const columns = [
  { title: '镜像序号', dataIndex: 'name', key: 'name' },
  { title: '镜像名称', dataIndex: 'age', key: 'age' },
  { title: 'URL （image）', dataIndex: 'address', key: 'address' },
  {
    title: '备注',
    dataIndex: '',
    key: 'x',
    render: () => <a>创建实例</a>,
  },
];

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];




const PrivateScreen = () => {
  const [error, setError] = useState("");
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
        const { data } = await axios.get("http://localhost:10348/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    history.push('/login')
  }

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    
        
    <Table
    columns={columns}
    expandable={{
      expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
      rowExpandable: record => record.name !== 'Not Expandable',
    }}
    dataSource={data}
  />
      
    // <div style={{ background:'green', color:'white' }}>
    //   {privateData}
      
    //   <button onClick={handleLogout}>logout</button>
    // </div>
  );
};

export default PrivateScreen;
