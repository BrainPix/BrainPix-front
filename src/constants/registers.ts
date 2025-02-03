import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { SIGN_UP_ERROR_MESSAGE } from './errorMessage';
import { formatBirth } from '../utils/formatBirth';
import { getDuplicateId, getDuplicateNickname } from '../apis/auth';
import { useMutation } from '@tanstack/react-query';

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
  const { mutate: checkIdMutation } = useMutation({
    mutationFn: (email: string) => getDuplicateId(email),
    onSuccess: (response) => {
      console.log(response);
    },
  });

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
      onBlur: () => checkIdMutation(watch('id')),
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
    name: register('name', {
      required: SIGN_UP_ERROR_MESSAGE.name,
    }),
    birth: register('birth', {
      required: SIGN_UP_ERROR_MESSAGE.birth,
      onChange: (e) => {
        setValue('birth', formatBirth(e.target.value));
      },
    }),
    email: register('email', {
      required: SIGN_UP_ERROR_MESSAGE.email,
      pattern: {
        value:
          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
        message: SIGN_UP_ERROR_MESSAGE.emailRegex,
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
