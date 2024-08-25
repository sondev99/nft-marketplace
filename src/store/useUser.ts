import userApi from '@/apis/userApi';
import { create } from 'zustand';

interface UserState {
  isLogined: boolean;
  userInfo: UserInfo | undefined;
  setIsLogined: (isLogined: boolean) => void;
  getCurrentUser: () => void;
  setCurrentUser: (userInfo: UserInfo | undefined) => void;
}

export const useUser = create<UserState>()((set) => ({
  isLogined: false,
  userInfo: undefined,
  getCurrentUser: async () => {
    const response = await userApi.getCurrentUser();
    if (response.code === 200) return set(() => ({ userInfo: response.data }));
  },
  setCurrentUser: (userInfo) => {
    return set(() => ({ userInfo }));
  },
  setIsLogined(isLogined) {
    return set(() => ({ isLogined }));
  },
}));
