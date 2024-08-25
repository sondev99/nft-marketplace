import { useRouter } from 'next/navigation';
import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import Button from './Button';

type Props = {};

function BackButton({}: Props) {
  const router = useRouter();

  return (
    <Button onClick={() => router.push('/')}>
      <span className="flex items-center gap-1">
        <IoArrowBack />
        <span>Back to home</span>
      </span>
    </Button>
  );
}

export default BackButton;
