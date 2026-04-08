import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Confirmacao() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const serviceId = params.get("service");

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    async function loadService() {
      try {
        const res = await api.get(`/services/id/${serviceId}`);
        setService(res.data);
      } catch {
        setService(null);
      } finally {
        setLoading(false);
      }
    }

    loadService();
  }, [serviceId]);

  async function confirmarContratacao() {
    try {
      setConfirming(true);

      await api.post("/orders", [
        {
          service_id: service.id,
          qty: 1,
        },
      ]);

      navigate("/orders");
    } finally {
      setConfirming(false);
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main style={{ padding: "64px 32px" }}>
          <p>Carregando confirmação...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!service) {
    return (
      <>
        <Header />
        <main style={{ padding: "64px 32px" }}>
          <p>Programa não encontrado.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main style={{ width: "100%", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 32px" }}>
          <h2 style={{ fontSize: 34, marginBottom: 24 }}>
            Confirmação de Contratação
          </h2>

          <p style={{ fontSize: 17, marginBottom: 32, color: "#555" }}>
            Revise as informações abaixo antes de confirmar o início do seu
            acompanhamento.
          </p>

          <section
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 20,
              padding: 40,
              boxShadow: "0 12px 36px rgba(0,0,0,0.12)",
            }}
          >
            <h3 style={{ fontSize: 28, marginBottom: 12 }}>
              {service.name}
            </h3>

            <p style={{ fontSize: 17, lineHeight: 1.6, color: "#555" }}>
              {service.description}
            </p>

            <hr style={{ margin: "32px 0" }} />

            <ul style={{ listStyle: "none", padding: 0 }}>
              {service.features
                .filter((f) => f.included)
                .map((f) => (
                  <li
                    key={f.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 14,
                      fontSize: 16,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 22,
                        marginRight: 12,
                        color: "#2e7d32",
                      }}
                    >
                      ✓
                    </span>
                    {f.title}
                  </li>
                ))}
            </ul>

            <div
              style={{
                marginTop: 40,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              <h2 style={{ color: "#d5731e", fontSize: 26 }}>
                R$ {(service.price_cents / 100).toFixed(2)}
              </h2>

              <div style={{ display: "flex", gap: 16 }}>
                <button
                  onClick={() => navigate("/services")}
                  style={{
                    padding: "14px 28px",
                    fontSize: 16,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  Voltar
                </button>

                <button
                  onClick={confirmarContratacao}
                  disabled={confirming}
                  style={{
                    padding: "14px 32px",
                    fontSize: 16,
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#d5731e",
                    color: "#ffffff",
                    transition: "all 0.2s ease",
                  }}
                >
                  {confirming ? "Confirmando..." : "Confirmar contratação"}
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}