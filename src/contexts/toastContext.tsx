import { createContext, useState, PropsWithChildren } from 'react';
import { Toast } from '../components/common/toast/Toast';

const initValue = {
  errorToast: (_text: string) => {},
  successToast: (_text: string) => {},
  toast: (_text: string) => {},
  closeToast: () => {},
};

export const ToastContext = createContext(initValue);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [isVisibleToast, setIsVisibleToast] = useState(false);
  const [text, setText] = useState('');
  const [toastType, setToastType] = useState<'error' | 'success' | 'default'>(
    'default',
  );

  const commonToast = (text: string) => {
    setText(text);
    setIsVisibleToast(true);
    setTimeout(() => setIsVisibleToast(false), 3000);
  };

  const errorToast = (text: string) => {
    setToastType('error');
    commonToast(text);
  };

  const successToast = (text: string) => {
    setToastType('success');
    commonToast(text);
  };

  const toast = (text: string) => {
    setToastType('default');
    commonToast(text);
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
