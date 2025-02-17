import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCollaborationSupport = () => {
  const [selectedSupport, setSelectedSupport] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleSupportSelection = (id: number) => {
    setSelectedSupport(id === selectedSupport ? null : id);
  };

  const toggleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  return {
    selectedSupport,
    setSelectedSupport,
    message,
    setMessage,
    isChecked,
    toggleCheckbox,
    navigate,
    handleSupportSelection,
  };
};
