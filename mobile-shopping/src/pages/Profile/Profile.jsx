import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../redux/user/UserThunk';
import Logo from "../../assets/images/Logo.png";
import { Typography, Descriptions, Avatar, Spin, Alert } from 'antd';
import './Profile.css';

const { Title, Text } = Typography;

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token, profile, loading, error } = useSelector(
    (state) => state.user
  );
  console.log("Profile component rendered", profile);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    } else if (!profile) {
      dispatch(fetchUserProfile());
    }
  }, [token, profile, dispatch, navigate]);

    if(!token) {
        return (
        <div className="p-6 bg-white rounded-lg">
            <Title level={2}>Thông tin cá nhân</Title>
            <p className="text-lg mt-4 text-red-600">
            Vui lòng đăng nhập để xem thông tin cá nhân.
            </p>
        </div>
        );
    }

  return (
    <div className="relative overflow-x-auto sm:rounded-lg h-full">
      <div className="rounded-lg">
        <div className='profile-title text-2xl font-bold flex'>Profile</div>

        <div className="profile-content flex flex-col items-center gap-6 mb-6">
          <Avatar src={profile.image || Logo} size={90} alt="Avatar" />
          <div>
            <Title level={4} className="mb-0">
              {profile.firstName} {profile.lastName}
            </Title>
            <Text type="secondary">{profile.email}</Text>
          </div>

        <Descriptions className='profile-table' column={1} bordered size="medium">
          <Descriptions.Item className='font-medium' label="Họ">
            {profile.lastName || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item className='font-medium' label="Tên">
            {profile.firstName || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item className='font-medium' label="Giới tính">
            {profile.gender || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item className='font-medium' label="Địa chỉ nhà">
            {profile?.address?.address} {profile?.address?.city || "Chưa cập nhật"}
          </Descriptions.Item>
        </Descriptions>
        </div>
      </div>
    </div>
  );
};

export default Profile;