import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";

const ImpulsaForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    projectDescription: "",
    acceptTerms: false,
    acceptPrivacy: false,
    acceptCommunications: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhone = (phone) => {
    // Spanish phone number format validation (includes mobile and landline)
    const phoneRegex = /^(?:\+34|0034|34)?[6789]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ""));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "El nombre de la empresa es obligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Por favor, introduce un email válido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Por favor, introduce un teléfono válido";
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription =
        "La descripción del proyecto es obligatoria";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
    }

    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = "Debes aceptar la política de privacidad";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your backend
      console.log("Form submitted", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form after successful submission
      setFormData({
        companyName: "",
        email: "",
        phone: "",
        projectDescription: "",
        acceptTerms: false,
        acceptPrivacy: false,
        acceptCommunications: false,
      });

      alert("¡Formulario enviado con éxito!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Ha ocurrido un error al enviar el formulario. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-2 rounded-lg border border-neutral/20 focus:outline-none focus:ring-2 focus:ring-primary-light/50";
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <section className="py-24 bg-accent-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-neutral-dark text-center mb-8">
            ¿Quieres ser parte del programa?
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-dark mb-2">
                Nombre de la empresa *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={inputClasses}
                required
              />
              {errors.companyName && (
                <p className={errorClasses}>{errors.companyName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-dark mb-2">
                Email de contacto *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                required
              />
              {errors.email && <p className={errorClasses}>{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-dark mb-2">
                Teléfono de contacto *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+34 600 000 000"
                className={inputClasses}
                required
              />
              {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-dark mb-2">
                Descripción del proyecto *
              </label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                className={`${inputClasses} h-32`}
                required
              />
              {errors.projectDescription && (
                <p className={errorClasses}>{errors.projectDescription}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
                <label className="text-sm text-neutral-DEFAULT">
                  * Acepto el{" "}
                  <a
                    href="/legal-notice"
                    className="text-primary-light hover:underline"
                  >
                    aviso legal
                  </a>
                  , los{" "}
                  <a
                    href="/terms-and-conditions"
                    className="text-primary-light hover:underline"
                  >
                    términos y condiciones del programa
                  </a>{" "}
                  y autorizo el tratamiento de mis datos según la normativa
                  vigente
                </label>
              </div>
              {errors.acceptTerms && (
                <p className={errorClasses}>{errors.acceptTerms}</p>
              )}

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
                <label className="text-sm text-neutral-DEFAULT">
                  * He leído y acepto la{" "}
                  <a
                    href="/privacy-policy"
                    className="text-primary-light hover:underline"
                  >
                    política de privacidad
                  </a>{" "}
                  y la{" "}
                  <a
                    href="/cookies-policy"
                    className="text-primary-light hover:underline"
                  >
                    política de cookies
                  </a>
                </label>
              </div>
              {errors.acceptPrivacy && (
                <p className={errorClasses}>{errors.acceptPrivacy}</p>
              )}

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="acceptCommunications"
                  checked={formData.acceptCommunications}
                  onChange={handleChange}
                  className="mt-1"
                />
                <label className="text-sm text-neutral-DEFAULT">
                  Acepto recibir comunicaciones comerciales personalizadas
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-light text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Enviar aplicación"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ImpulsaForm;
