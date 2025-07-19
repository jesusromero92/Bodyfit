import React from "react";

export default function Normativa() {
  return (
    <section className="min-h-screen py-12 pt-20 px-4 md:px-8 lg:px-16 bg-gray-50 text-gray-800 flex justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          CONDICIONES GENERALES Y NORMATIVA
        </h1>

        {/* 1. Normativa General */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Normativa General</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Se entiende como socio, toda persona que acceda al centro deportivo. La condición de socio es intransferible.</li>
            <li>La empresa se reserva el derecho de admisión.</li>
            <li>No está permitida la entrada a personas menores de 15 años, así mismo toda persona menor de edad será necesario que tenga una autorización de un tutor/a legal.</li>
            <li>La empresa pone a disposición del cliente una hoja de reclamación de derechos.</li>
            <li>Los usuarios mantendrán el orden y limpieza de la instalación.</li>
            <li>Hacer mal uso de la instalación, puede suponer por parte de la empresa la expulsión automática del centro.</li>
            <li>La empresa se reserva el derecho de modificar o suprimir cualquier tipo de horario notificándolo con la mayor brevedad posible.</li>
            <li>No está permitida la entrada de animales, excepto perros guía.</li>
            <li>Para velar por la seguridad de los socios, el centro estará vigilado por cámaras de seguridad, siendo informados por sus respectivos carteles de vigilancia (Reglamento (UE) 2016/679 de 27 de abril (GDPR) y Ley 5/2014 de seguridad privada).</li>
            <li>La empresa no se hace responsable de los objetos perdidos, sustraídos u olvidados en el centro.</li>
            <li>La empresa no se hace responsable de la atención médica como consecuencia de lesiones, siempre dando asistencia de primeros auxilios.</li>
            <li>El socio afirma conocer las “condiciones generales”, las cuales estarán en todo momento a disposición tanto en el centro como a través de la web www.bodyfitcenter.es.</li>
          </ol>
        </div>

        {/* 2. Normativa de inscripción/suscripción */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Normativa de inscripción/suscripción</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>La inscripción está sujeta a las normas o reglamentos establecidos por la empresa.</li>
            <li>La titularidad de la inscripción es individual para cada socio, no se puede ceder o transferir, y su importe no será reembolsable.</li>
            <li>La empresa se reserva el derecho a devolver cualquier tipo de cuota contratada en dinero, como en días o mensualidades.</li>
            <li>El pago correspondiente de los socios se deberá de realizar de forma efectiva, abono con tarjeta o domiciliación bancaria según la tarifa contratada.</li>
            <li>La empresa se reserva el derecho de modificar cualquier tipo de cuotas sin previo aviso y consentimiento de los socios.</li>
            <li>Al inscribirse es necesario abonar la llave de acceso a la instalación; en caso de pérdida, el socio deberá adquirir una nueva.</li>
            <li>Para tramitar la baja de los contratos, es necesario hacerlo de forma presencial en el centro.</li>
            <li>Los contratos a su vencimiento se renuevan automáticamente con la tarifa contratada. En caso de que el socio no desee seguir, deberá avisar a Bodyfit Alavera S.L. al menos 10 días antes de su vencimiento, firmando la correspondiente baja en recepción.</li>
            <li>Para dar un servicio de calidad, la empresa puede restringir el aforo al centro.</li>
          </ol>
        </div>

        {/* 3. Normativa ante impagos */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Normativa ante impagos</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>En caso de deuda, la empresa se reserva el derecho a ceder la deuda a una agencia cobradora.</li>
            <li>En caso de que haya un recibo devuelto de un socio, deberá abonar la cuota contratada además de los gastos de devolución.</li>
            <li>Recibos devueltos: las cantidades impagadas de acuerdo con el contrato suscrito implicarán la automática resolución del contrato y la pérdida de condición de socio, sin necesidad de requerimiento alguno, además de la prohibición del acceso al centro hasta que dicha deuda quede saldada.</li>
          </ol>
        </div>

        {/* 4. Horario del centro */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Horario del centro</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>El horario del centro será de lunes a viernes de 07:00h a 22:30h, sábados y domingos de 09:00h a 14:00h. Los domingos el centro permanecerá cerrado en los meses de julio y agosto.</li>
            <li>La empresa se reserva el derecho a modificar el horario, contenido de clases y actividades dirigidas sin previo aviso.</li>
          </ol>
        </div>

        {/* 5. Código de conducta */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">5. Código de conducta</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Los socios deberán utilizar los equipos de acuerdo con la normativa que exija la empresa, no haciendo uso indebido de equipos y materiales. En caso de uso indebido intencionado, la empresa podrá exigir el abono de ese daño ocasionado.</li>
            <li>Es obligatorio el uso de toalla, así como calzado y ropa deportiva.</li>
            <li>El socio para la utilización de las máquinas deberá seguir las instrucciones de los monitores en ese momento o del software de entrenamiento.</li>
            <li>El socio deberá ordenar cualquier material o dejar en su lugar cualquier material utilizado, así como la descarga de los discos utilizados durante el entrenamiento.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
