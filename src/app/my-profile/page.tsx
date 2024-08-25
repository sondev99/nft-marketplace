'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import Link from 'next/link';
import FileInput from '@/components/Input/FileInput';
import { useWeb3Store } from '@/store/web3Store';
import { useUser } from '@/store/useUser';
import userApi from '@/apis/userApi';
import { handleErrorApi } from '@/lib/utils';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import ChangeProfileAvatar from '@/components/ChangeProfileAvatar';

type Props = {};

const MyProfilePage = (props: Props) => {
  const { setCurrentUser } = useUser();

  const userInfo = JSON.parse(Cookies.get('userInfo'));
  console.log(userInfo);
  const form = useForm({
    defaultValues: {
      firstName: userInfo?.firstName,
      lastName: userInfo?.lastName,
      email: userInfo?.email,
      phone: userInfo?.phone,
      walletAddress: userInfo?.walletAddress,
    },
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: any) {
    console.log('value: ' + { ...values });
    if (loading) return;
    setLoading(true);
    try {
      const response = await userApi.updateUser(userInfo?.id, values);
      console.log(response.data.userInfo);

      if (response.code === 200) {
        const response = await userApi.getCurrentUser();
        if (response.code !== 401) {
          setCurrentUser(response.data);
          Cookies.set('userInfo', JSON.stringify(response.data));
          const userInfoCookie = Cookies.get('userInfo');

          if (userInfoCookie !== undefined) {
            const userInfo = JSON.parse(userInfoCookie);
            setCurrentUser(userInfo);
          } else {
            console.error('userInfo cookie is undefined');
          }
        }
        toast.success(response.message);
        window.location.reload();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  }
  console.log(userInfo);

  return (
    <>
      <MaxWidthWrapper>
        <h1 className="text-center my-10 text-4xl font-semibold">
          Edit your profile
        </h1>
        <div className="grid grid-cols-2 gap-10">
          <div className="w-full">
            <Form {...form}>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
              >
                <div className="flex justify-between gap-5">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input type="firstName" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input type="lastName" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-between gap-5">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input type="phone" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <FormField
                      control={form.control}
                      name="walletAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Wallet Address</FormLabel>
                          <FormControl>
                            <Input type="walletAddress" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {loading && (
                    <span className="animate-spin">
                      <CgSpinner />
                    </span>
                  )}
                  {loading ? 'Loading...' : 'Save'}
                </Button>
              </form>
            </Form>
          </div>

          <div className="flex justify-center items-center">
            <ChangeProfileAvatar userInfo={userInfo} />
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default MyProfilePage;
