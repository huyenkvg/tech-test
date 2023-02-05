import { Avatar, Col, Dropdown, Menu, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom"; import {
  TeamOutlined,
  UserOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
// import { useDispatch } from "react-redux";

export default function UserMenu() {
  const [visible, setVisible] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('user'));
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const history = unstable_HistoryRouter();
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('user'));
    // setUser(user);
  }, []);
  const handleLogout = () => {
    localStorage.clear();

    // dispatch(logout())
    navigate('/login');
  };
  const menu = (
    <Menu>
      {user ? <>
        <Menu.Item key="3" onClick={handleLogout}>
          Đăng xuất
        </Menu.Item></> :
        <Menu.Item key="2" onClick={()=> navigate('/login')}>
          <>Đăng nhập</>
        </Menu.Item>
      }
    </Menu>

  );
  return (
    <div style={{ display: 'flex', textAlign: 'right', justifyContent: 'end', paddingRight: '20px' }}>
      <Dropdown overlay={menu} trigger={['click']}>
        <a
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
          style={{ color: 'white', display: 'flex', alignItems: 'center' }}
        >

          <Space>
            {/* <Col>{user.username} </Col> */}
            <Col>
              <Avatar
                style={{
                  backgroundColor: user?.username ? '#f56a00' : '#000'
                }}
                icon={user ?<><UserOutlined /> </>: <EllipsisOutlined />}
              /> {user}</Col>
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}