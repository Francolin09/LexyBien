'use client';

import { useState } from 'react';

interface FormData {
  nombre: string;
  rut: string;
  correo: string;
  mensaje: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    rut: '',
    correo: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.');
        setFormData({
          nombre: '',
          rut: '',
          correo: '',
          mensaje: ''
        });
      } else {
        setMessage(data.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error en el formulario:', error);
      setMessage('Error de conexión. Por favor, verifica tu conexión e intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
          Contáctanos
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Estamos aquí para ayudarte con tus consultas legales. Completa el formulario y nos pondremos en contacto contigo.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Grid de campos */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-3">
                Nombre Completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label htmlFor="rut" className="block text-sm font-semibold text-gray-700 mb-3">
                RUT *
              </label>
              <input
                type="text"
                id="rut"
                name="rut"
                value={formData.rut}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400"
                placeholder="12345678-9"
                pattern="[0-9]+-[0-9kK]"
                title="Formato: 12345678-9"
              />
            </div>
          </div>

          <div>
            <label htmlFor="correo" className="block text-sm font-semibold text-gray-700 mb-3">
              Correo Electrónico *
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-700 mb-3">
              Mensaje *
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 resize-none"
              placeholder="Cuéntanos cómo podemos ayudarte con tu consulta legal..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-8 rounded-xl font-semibold text-white transition-all duration-300 transform ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
            ) : (
              'Enviar Mensaje'
            )}
          </button>

          {message && (
            <div className={`p-6 rounded-xl text-center font-medium ${
              message.includes('correctamente') 
                ? 'bg-green-50 text-green-800 border-2 border-green-200'
                : 'bg-red-50 text-red-800 border-2 border-red-200'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
