import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function Modal({ open, onAccept, onReject, title, children }) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        static
        open={open}
        onClose={() => {}} // Bloquea cierre por fondo o ESC
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg mx-auto">
              <Dialog.Title className="text-xl font-bold mb-4">
                {title}
              </Dialog.Title>
              <div className="mb-6">{children}</div>
              <div className="flex gap-4">
                <button
                  onClick={onReject}
                  className="flex-1 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold border border-gray-300"
                >
                  Rechazar
                </button>
                <button
                  onClick={onAccept}
                  className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
                >
                  Aceptar
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
