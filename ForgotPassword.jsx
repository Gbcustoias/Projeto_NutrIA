import { useState } from "react";
import api from "../api/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await api.post("/auth/forgot-password", { email });
      setMessage(
        "Se o e-mail estiver cadastrado, enviaremos um link para redefinir sua senha."
      );
    } catch {
      setError("Erro ao solicitar redefinição de senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 48,
          borderRadius: 16,
          boxShadow: "0 12px 36px rgba(0,0,0,0.12)",
          backgroundColor: "#ffffff",
          textAlign: "center",
        }}
      >
        <img
          src="/logo.png"
          alt="Projeto NutrIA"
          style={{ height: 100, marginBottom: 24 }}
        />

        <h2 style={{ marginBottom: 12 }}>
          Esqueci minha senha
        </h2>

        <p
          style={{
            fontSize: 15,
            color: "#555",
            marginBottom: 32,
            lineHeight: 1.6,
          }}
        >
          Informe o e-mail cadastrado e enviaremos um link para redefinir sua senha.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 8,
              border: "1px solid #ccc",
              marginBottom: 20,
              fontSize: 15,
            }}
          />

          {message && (
            <p style={{ color: "#16a34a", marginBottom: 16 }}>
              {message}
            </p>
          )}

          {error && (
            <p style={{ color: "#dc2626", marginBottom: 16 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 8,
              border: "none",
              backgroundColor: "#d5731e",
              color: "#ffffff",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            {loading ? "Enviando..." : "Enviar link"}
          </button>
        </form>
      </div>
    </main>
  );
}