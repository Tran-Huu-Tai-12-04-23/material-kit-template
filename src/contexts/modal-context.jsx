/* eslint-disable import/no-cycle */
import {
  createContext,
  useContext,
  useMemo,
  useState
} from "react";
import ModalCustom from "src/components/modal";

const ModalContext = createContext({
  hideModal: () => {},
  openModal: () => {},
});

const ModalProvider = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const [content, setContent] = useState(null);

  const openModal = (modalInfo) => {
    setVisible(true);
    setContent(modalInfo);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const value = useMemo(
    () => ({
      hideModal,
      openModal,
    }),
    [hideModal, openModal]
  );

  return (
    <ModalContext.Provider value={value}>
        <ModalCustom 
          isOpen={isVisible}
          onClose={() => {
            setVisible(!isVisible);
          }}
        >
          {content}
        </ModalCustom>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context == null) {
    throw new Error("useModal must be used within a AuthProvider");
  }

  return context;
};

export default ModalProvider;
