import { createPortal } from "react-dom";
import { useModal } from "../contexts/modal-context";

const Modal = () => {
  const { isOpen, modalContent, closeModal } = useModal();

  const handleCloseModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return isOpen
    ? createPortal(
        <div
          className="
          fixed top-0 left-0 w-full h-full 
          bg-gray-900 bg-opacity-50 flex justify-center 
          items-center z-50"
          onClick={handleCloseModalClick}
        >
          <div className="bg-white rounded-lg p-2 flex flex-col">
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {modalContent}
          </div>
        </div>,
        document.getElementById("modal-root")
      )
    : null;
};

export default Modal;

