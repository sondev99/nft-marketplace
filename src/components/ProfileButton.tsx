'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Cookies from 'js-cookie';

import { FaRegUser, FaRegImage, FaUserEdit } from 'react-icons/fa';
import { MdHelpCenter, MdManageAccounts } from 'react-icons/md';
import { HiOutlineLogout } from 'react-icons/hi';
import { SiGoogletagmanager } from 'react-icons/si';

import Link from 'next/link';
import { useUser } from '@/store/useUser';
import { useRouter } from 'next/navigation';
import { formatWalletAddress } from '@/lib/utils';
import routes from '@/routes';

interface ProfileProps {
  walletAddress: string | null;
}

const ProfileButton = ({ walletAddress }: ProfileProps) => {
  const { userInfo, setCurrentUser, setIsLogined } = useUser();

  const router = useRouter();
  const handleLogOut = () => {
    Cookies.remove('userInfo');
    Cookies.remove('refreshToken');
    Cookies.remove('accessToken');
    Cookies.remove('isLogined');
    setCurrentUser(undefined);

    setIsLogined(false);
  };

  console.log('userInfo', userInfo);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={userInfo?.avatarUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="py-7 px-6 grid grid-cols-1 gap-4"
      >
        <DropdownMenuLabel className="p-0 text-lg">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={userInfo?.imageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h4 className="font-semibold">{`${userInfo?.firstName} ${userInfo?.lastName}`}</h4>
              {walletAddress && (
                <p className="text-xs mt-0.5">
                  {formatWalletAddress(walletAddress)}
                </p>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div>
          <DropdownMenuItem className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2">
            <FaUserEdit size="24" />
            <Link href={{ pathname: '/my-profile' }}>
              <p className="text-base font-medium ml-4">Edit Profile</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2">
            <FaRegImage size="24" />
            <Link href={{ pathname: `/my-nft` }}>
              <p className="text-base font-medium ml-4">My Items</p>
            </Link>
          </DropdownMenuItem>
        </div>
        {userInfo?.role === 'ADMIN' && (
          <>
            <DropdownMenuItem className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2">
              <MdManageAccounts size="24" />
              {/* <FaUserEdit size="24" /> */}
              <Link href={{ pathname: '/admin' }}>
                <p className="text-base font-medium ml-4">Admin Management</p>
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <div>
          <DropdownMenuItem className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2">
            <MdHelpCenter size="24" />
            <Link href={{ pathname: '/my-profile' }}>
              <p className="text-base font-medium ml-4">Help</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 p-2"
            onClick={handleLogOut}
          >
            <HiOutlineLogout size="24" />
            <p className="text-base font-medium ml-4">Logout</p>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
