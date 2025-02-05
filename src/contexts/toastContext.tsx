import { createContext, useState, PropsWithChildren } from 'react';
import { Toast } from '../components/common/toast/Toast';

const initValue = {
  errorToast: (text: string) => {},
  successToast: (text: string) => {},
  toast: (text: string) => {},
  closeToast: () => {},
};

export const ToastContext = createContext(initValue);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [isVisibleToast, setIsVisibleToast] = useState(false);
  const [text, setText] = useState('');
  const [toastType, setToastType] = useState<'error' | 'success' | 'default'>(
    'default',
  );

  const errorToast = (text: string) => {
    setText(text);
    setIsVisibleToast(true);
    setToastType('error');

    setTimeout(() => setIsVisibleToast(false), 3000);
  };

  const successToast = (text: string) => {
    setText(text);
    setIsVisibleToast(true);
    setToastType('success');
  };

  const toast = (text: string) => {
    setText(text);
    setIsVisibleToast(true);
    setToastType('default');
  };

  const closeToast = () => {
    setIsVisibleToast(false);
  };

  return (
    <ToastContext.Provider
      value={{ errorToast, successToast, toast, closeToast }}>
      {isVisibleToast && (
        <Toast
          text={text}
          type={toastType}
        />
      )}
      {children}
    </ToastContext.Provider>
  );
};
