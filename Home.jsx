import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <main style={{ width: "100%", backgroundColor: "#ffffff" }}>
        <section
          style={{
            padding: "96px 32px",
            textAlign: "center",
            backgroundColor: "#fafbfc",
          }}
        >
          <img
            src="/logo.png"
            alt="Projeto NutrIA"
            style={{ height: 420, marginBottom: 16 }}
          />

          <p
            style={{
              fontSize: 20,
              lineHeight: 1.7,
              color: "#444",
              maxWidth: 820,
              margin: "0 auto 36px",
            }}
          >
            Organização, acompanhamento e clareza para quem deseja melhorar
            hábitos alimentares de forma estruturada e contínua.
          </p>

          <button
            onClick={() => navigate("/services")}
            style={{
              padding: "18px 44px",
              fontSize: 18,
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              backgroundColor: "#d5731e",
              color: "#fff",
              transition: "all 0.25s ease",
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
            Conhecer Programas
          </button>
        </section>

        <section
          style={{
            padding: "88px 32px",
            backgroundColor: "#ffffff",
          }}
        >
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <h2 style={{ fontSize: 34, marginBottom: 32 }}>
              O que é o Projeto NutrIA
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 28,
                fontSize: 17,
                lineHeight: 1.75,
                color: "#444",
              }}
            >
              <p>
                O <strong>Projeto NutrIA</strong> é uma plataforma digital de
                acompanhamento nutricional criada para pessoas que desejam
                organizar melhor seus hábitos alimentares e acompanhar sua
                evolução de forma clara, estruturada e contínua.
              </p>

              <p>
                A proposta do NutrIA é oferecer{" "}
                <strong>programas bem definidos</strong>, pensados para
                diferentes momentos e objetivos, permitindo uma jornada
                alimentar mais consciente e sustentável, sem improvisações.
              </p>

              <p>
                A plataforma centraliza informações sobre alimentação,
                histórico e progresso em um único ambiente, facilitando a
                visualização da evolução ao longo do tempo e decisões mais
                consistentes no dia a dia.
              </p>

              <p>
                Mais do que iniciar um programa, o usuário passa a contar com
                uma <strong>visão organizada da sua rotina alimentar</strong>,
                com acompanhamento, constância e clareza sobre sua evolução.
              </p>
            </div>
          </div>
        </section>

        <section
          style={{
            padding: "88px 32px",
            backgroundColor: "#f9fafb",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 34, marginBottom: 52 }}>
            Como funciona
          </h2>

          <div
            style={{
              display: "flex",
              gap: 36,
              justifyContent: "center",
              flexWrap: "wrap",
              maxWidth: 1200,
              margin: "0 auto",
            }}
          >
            {[
              {
                title: "Escolha seu programa",
                text:
                  "Selecione o programa que mais combina com seu momento atual.",
              },
              {
                title: "Confirme a contratação",
                text:
                  "Revise as informações e inicie seu acompanhamento com segurança.",
              },
              {
                title: "Acompanhe sua evolução",
                text:
                  "Visualize seu progresso e mantenha sua rotina organizada.",
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 18,
                  padding: "36px 32px",
                  maxWidth: 300,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 36px rgba(0,0,0,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.1)";
                }}
              >
                <strong style={{ fontSize: 19 }}>{item.title}</strong>
                <p
                  style={{
                    marginTop: 14,
                    fontSize: 16,
                    color: "#555",
                    lineHeight: 1.6,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            padding: "88px 32px",
            textAlign: "center",
            backgroundColor: "#f5f6f8",
          }}
        >
          <h2 style={{ fontSize: 32, marginBottom: 18 }}>
            Pronto para começar?
          </h2>

          <p style={{ fontSize: 17, marginBottom: 36 }}>
            Conheça agora os Programas NutrIA e dê o próximo passo.
          </p>

          <button
            onClick={() => navigate("/services")}
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
            Ver Programas
          </button>
        </section>
      </main>

      <Footer />
    </>
  );
}