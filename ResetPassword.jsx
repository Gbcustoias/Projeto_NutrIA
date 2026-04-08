import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Token inválido ou ausente");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/reset-password", {
        token,
        new_password: password,
      });

      setSuccess("Senha redefinida com sucesso. Redirecionando para o login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Erro ao redefinir senha"
      );
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

        <h2 style={{ marginBottom: 20 }}>
          Redefinir senha
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 8,
              border: "1px solid #ccc",
              marginBottom: 16,
            }}
          />

          <input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 8,
              border: "1px solid #ccc",
              marginBottom: 20,
            }}
          />

          {error && (
            <p style={{ color: "#dc2626", marginBottom: 16 }}>
              {error}
            </p>
          )}

          {success && (
            <p style={{ color: "#16a34a", marginBottom: 16 }}>
              {success}
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
            {loading ? "Salvando..." : "Redefinir senha"}
          </button>
        </form>
      </div>
    </main>
  );
}