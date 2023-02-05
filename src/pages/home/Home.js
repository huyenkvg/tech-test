import { Col, Dropdown, message, Row, Select, Space, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import TableX from "../../components/table/Table";
import MainLayout from "../../layouts/MainLayout";
import { getListRepos } from "../../apis/Oct";
import SearchBar from "../../components/search/SearchBar";
import { Option } from "antd/es/mentions";
import { useNavigate } from "react-router-dom";



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
  // console.log('hue :>> ', hue);
  return `hsl(${hue}, 100%, 30%)`;
};

export default function Home(props) {
  const [repoData, setRepoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({ search: '', page: 1, per_page: 100, type: 'all' });
  const user = localStorage.getItem('user') ? localStorage.getItem('user') : 'huyenkvg';

  const clickHandler = (type, record) => {
    console.log('type :>> ', type);
    console.log('record :>> ', record);
    switch (type) {
      case 'VIEW':
        navigate(`/${record.full_name}`);
        break;
      case 'EDIT':
      case 'DELETE':
      default:
        break;
    }
  }



  const repo_headers = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Space size="large">
          <a onClick={e => clickHandler("VIEW", record)}>{record.name}</a>
        </Space>
      )
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      render: (_, { language }) => (
        <>
          <Tag color={getColor(language + '')}>{language}</Tag>
        </>
      ),
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Updated at",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Pushed at",
      dataIndex: "pushed_at",
      key: "pushed_at",
    },
    // {
    //   title: "Size",
    //   dataIndex: "size",
    //   key: "size",
    // },
  ];

  useEffect(() => {
    setLoading(true);
    getListRepos(user, filter).then((res) => {
      setRepoData(res.data);
    }).catch((err) => {
      showMessage('error', 'Something went wrong');
    }).finally(() => {
      setLoading(false);
    })
  }, [])

  useEffect(() => {
    setLoading(true);
    getListRepos(user, filter).then((res) => {
      setRepoData(res.data);
    }).catch((err) => {
      showMessage('error', 'Something went wrong');
    }).finally(() => {
      setLoading(false);
    })
  }, [filter])
  return (
    <MainLayout >
      <Spin spinning={loading} >
        <Row className="search-bar">
          <Space>
            <SearchBar onSearching={e => { setFilter({ ...filter, search: e }) }} label="Search..." />
            <Select
              placeholder="Select a type"
              onChange={e => {
                console.log('e :>> ', e);
                setFilter({ ...filter, type: e })
              }}

            >
              <Option value="all">All</Option>
              <Option value="owner">Owner</Option>
              <Option value="member">Member</Option>
            </Select>
          </Space>
        </Row>
        <Col span={24} >
          <TableX columns={repo_headers} data={repoData} />
        </Col>
      </Spin>
    </MainLayout>
  )
}