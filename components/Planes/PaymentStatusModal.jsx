import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de que esté importado aquí

export default function PaymentStatusModal({ open, onClose, status }) {
  const navigate = useNavigate();
  
  let title = '';
  let message = '';
  let buttonText = '';
  let buttonColor = '';
  let icon = null;

  // Configuración de los diferentes estados del modal según el estado del pago
  if (status === 'success') {
    title = 'Pago Exitoso';
    message = '¡Tu pago ha sido procesado exitosamente! Gracias por confiar en nosotros.';
    buttonText = 'Ir a mi Perfil';
    buttonColor = 'bg-green-600 hover:bg-green-700';
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    );
  } else if (status === 'failed') {
    title = 'Pago Fallido';
    message = 'Hubo un problema al procesar tu pago. Por favor, intenta de nuevo más tarde. Si el problema persiste, contacta con soporte.';
    buttonText = 'Cerrar';
    buttonColor = 'bg-red-600 hover:bg-red-700';
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  } else if (status === 'already_subscribed') {
    title = 'Ya estás suscrito';
    message = 'Ya tienes una suscripción activa. No puedes crear una nueva suscripción.';
    buttonText = 'Ir a mi Perfil';
    buttonColor = 'bg-blue-600 hover:bg-blue-700';
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16M5 12l7 7 7-7" />
      </svg>
    );
  }

  const handleButtonClick = () => {
    // Si el estado es 'success' o 'already_subscribed', navega a '/perfil'
    if (status === 'success' || status === 'already_subscribed') {
      navigate('/perfil');
    }
    onClose(); // Cerrar el modal después de redirigir o si el pago falla
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" open={open} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
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
            <Dialog.Panel className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg mx-auto text-center">
              {icon}
              <Dialog.Title className="text-2xl font-semibold text-gray-900 mb-4">{title}</Dialog.Title>
              <div className="mb-6">
                <p className="text-gray-600 text-sm">{message}</p>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleButtonClick}
                  className={`px-8 py-3 rounded-xl font-semibold text-white ${buttonColor}`}
                >
                  {buttonText}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
