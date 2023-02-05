import { Avatar, Col, Dropdown, message, Row, Select, Space, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import { HistoryOutlined } from '@ant-design/icons';
import MainLayout from "../../layouts/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { getARepo, getRepoContent, getRepoContribution } from "../../apis/Oct";
import axios from "axios";



function showMessage(type, content) {
  switch (type) {
    case 'success':
      message.success(content);
      break;
    case 'error':
      message.error(content);
      break;
    case 'warning':
      message.warning(content);
      break;
    case 'info':
      message.info(content);
      break;
    default:
      break;
  }
}
const getColor = (language) => {
  console.log('language :>> ', typeof (language));
  let value = 0;
  for (let i = 0; i < language.length; i++) {
    value += language.charCodeAt(i);
  }
  const hue = value % 360;
  return `hsl(${hue}, 100%, 30%)`;
};

export default function Repo(props) {
  const [repoData, setRepoData] = useState({});
  const [contribution, setContribution] = useState(null);
  const [repoContent, setRepoContent] = useState(null);
  const [readme, setReadme] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const reponame = useParams().name;

  const user_reponame = useParams().user;
  const user = localStorage.getItem('user') ? localStorage.getItem('user') : 'huyenkvg';

  const clickHandler = (type, record) => {
    console.log('type :>> ', type);
    console.log('record :>> ', record);
    switch (type) {
      case 'EDIT':
      case 'DELETE':
      default:
        break;
    }
  }
  const getReadme = (item) => {
    axios.get(item.download_url).then(res => {
      console.log('res :>> ', res);
      setReadme(<>{res.data}</>);
      return res.data;
    })
  }


  useEffect(() => {
    setLoading(true);
    getARepo(user_reponame, reponame).then(res => {
      if (res.status === 200) {
        setRepoData(res.data);
        getRepoContent(user_reponame, reponame).then(res => {
          console.log('res :>> ', res);
          if (res.status === 200) {
            setRepoContent(res.data);
          }
        })
        getRepoContribution(user_reponame, reponame).then(res => {
          if (res.status === 200) {
            setContribution(res.data[0]);
          }
        }
        )
      }
    }).finally(() => {
      setLoading(false);
    })
  }, [])
  return (
    <MainLayout  >
      <Spin spinning={loading}>
        {repoData?.name &&
          < Col span={24} style={{ background: "#000002", borderRadius: '10px', padding: '10px' }} >
            <Row justify="space-between" style={{ marginLeft: 20, color: '#185adb' }}>
              <Col span={2}>
                <Space >   <Avatar size={44} style={{ marginTop: 10 }} src={repoData.owner.avatar_url} />

                  <h4>{user_reponame}</h4>
                </Space>
              </Col>
              <Col span={5} style={{ textAlign: 'left', color: '#dcefb7' }}>
                <h3>{repoData.name}</h3>
              </Col>
              <Space>
                <Tag color={getColor(repoData.language)}>{repoData.language}</Tag>
                <Tag color="blue">{repoData.stargazers_count} star</Tag>
                <Tag color="green">{repoData.forks_count} fork</Tag>
                <Tag color="red">{repoData.open_issues_count}</Tag>
              </Space>
            </Row>
            {contribution &&
              <Row justify="space-between" align="middle" style={{ marginBottom: 20, marginLeft: 20, padding: '5px', fontWeight: "lighter", fontSize: '14px', color: '#fff' }}>
                <Space>
                  <Tag color="grey"><HistoryOutlined />  {contribution?.contributions} commits</Tag>
                  Branch: {repoData?.default_branch}
                </Space>
              </Row>
            }
            <Row justify="space-between" align="middle" style={{ marginBottom: 20, padding: '5px', fontWeight: "lighter", fontSize: '14px', color: '#fff' }}>
              <p>
                Description: {repoData.description}

              </p>
            </Row>
            <Row justify="space-between" align="middle" style={{ marginBottom: 20, padding: '5px', fontWeight: "lighter", fontSize: '14px', color: '#fff' }}>
              {repoContent &&
                <>
                  {repoContent.map((item, index) => {
                    if (item.name === 'README.md') {
                      getReadme(item);
                    }
                    return (
                      <Col span={24} key={index}>
                        <Row justify="space-between" align="middle" style={{ marginBottom: 3, paddingLeft: '5px', fontWeight: "lighter", fontSize: '14px', color: '#fff', borderRadius: '3px', background: '#222' }}>
                          <p>
                            {item.name}
                          </p>
                          <p>
                            {item.size} kb
                          </p>
                          {
                            item.name === 'README.md' &&
                            <p>
                              {readme}
                            </p>
                          }
                        </Row>
                      </Col>
                    )
                  })

                  }


                </>
              }
            </Row>



          </Col>
        }
      </Spin>
    </MainLayout >
  )
}