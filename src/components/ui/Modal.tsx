import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
const style = {
  boxShadow:
    "5px 5px 10px 0 rgba(0,0,0,0.3), -1px -1px 5px 0 rgba(0,0,0,0.2) inset",
};
interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
  title?: string;
  operating: string;
}
const Modal = ({ isOpen, closeModal, title, children, operating }: IProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* backdrop-blur-sm Adding modal backdrop blur effect */}
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.1)]  backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  style={style}
                  className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className={`text-lg font-medium leading-6 ${
                        operating === "delete"
                          ? "text-red-600"
                          : "text-blue-800"
                      }`}
                    >
                      {title}
                    </Dialog.Title>
                  )}

                  <div className="mt-4">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Modal;
