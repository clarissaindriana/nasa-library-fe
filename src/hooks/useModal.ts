import { useState, useCallback } from 'react';

export interface Modal {
  isOpen: boolean;
  title?: string;
  message?: string;
}

export const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [modalData, setModalData] = useState<Modal>({ isOpen: initialState });

  const openModal = useCallback((title?: string, message?: string) => {
    setIsOpen(true);
    setModalData({ isOpen: true, title, message });
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalData({ isOpen: false });
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
    toggleModal,
  };
};

export default useModal;
