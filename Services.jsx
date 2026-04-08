import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Services() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [serviceDetail, setServiceDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await api.get("/services");
        setServices(res.data);
        if (res.data.length > 0) {
          loadServiceDetail(res.data[0].id);
        }
      } catch {
        setServices([]);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  async function loadServiceDetail(serviceId) {
    try {
      const res = await api.get(`/services/id/${serviceId}`);
      setServiceDetail(res.data);
    } catch {
      setServiceDetail(null);
    }
  }

  function selectService(index) {
    setActiveIndex(index);
    loadServiceDetail(services[index].id);
  }

  function iniciarPrograma() {
    if (!serviceDetail) return;
    navigate(`/confirmacao?service=${serviceDetail.id}`);
  }

  if (loading) {
    return (
      <>
        <Header />
        <main style={{ padding: "64px 32px" }}>
          <p>Carregando Programas NutrIA...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main style={{ width: "100%", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 32px" }}>
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, marginBottom: 12 }}>
              Escolha seu Programa NutrIA
            </h2>

            <p style={{ maxWidth: 720, fontSize: 17, lineHeight: 1.6 }}>
              Cada Programa NutrIA foi pensado para ajudar você a organizar
              sua alimentação e evoluir com mais clareza, constância e foco
              no que realmente importa.
            </p>

            {user && (
              <p style={{ marginTop: 12, fontSize: 16 }}>
                <strong>{user.name}</strong>, escolha o programa que mais
                combina com o seu momento atual.
              </p>
            )}
          </section>

          <section
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              marginBottom: 48,
              flexWrap: "wrap",
            }}
          >
            {services.map((s, index) => (
              <div
                key={s.id}
                onClick={() => selectService(index)}
                style={{
                  cursor: "pointer",
                  padding: "18px 26px",
                  borderRadius: 14,
                  minWidth: 200,
                  textAlign: "center",
                  border:
                    index === activeIndex
                      ? "2px solid #d5731e"
                      : "1px solid #ddd",
                  backgroundColor:
                    index === activeIndex ? "#fff7f0" : "#fff",
                  boxShadow:
                    index === activeIndex
                      ? "0 8px 24px rgba(0,0,0,0.12)"
                      : "0 4px 10px rgba(0,0,0,0.05)",
                  transform:
                    index === activeIndex ? "scale(1.04)" : "scale(1)",
                  transition: "all 0.25s ease",
                }}
              >
                <strong style={{ fontSize: 16 }}>{s.name}</strong>
              </div>
            ))}
          </section>

          {serviceDetail && (
            <section
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 20,
                padding: 40,
                boxShadow: "0 12px 36px rgba(0,0,0,0.12)",
              }}
            >
              <h3 style={{ fontSize: 30, marginBottom: 16 }}>
                {serviceDetail.name}
              </h3>

              <p style={{ fontSize: 17, color: "#555", lineHeight: 1.6 }}>
                {serviceDetail.description}
              </p>

              <hr style={{ margin: "32px 0" }} />

              <ul style={{ listStyle: "none", padding: 0 }}>
                {serviceDetail.features.map((f) => (
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
                        color: f.included ? "#2e7d32" : "#ccc",
                      }}
                    >
                      {f.included ? "✓" : "—"}
                    </span>
                    {f.title}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 40, textAlign: "center" }}>
                <h2 style={{ color: "#d5731e", marginBottom: 24 }}>
                  R$ {(serviceDetail.price_cents / 100).toFixed(2)}
                </h2>

                <button
                  onClick={iniciarPrograma}
                  style={{
                    padding: "16px 40px",
                    fontSize: 17,
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#d5731e",
                    color: "#fff",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 24px rgba(0,0,0,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Começar agora
                </button>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}