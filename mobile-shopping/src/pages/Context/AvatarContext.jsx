import { createContext, useState } from 'react';
import DefaultAvatar from '../../assets/images/avatar.png';

export const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
    const [avatar, setAvatar] = useState(DefaultAvatar);
    return (
        <AvatarContext.Provider value={{ avatar, setAvatar }}>
            {children}
        </AvatarContext.Provider>
    );
};