import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { SIGN_UP_ERROR_MESSAGE } from './errorMessage';
import { formatBirth } from '../utils/formatBirth';

interface RegistersProps {
  register: UseFormRegister<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
}

export const loginRegisters = (register: UseFormRegister<FieldValues>) => {
  const registers = {
    id: register('id'),
    password: register('password'),
  };

  return registers;
};

export const IndividualMemberRegisters = ({
  register,
  watch,
  setValue,
}: RegistersProps) => {
  if (!watch || !setValue) {
    return {
      id: register('id'),
      password: register('password'),
      passwordCheck: register('passwordCheck'),
      name: register('name'),
      birth: register('birth'),
      email: register('email'),
      nickname: register('nickname'),
    };
  }
  const registers = {
    id: register('id', {
      required: SIGN_UP_ERROR_MESSAGE.id,
      minLength: { value: 6, message: SIGN_UP_ERROR_MESSAGE.id },
      maxLength: { value: 12, message: SIGN_UP_ERROR_MESSAGE.id },
      pattern: {
        value: /^[a-z0-9]+$/,
        message: SIGN_UP_ERROR_MESSAGE.id,
      },
    }),
    password: register('password', {
      minLength: { value: 8, message: SIGN_UP_ERROR_MESSAGE.passwordLength },
      maxLength: { value: 20, message: SIGN_UP_ERROR_MESSAGE.passwordLength },
    }),
    passwordCheck: register('passwordCheck', {
      validate: (value) => {
        if (watch('password') !== value) {
          return SIGN_UP_ERROR_MESSAGE.passwordCheck;
        }
        return true;
      },
    }),
    name: register('name'),
    birth: register('birth', {
      onChange: (e) => {
        setValue('birth', formatBirth(e.target.value));
      },
    }),
    email: register('email'),
    nickname: register('nickname'),
  };

  return registers;
};

export const CorporateMemberRegisters = ({
  register,
  setValue,
}: RegistersProps) => {
  if (!setValue) {
    return {
      id: register('id'),
      password: register('password'),
      passwordCheck: register('passwordCheck'),
      name: register('name'),
      companyName: register('companyName'),
      birth: register('birth'),
      email: register('email'),
      position: register('position'),
    };
  }
  const registers = {
    id: register('id'),
    password: register('password'),
    passwordCheck: register('passwordCheck'),
    name: register('name'),
    companyName: register('companyName'),
    birth: register('birth', {
      onChange: (e) => {
        setValue('birth', formatBirth(e.target.value));
      },
    }),
    email: register('email'),
    position: register('position'),
  };

  return registers;
};
