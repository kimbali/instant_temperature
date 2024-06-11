import { InputProps } from '~/utils/types';

export function Input({
  name,
  type,
  label,
  placeholder = '',
  autoComplete = '',
  required,
}: InputProps) {
  return (
    <div className='md:flex md:items-center mb-6'>
      <div className='md:w-1/3'>
        <label
          htmlFor={name}
          className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
        >
          {label}
        </label>
      </div>
      <div className='md:w-2/3'>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-500'
          required={required}
        />
      </div>
    </div>
  );
}
