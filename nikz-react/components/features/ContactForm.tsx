// components/features/ContactForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ContactFormData } from "@/types";
import { sendEmail } from "@/lib/emailjs";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");

    const result = await sendEmail(data);

    if (result.success) {
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Nome
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Nome é obrigatório" })}
          className={cn(
            "w-full px-4 py-3 rounded-lg",
            "bg-white dark:bg-gray-800",
            "border-2",
            errors.name
              ? "border-red-500 animate-shake"
              : "border-gray-300 dark:border-gray-600",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "transition-colors"
          )}
          placeholder="Seu nome"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
          className={cn(
            "w-full px-4 py-3 rounded-lg",
            "bg-white dark:bg-gray-800",
            "border-2",
            errors.email
              ? "border-red-500 animate-shake"
              : "border-gray-300 dark:border-gray-600",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "transition-colors"
          )}
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Assunto
        </label>
        <input
          id="subject"
          type="text"
          {...register("subject", { required: "Assunto é obrigatório" })}
          className={cn(
            "w-full px-4 py-3 rounded-lg",
            "bg-white dark:bg-gray-800",
            "border-2",
            errors.subject
              ? "border-red-500 animate-shake"
              : "border-gray-300 dark:border-gray-600",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "transition-colors"
          )}
          placeholder="Assunto da mensagem"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Mensagem
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message", {
            required: "Mensagem é obrigatória",
            minLength: {
              value: 10,
              message: "Mensagem deve ter no mínimo 10 caracteres",
            },
          })}
          className={cn(
            "w-full px-4 py-3 rounded-lg",
            "bg-white dark:bg-gray-800",
            "border-2",
            errors.message
              ? "border-red-500 animate-shake"
              : "border-gray-300 dark:border-gray-600",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            "transition-colors resize-none"
          )}
          placeholder="Sua mensagem..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full"
      >
        {status === "submitting" ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Enviando...
          </>
        ) : (
          "Enviar Mensagem"
        )}
      </Button>

      {/* Status Messages */}
      {status === "success" && (
        <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
          <i className="fas fa-check-circle mr-2" />
          Mensagem enviada com sucesso! Entrarei em contato em breve.
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
          <i className="fas fa-exclamation-circle mr-2" />
          Erro ao enviar mensagem. Por favor, tente novamente.
        </div>
      )}
    </form>
  );
}
