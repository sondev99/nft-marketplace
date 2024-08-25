import React from 'react';
import classnames from 'classnames';
import { Input } from '../ui/input';

type Props = {
  innerRef?: React.LegacyRef<HTMLInputElement> | undefined;
  className?: string;
  rightLabel?: string;
};

function InputWeb3({ innerRef, className, rightLabel }: Props) {
  return (
    <div className="relative">
      <Input
        ref={innerRef}
        className={classnames(
          'border rounded py-3 outline-none px-3 focus:border-white w-full',
          className
        )}
      />

      {rightLabel && (
        <div className="absolute right-3 top-2">
          <span className="text-gray-700 dark:text-white font-semibold">
            {rightLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export default InputWeb3;
