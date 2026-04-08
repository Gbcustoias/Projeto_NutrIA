import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function maskCPF(value) {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function maskPhone(value) {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        cpf: cpf || null,
        phone: phone || null,
      });

      setSuccess("Conta criada com sucesso. Faça login.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Erro ao criar conta"
      );
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
        <img
          src="/logo.png"
          alt="Projeto NutrIA"
          style={{ height: 140, marginBottom: 24 }}
        />

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ marginBottom: 16 }}>
            <label>Nome completo *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>E-mail *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(maskCPF(e.target.value))}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Telefone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Senha *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label>Confirmar senha *</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {error && (
            <p style={{ color: "#dc2626", marginBottom: 16, fontSize: 14 }}>
              {error}
            </p>
          )}

          {success && (
            <p style={{ color: "#16a34a", marginBottom: 16, fontSize: 14 }}>
              {success}
            </p>
          )}

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <button
              type="submit"
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? "Criando..." : "Criar conta"}
            </button>
          </div>
        </form>

        <div style={{ display: "flex", gap: 12, fontSize: 14 }}>
          <button
            onClick={() => navigate("/login")}
            style={linkPrimary}
          >
            Entrar
          </button>
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 15,
};

const buttonStyle = {
  padding: "14px 48px",
  borderRadius: 8,
  border: "none",
  backgroundColor: "#d5731e",
  color: "#ffffff",
  fontSize: 16,
  cursor: "pointer",
};

const linkPrimary = {
  background: "none",
  border: "none",
  color: "#d5731e",
  cursor: "pointer",
};
