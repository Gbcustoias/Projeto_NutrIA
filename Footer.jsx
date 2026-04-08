export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "#f4f6f8",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          fontSize: 14,
          color: "#555",
          textAlign: "center",
        }}
      >
        <strong>Projeto NutrIA</strong>

        <span>
          Plataforma de acompanhamento nutricional focada em organização,
          clareza e evolução contínua.
        </span>

        <span>
          © {new Date().getFullYear()} Projeto NutrIA · Todos os direitos
          reservados
        </span>
      </div>
    </footer>
  );
}