import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, authLoading, logout } = useAuth();

  if (authLoading) return null;

  function go(path) {
    navigate(path);
  }

  function sair() {
    logout();
    navigate("/login");
  }

  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "#f4f6f8",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src="/logo.png"
          alt="Projeto NutrIA"
          onClick={() => go("/")}
          style={{
            height: 125,
            cursor: "pointer",
            display: "block",
            userSelect: "none",
          }}
        />

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <HeaderButton onClick={() => go("/")}>
            Home
          </HeaderButton>

          <HeaderButton onClick={() => go("/services")}>
            Programas
          </HeaderButton>

          {user && (
            <>
              <HeaderButton onClick={() => go("/orders")}>
                Meus Programas
              </HeaderButton>

              <span
                style={{
                  fontSize: 14,
                  color: "#374151",
                  marginInline: 8,
                  whiteSpace: "nowrap",
                }}
              >
                Olá, <strong>{user.name}</strong>
              </span>

              <PrimaryButton onClick={sair}>
                Sair
              </PrimaryButton>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function HeaderButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "transparent",
        border: "1px solid #9ca3af",
        color: "#1f2937",
        padding: "8px 16px",
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 14,
        transition: "background-color 0.2s ease, transform 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#e5e7eb";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </button>
  );
}

function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#d5731e",
        border: "none",
        color: "#ffffff",
        padding: "8px 18px",
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 14,
        transition:
          "background-color 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#bf661c";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 6px 14px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#d5731e";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </button>
  );
}