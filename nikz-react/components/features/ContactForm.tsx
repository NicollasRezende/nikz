// components/features/ContactForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ContactFormData } from "@/types";
import { sendEmail } from "@/lib/emailjs";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
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
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-2 text-gray-300 flex items-center gap-2"
        >
          <i className="fas fa-user text-cyan-400" />
          Nome
        </label>
        <div className="relative">
          <input
            id="name"
            type="text"
            {...register("name", { required: "Nome é obrigatório" })}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            className={cn(
              "w-full px-4 py-3 rounded-lg",
              "bg-white/5 backdrop-blur-sm",
              "border-2",
              errors.name
                ? "border-red-500 animate-shake"
                : focusedField === "name"
                ? "border-cyan-500 shadow-[0_0_20px_rgba(0,198,255,0.3)]"
                : "border-white/10",
              "text-white placeholder-gray-500",
              "focus:outline-none",
              "transition-all duration-300"
            )}
            placeholder="Seu nome"
          />
          {focusedField === "name" && (
            <motion.div
              layoutId="formGlow"
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 -z-10 blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-400 flex items-center gap-1"
          >
            <i className="fas fa-exclamation-circle" />
            {errors.name.message}
          </motion.p>
        )}
      </motion.div>

      {/* Email Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <label
          htmlFor="email"
          className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-300"
        >
          <i className="fas fa-envelope text-blue-400" />
          Email
        </label>
        <div className="relative">
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
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            className={cn(
              "w-full px-4 py-3 rounded-lg",
              "bg-white/5 backdrop-blur-sm",
              "border-2",
              errors.email
                ? "border-red-500 animate-shake"
                : focusedField === "email"
                ? "border-blue-500 shadow-[0_0_20px_rgba(77,140,255,0.3)]"
                : "border-white/10",
              "text-white placeholder-gray-500",
              "focus:outline-none",
              "transition-all duration-300"
            )}
            placeholder="seu@email.com"
          />
          {focusedField === "email" && (
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-400 flex items-center gap-1"
          >
            <i className="fas fa-exclamation-circle" />
            {errors.email.message}
          </motion.p>
        )}
      </motion.div>

      {/* Subject Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <label
          htmlFor="subject"
          className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-300"
        >
          <i className="fas fa-tag text-purple-400" />
          Assunto
        </label>
        <div className="relative">
          <input
            id="subject"
            type="text"
            {...register("subject", { required: "Assunto é obrigatório" })}
            onFocus={() => setFocusedField("subject")}
            onBlur={() => setFocusedField(null)}
            className={cn(
              "w-full px-4 py-3 rounded-lg",
              "bg-white/5 backdrop-blur-sm",
              "border-2",
              errors.subject
                ? "border-red-500 animate-shake"
                : focusedField === "subject"
                ? "border-purple-500 shadow-[0_0_20px_rgba(157,92,252,0.3)]"
                : "border-white/10",
              "text-white placeholder-gray-500",
              "focus:outline-none",
              "transition-all duration-300"
            )}
            placeholder="Assunto da mensagem"
          />
          {focusedField === "subject" && (
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10 blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>
        {errors.subject && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-400 flex items-center gap-1"
          >
            <i className="fas fa-exclamation-circle" />
            {errors.subject.message}
          </motion.p>
        )}
      </motion.div>

      {/* Message Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        <label
          htmlFor="message"
          className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-300"
        >
          <i className="fas fa-comment-dots text-cyan-400" />
          Mensagem
        </label>
        <div className="relative">
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
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            className={cn(
              "w-full px-4 py-3 rounded-lg",
              "bg-white/5 backdrop-blur-sm",
              "border-2",
              errors.message
                ? "border-red-500 animate-shake"
                : focusedField === "message"
                ? "border-cyan-500 shadow-[0_0_20px_rgba(0,198,255,0.3)]"
                : "border-white/10",
              "text-white placeholder-gray-500",
              "focus:outline-none",
              "transition-all duration-300 resize-none"
            )}
            placeholder="Sua mensagem..."
          />
          {focusedField === "message" && (
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 -z-10 blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-400 flex items-center gap-1"
          >
            <i className="fas fa-exclamation-circle" />
            {errors.message.message}
          </motion.p>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="w-full group relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {status === "submitting" ? (
              <>
                <motion.span
                  className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Enviando...
              </>
            ) : (
              <>
                <span>Enviar Mensagem</span>
                <motion.i
                  className="fas fa-paper-plane"
                  whileHover={{ x: 5, y: -5 }}
                  transition={{ duration: 0.2 }}
                />
              </>
            )}
          </span>
        </Button>
      </motion.div>

      {/* Status Messages */}
      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 rounded-lg backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <motion.i
              className="fas fa-check-circle text-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <div>
              <p className="font-semibold">Mensagem enviada com sucesso!</p>
              <p className="text-sm opacity-80">Entrarei em contato em breve.</p>
            </div>
          </div>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-300 rounded-lg backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <motion.i
              className="fas fa-exclamation-circle text-2xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: 2 }}
            />
            <div>
              <p className="font-semibold">Erro ao enviar mensagem</p>
              <p className="text-sm opacity-80">Por favor, tente novamente.</p>
            </div>
          </div>
        </motion.div>
      )}
    </form>
  );
}
