import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("E-mail ou senha inválidos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src="/logo.png" alt="Projeto NutrIA" style={{ height: 140, marginBottom: 24 }} />

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ marginBottom: 20 }}>
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 15,
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 15,
              }}
            />
          </div>

          {error && (
            <p style={{ color: "#dc2626", marginBottom: 16, fontSize: 14 }}>
              {error}
            </p>
          )}

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px 48px",
                borderRadius: 8,
                border: "none",
                backgroundColor: "#d5731e",
                color: "#ffffff",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>

        <div style={{ display: "flex", gap: 12, fontSize: 14 }}>
          <button
            onClick={() => navigate("/register")}
            style={{ background: "none", border: "none", color: "#d5731e", cursor: "pointer" }}
          >
            Criar conta
          </button>

          <button
            onClick={() => navigate("/forgot-password")}
            style={{ background: "none", border: "none", color: "#555", cursor: "pointer" }}
          >
            Esqueci minha senha
          </button>
        </div>
      </div>
    </main>
  );
}