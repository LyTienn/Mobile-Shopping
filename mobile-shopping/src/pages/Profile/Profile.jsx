import { useState } from 'react';
import { DownOutlined, CalendarOutlined } from '@ant-design/icons';
import { DatePicker, Dropdown, Menu } from 'antd';
import moment from 'moment';
import './Profile.css';

const sexOptions = [
    { label: 'Male', key: 'Male' },
    { label: 'Female', key: 'Female' },
    { label: 'Other', key: 'Other' }
];

const Profile = ({ collapsed }) => {
    const [profile, setProfile] = useState({
        dob: '2018-01-01',
        sex: 'Male',
        company: '15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi',
        home: '15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi',
        email: 'user@gmail.com',
        name: 'MR. USER'
    });
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setProfile(prev => ({ ...prev, [name]: value }));
    // }
    const handleDateChange = (date, dateString) => {
    setProfile(prev => ({ ...prev, dob: dateString }));
    };
    const dateValue = profile.dob ? moment(profile.dob, 'YYYY-MM-DD') : null;

    const handleSexChange = ({ key }) => {
        setProfile(prev => ({ ...prev, sex: key }));
    };
    const sexMenu = {
        items: sexOptions,
        onClick: handleSexChange,
    };
    return (
        <div className={`profile-page${collapsed ? ' collapsed' : ''}`}>
            <div className="profile-header">
                <div className="profile-title h2">My Profile</div>
            </div>
            <div className="profile-content">
                <div className="profile-detail-container">
                    <div className="profile-avatar-block">
                        <div className="profile-avatar-row">
                            <label style={{ cursor: 'pointer' }}>
                                {/* <img
                                    className="profile-avatar"
                                    src={avatar}
                                    alt="avatar"
                                /> */}
                                {/* <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleAvatarChange}
                                /> */}
                            </label>
                            <div className="profile-main-info">
                                <div className="profile-name h2">{profile.name}</div>
                                <div className="profile-email p2-r">{profile.email}</div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-info-col">
                        <div className="profile-info-table p2-r">
                            <div className="profile-info-row">
                                <span className="profile-info-label">Date of birth:</span>
                                <span className="profile-info-value" style={{ display: 'flex', alignItems: 'center' }}>
                                    <DatePicker
                                        value={dateValue}
                                        onChange={handleDateChange}
                                        style={{ borderRadius: 4, fontSize: '1rem' }}
                                        suffixIcon={<CalendarOutlined />}
                                        format="YYYY-MM-DD"
                                    />
                                    </span>
                            </div>
                            <div className="profile-info-row">
                                <span className="profile-info-label">Sex:</span>
                                <span className="profile-info-value">
                                    {profile.sex} 
                                    <Dropdown menu={sexMenu} trigger={['click']}>
                                        <DownOutlined style={{ marginLeft: 8, cursor: 'pointer' }} />
                                    </Dropdown>
                                </span>
                            </div>
                            <div className="profile-info-row">
                                <span className="profile-info-label">Address Company:</span>
                                <span className="profile-info-value">
                                    {profile.company}
                                </span>
                            </div>
                            <div className="profile-info-row">
                                <span className="profile-info-label">Address Home:</span>
                                <span className="profile-info-value profile-info-value-underline">
                                    {profile.home}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;