import {
  FieldValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { SIGN_IN_ERROR_MESSAGE, SIGN_UP_ERROR_MESSAGE } from './errorMessage';
import { formatBirth } from '../utils/formatBirth';
import { getDuplicateId, getDuplicateNickname } from '../apis/authAPI';
import { useMutation } from '@tanstack/react-query';

interface RegistersProps {
  register: UseFormRegister<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  setError?: UseFormSetError<FieldValues>;
}

export const loginRegisters = (register: UseFormRegister<FieldValues>) => {
  const registers = {
    id: register('id', {
      required: SIGN_IN_ERROR_MESSAGE.id,
    }),
    password: register('password', {
      required: SIGN_IN_ERROR_MESSAGE.password,
    }),
  };

  return registers;
};

export const SignupRegisters = ({
  register,
  watch,
  setValue,
  setError,
}: RegistersProps) => {
  const { mutate: checkIdMutation } = useMutation({
    mutationFn: (id: string) => getDuplicateId(id),
    onError: () => {
      if (setError) {
        setError('id', {
          message: SIGN_UP_ERROR_MESSAGE.idDuplicate,
        });
      }
    },
  });

  const { mutate: checkNickNameMutation } = useMutation({
    mutationFn: (nickname: string) => getDuplicateNickname(nickname),
    onError: () => {
      if (setError) {
        setError('nickname', {
          message: SIGN_UP_ERROR_MESSAGE.nicknameDuplicate,
        });
      }
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
      position: register('position'),
    };
  }

  const registers = {
    id: register('id', {
      onBlur: () => watch('id') !== '' && checkIdMutation(watch('id')),
      required: SIGN_UP_ERROR_MESSAGE.noId,
      minLength: { value: 6, message: SIGN_UP_ERROR_MESSAGE.idRegex },
      maxLength: { value: 12, message: SIGN_UP_ERROR_MESSAGE.idRegex },
      pattern: {
        value: /^[a-z0-9]+$/,
        message: SIGN_UP_ERROR_MESSAGE.idRegex,
      },
    }),
    password: register('password', {
      required: SIGN_UP_ERROR_MESSAGE.passwordRegex,
      minLength: { value: 8, message: SIGN_UP_ERROR_MESSAGE.passwordRegex },
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
      required: SIGN_UP_ERROR_MESSAGE.noName,
    }),
    birth: register('birth', {
      required: SIGN_UP_ERROR_MESSAGE.noBirth,
      onChange: (e) => {
        setValue('birth', formatBirth(e.target.value));
      },
    }),
    email: register('email', {
      required: SIGN_UP_ERROR_MESSAGE.noEmail,
      pattern: {
        value:
          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
        message: SIGN_UP_ERROR_MESSAGE.emailRegex,
      },
    }),
    nickname: register('nickname', {
      required: SIGN_UP_ERROR_MESSAGE.noNickname,
      onBlur: () =>
        watch('nickname') !== '' && checkNickNameMutation(watch('nickname')),
    }),
    position: register('position'),
  };

  return registers;
};

export const ideaRegisterRegisters = ({
  register,
  watch,
  setValue,
}: RegistersProps) => {
  if (!watch || !setValue) {
    return {
      title: register('title'),
      content: register('content'),
      specialization: register('specialization'),
      openMyProfile: register('openMyProfile'),
      price: register('price'),
      totalQuantity: register('totalQuantity'),
    };
  }

  const registers = {
    title: register('title', {
      // required: '제목 미입력',
    }),
    content: register('content', {
      // required: '내용 미입력',
    }),
    specialization: register('content', {
      // required: '분야 미입력',
    }),
    openMyProfile: register('openMyProfile'),
    name: register('name', {}),
    price: register('price', {
      // required: '가격 미입력',
      onChange(e) {
        setValue('price', e.target.value.replace(/[^0-9]/g, ''));
      },
    }),
    totalQuantity: register('totalQuantity', {
      // required: '가격 미입력',
    }),
  };

  return registers;
};
