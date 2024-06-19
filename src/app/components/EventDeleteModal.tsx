import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

type DeleteModalProps = {
  onConfirm: () => void;
};

const EventDeleteModal = ({ onConfirm }: DeleteModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={openModal} className="text-sm text-red-500">
        삭제
      </button>
      <Dialog open={isModalOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeModal}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm space-y-4 bg-white p-6 rounded-lg">
            <DialogTitle className="font-bold text-xl">이벤트 삭제</DialogTitle>
            <Description>이 이벤트를 삭제하시겠어요?</Description>
            <div className="flex justify-end gap-4">
              <button
                onClick={onConfirm}
                className="flex py-2 px-4 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
              >
                삭제
              </button>
              <button onClick={closeModal} className="flex py-2 px-4 bg-white rounded-lg hover:bg-slate-100">
                취소
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default EventDeleteModal;
