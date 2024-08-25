'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from './ui/button';
import { toast } from 'react-toastify';
import userApi from '@/apis/userApi';
import axiosClient from '@/axios/apiConfig';
import { API_URL_USER } from '@/constant/apiConstant';
import { CgSpinner } from 'react-icons/cg';

type ChangeProfileAvatarProps = {
  userInfo: any;
};

function ChangeProfileAvatar({ userInfo }: ChangeProfileAvatarProps) {
  console.log('userInfo: ', userInfo);
  const defaultAvatar = 'https://avatar.iran.liara.run/public/boy?username=Ash'; // Replace with your default image URL
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean | null>(false);
  const [preview, setPreview] = useState<string>(
    userInfo.avatarUrl ? userInfo.avatarUrl : defaultAvatar
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(defaultAvatar);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      toast.error('Please select an image file.');
      return;
    }

    // Handle the upload to a server or other logic here
    console.log('Uploading file:', selectedFile);

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      setIsLoading(true);
      const result = await axiosClient.put(
        `${API_URL_USER}/avatar/${userInfo.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setIsLoading(false);

      // Reset the form after submission
      setSelectedFile(null);
      setPreview(result.data ? result.data : defaultAvatar);
    } catch (error: any) {
      toast.error('' + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col gap-8">
      <h2 className="text-lg font-bold">Change Profile Avatar</h2>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col gap-8"
      >
        <div>
          <img
            src={preview}
            alt="Avatar Preview"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
        </div>
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <Button
          type="submit"
          className="w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {isLoading && (
            <span className="animate-spin">
              <CgSpinner />
            </span>
          )}
          {isLoading ? 'Loading...' : 'Update Avatar'}
        </Button>
      </form>
    </div>
  );
}

export default ChangeProfileAvatar;
