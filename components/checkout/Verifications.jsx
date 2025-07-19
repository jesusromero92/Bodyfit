import { CheckCircleIcon } from '@heroicons/react/20/solid'; // Importar el icono de check

export default function Verifications({
  cancelInfoAccepted,
  contractAccepted,
  setCancelInfoOpen,
  setContractOpen,
}) {
  return (
    <div className="my-6 space-y-4">
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setCancelInfoOpen(true)}
          className="text-blue-600 underline font-semibold disabled:text-gray-400"
          disabled={cancelInfoAccepted}
        >
          Ver información sobre cancelación
        </button>
        {cancelInfoAccepted && (
          <CheckCircleIcon className="inline-block ml-2 h-6 w-6 text-green-600" /> // Icono de check verde
        )}
      </div>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setContractOpen(true)}
          className="text-blue-600 underline font-semibold disabled:text-gray-400"
          disabled={contractAccepted}
        >
          Ver contrato que firmarás
        </button>
        {contractAccepted && (
          <CheckCircleIcon className="inline-block ml-2 h-6 w-6 text-green-600" /> // Icono de check verde
        )}
      </div>
    </div>
  );
}
