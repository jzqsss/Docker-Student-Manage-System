import { useState, useEffect } from "react";
import { useHistory} from "react-router-dom";
import axios from "axios";
import "./PrivateScreen.css";
import { Link } from "react-router-dom";

import { Table, Tag, Space, Button , Radio} from "antd";
import 'antd/dist/antd.css';
import { post } from "superagent";








const PrivateScreen = () => {

  
  const [error, setError] = useState("");
  const [data1, setData1] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();
  const [page, setPage] = useState('image');
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

  const handleLibrary=(value) => {
    setPage(value);
    switch(value){
      case 'image':{history.push('/');break;}
      case 'container':{history.push('/container');break;}
      default : break;
    }

    


  }
  const columns = [
    { title: '????????????', dataIndex: 'name', key: 'age' },
    { title: 'URL ???image???', dataIndex: 'image_url', key: 'url' },
    {
      title: '??????',
      dataIndex: '',
      key: 'x',
      render: (object) => {
        let name = "hello world";

        return (
          <div>
            <a onClick={() => { selectHandler(object); } }>????????????</a>
          </div>
        );
      },
    },
  ];
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    

    
    <div>
      <div className="information">????????????:{username}</div>
      
      {/* <button onClick={handleImageLibrary}>?????????</button> */}
      <div className="select">
      <Radio.Group value={page} onChange={(e) => handleLibrary(e.target.value)}>
        <Radio.Button value="image" >?????????</Radio.Button>
        <Radio.Button value="container">????????????</Radio.Button>
      </Radio.Group>
      </div>
      
      {/* <button onClick={handleContainerLibrary}>????????????</button> */}
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={data1}
      />
      <Button className="logout" onClick={handleLogout}>logout</Button>
    </div>
    
  
      
    // <div style={{ background:'green', color:'white' }}>
    //   {privateData}
      
    //   <button onClick={handleLogout}>logout</button>
    // </div>
  );
};

export default PrivateScreen;
