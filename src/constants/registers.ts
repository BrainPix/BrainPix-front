import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { SIGN_UP_ERROR_MESSAGE } from './errorMessage';
import { formatBirth } from '../utils/formatBirth';
import { getDuplicateNickname } from '../apis/auth';

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
      required: SIGN_UP_ERROR_MESSAGE.passwordRegex,
      minLength: { value: 8, message: SIGN_UP_ERROR_MESSAGE.passwordLength },
      maxLength: { value: 20, message: SIGN_UP_ERROR_MESSAGE.passwordLength },
      pattern: {
        value: /^(?=(.*[A-Za-z].*){1,})(?=(.*\d.*){1,}|(.*\W.*){1,}).+$/,
        message: SIGN_UP_ERROR_MESSAGE.passwordRegex,
      },
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
    email: register('email', {
      required: true,
      pattern: {
        value:
          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
        message: '올바른 이메일 형식이 아닙니다.',
      },
    }),
    nickname: register('nickname', {
      onBlur: async () => getDuplicateNickname(watch('nickname')),
    }),
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
