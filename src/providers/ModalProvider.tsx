"use client"

import ModalContext from "@/context/modalContext";
import {useContext, useEffect, useState} from 'react';
import ModalEventBus, {ModalEvent} from "@/events/modalEventBus";

export interface ModalProps {
  show: boolean;
  openModal: (component: any, props: any) => void;
  closeModal: () => void;
}

export const ModalProvider = ({ children }: {children: any}) => {
  const [modals, setModals] = useState([]);

  const openModal = (component: any, props = {}) => {
    // @ts-ignore
    setModals([...modals, { component, props }]);
  };

  const closeModal = () => {
    setModals(modals.slice(0, -1));
  };

  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      const { component, props } = event.detail;
      openModal(component, props);
    };

    ModalEventBus.subscribe(ModalEvent.OPEN_MODAL, handleOpenModal);

    return () => {
      ModalEventBus.subscribe(ModalEvent.OPEN_MODAL, handleOpenModal);
    };
  }, [modals]);

  useEffect(() => {
    const handleCloseModal = () => {
      closeModal();
    };

    ModalEventBus.subscribe(ModalEvent.CLOSE_MODAL, handleCloseModal);

    return () => {
      ModalEventBus.subscribe(ModalEvent.CLOSE_MODAL, handleCloseModal);
    };
  }, [modals]);

  return (
    // @ts-ignore
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modals.map((modal, index) => (
        <div key={index} className="modal">
          <modal.component
            {...modal.props}
            show={true}
            openModal={openModal}
            closeModal={closeModal}
          />
        </div>
      ))}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
