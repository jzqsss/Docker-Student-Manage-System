import { useState, useEffect } from "react";
import { useHistory} from "react-router-dom";
import axios from "axios";
import "./ContainerScreen.css";
import { Link } from "react-router-dom";

import { Table, Tag, Space ,Button , Radio} from "antd";
import 'antd/dist/antd.css';
import { post } from "superagent";








const ContainerScreen = () => {

  
  const [error, setError] = useState("");
  const [data1, setData1] = useState("");
  const [username, setUsername] = useState("");
  const [page, setPage] = useState('container');
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
        setUsername(data.username);
        
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };
    fetchPrivateDate();
  }, []);
  useEffect(() => {
    const display_data = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
          console.log("11");
         const res = await axios.post("http://localhost:10348/api/auth/container",config);
         const newData=res.data.map(item=>{return {key:item._id,...item}})
         setData1(newData);
         //console.log("newData:",newData);
      } catch (error) {
        localStorage.removeItem("authToken");
        history.push('/login');
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
  const handleLibrary=(value) => {
    setPage(value);
    switch(value){
      case 'image':{history.push('/');break;}
      case 'container':{history.push('/container');break;}
      default : break;
    }
  }
  const startHandler = async (object) => {
    console.log("11");
    try{
      //console.log(object);
        axios.post(
        "http://localhost:10348/api/auth/start",
        {
          container_id :object.container_id
        }
      )
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const start = await axios.post("http://localhost:10348/api/auth/container",config);
      const newData=start.data.map(item=>{return {key:item._id,...item}})
      setData1(newData);

    }catch (error) {
      setError("container stop failed ");
    }
  }
  const stopHandler = async (object) => {  
    try{
      //console.log(object);
        axios.post(
        "http://localhost:10348/api/auth/stop",
        {
          container_id :object.container_id
        }
      )
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const stop = await axios.post("http://localhost:10348/api/auth/container",config);
      const newData=stop.data.map(item=>{return {key:item._id,...item}})
      setData1(newData);

    }catch (error) {
      setError("container stop failed ");
    }
  }
  const suspandHandler = async (object) => {  
    try{
      //console.log(object);
        axios.post(
        "http://localhost:10348/api/auth/suspand",
        {
          container_id :object.container_id
        }
      )
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const suspand = await axios.post("http://localhost:10348/api/auth/container",config);
      const newData=suspand.data.map(item=>{return {key:item._id,...item}})
      setData1(newData);

    }catch (error) {
      setError("container suspand failed ");
    }
  }
  const unsuspandHandler = async (object) => {  
    try{
      //console.log(object);
        axios.post(
        "http://localhost:10348/api/auth/unsuspand",
        {
          container_id :object.container_id
        }
      )
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const unsuspand = await axios.post("http://localhost:10348/api/auth/container",config);
      const newData=unsuspand.data.map(item=>{return {key:item._id,...item}})
      setData1(newData);

    }catch (error) {
      setError("container unsuspand failed ");
    }
  }
  const removeHandler = async (object) => {  
    try{
      //console.log(object);
        axios.post(
        "http://localhost:10348/api/auth/remove",
        {
          container_id :object.container_id
        }
      )
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const remove = await axios.post("http://localhost:10348/api/auth/container",config);
      const newData=remove.data.map(item=>{return {key:item._id,...item}})
      setData1(newData);

    }catch (error) {
      setError("container stop failed ");
    }
  }
  const columns = [
    { title: '????????????', dataIndex: 'container_name', key: 'age' },
    { title: '????????????', dataIndex: 'image_url', key: 'url' },
    { title: '????????????', dataIndex: 'container_status', key: 'status' },
    {
      title: '??????',
      dataIndex: '',
      key: 'x',
      render: (object) => {
        return (
          <div>
            <a onClick={() => { startHandler(object); } }>??????</a>
            &nbsp;&nbsp;
            <a onClick={() => { stopHandler(object); } }>??????</a>
            &nbsp;&nbsp;
            <a onClick={() => { suspandHandler(object); } }>??????</a>
            &nbsp;&nbsp;
            <a onClick={() => { unsuspandHandler(object); } }>????????????</a>
            &nbsp;&nbsp;
            <a onClick={() => { removeHandler(object); } }>??????</a>
          </div>
        );
      },
    },
  ];


  const jumpTo = ()=> {
    const w = window.open('_black') //????????????????????????
    let url = 'http://localhost:3658/ssh/host/127.0.0.1'
    w.location.href = url //????????????????????????
  }

  return (
    
    <div>
      <div className="information">????????????:{username}</div>
      <div className="select">
      <Radio.Group  value={page} onChange={(e) => handleLibrary(e.target.value)}>
        <Radio.Button value="image" >?????????</Radio.Button>
        <Radio.Button value="container">????????????</Radio.Button>
      </Radio.Group> 
      </div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={data1}
      />   

       

        <Button className="logout" onClick={handleLogout}>logout</Button>

      <Button className="connect" onClick={()=>{jumpTo()}}>???????????????</Button>
    </div>
    
  
    
  );
};

export default ContainerScreen;
