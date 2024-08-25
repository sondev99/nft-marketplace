'use client';

import { Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaRegMoon, FaWallet } from 'react-icons/fa';
import { IoSunnyOutline } from 'react-icons/io5';

import images from '@/img';
import routes from '@/routes';
import { useUser } from '@/store/useUser';
import { useWeb3Store } from '@/store/web3Store';
import Image from 'next/image';
import SearchInput from '../Input/SearchInput';
import MaxWidthWrapper from '../MaxWidthWrapper';
import ProfileButton from '../ProfileButton';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import Navbar from './Navbar';
import { useEffect } from 'react';

export interface Navigation {
  href: string;
  label: string;
  icon: string;
  name: string;
}

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { connect, isConnected, walletAddress, disconnect } = useWeb3Store();
  const { userInfo, isLogined } = useUser();

  console.log('user', userInfo?.walletAddress);

  const { getCurrentUser } = useUser();

  useEffect(() => {
    getCurrentUser;
  }, []);

  const categories = [
    {
      label: 'All',
      href: '/',
    },
    {
      label: 'Art',
      href: 'art',
    },
    {
      label: 'Gamming',
      href: 'gamming',
    },
    {
      label: 'Memberships',
      href: 'memberships',
    },
    {
      label: 'PFPd',
      href: 'pfpd',
    },
    {
      label: 'Photography',
      href: 'photography',
    },
    {
      label: 'Music',
      href: 'mucsic',
    },
  ];

  return (
    <>
      <div className="sticky z-50 top-0 inset-x-0 dark:bg-[#111827] bg-white">
        <MaxWidthWrapper>
          <div className="relative  flex h-16 items-center justify-between w-full">
            <div className="flex items-center justify-between">
              <Sheet>
                <SheetTrigger>
                  <Menu className="h-6 lg:hidden w-6" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4">
                    {categories?.map((category, i) => (
                      <Link
                        key={i}
                        href={category.href}
                        className="block px-2 py-1 text-lg font-bold"
                      >
                        {category.label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
              <Link href="/" className="ml-4 lg:ml-0">
                <Image
                  src={images.logo}
                  alt="footer logo"
                  height={100}
                  width={100}
                />
              </Link>
            </div>

            <SearchInput />

            <div className="flex items-center gap-3">
              <div className="hidden md:flex h-full justify-center items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle Theme"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  <IoSunnyOutline className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <FaRegMoon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle Theme</span>
                </Button>
              </div>

              <div className="hidden md:flex h-full justify-center items-center">
                {isLogined && userInfo ? (
                  <>
                    {isConnected && walletAddress === userInfo.walletAddress ? (
                      <div className="hidden md:flex h-full justify-center items-center gap-2">
                        <Button
                          onClick={() => router.push(routes.upload)}
                          className="rounded-full"
                        >
                          <FaWallet />
                          <p className="ml-3">Create</p>
                        </Button>
                        <Separator orientation="vertical" className="h-10" />

                        <Button
                          variant="outline"
                          className="rounded-full"
                          onClick={() => disconnect()}
                        >
                          Disconnect
                        </Button>
                      </div>
                    ) : (
                      <>
                        {!userInfo.walletAddress ? (
                          <></>
                        ) : (
                          <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() => connect()}
                          >
                            Connect
                          </Button>
                        )}
                      </>
                    )}
                    <div className="ml-2">
                      <ProfileButton walletAddress={walletAddress} />
                    </div>
                  </>
                ) : (
                  <div className="hidden md:flex h-full justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => router.push(routes.register)}
                    >
                      Register
                    </Button>
                    <Button
                      onClick={() => router.push(routes.login)}
                      className="rounded-full"
                    >
                      <FaWallet />
                      <p className="ml-3">Login</p>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>

        {/* <div className=" hidden lg:block">
          <Navbar categories={categories} />
        </div> */}
      </div>
    </>
  );
};

export default Header;
