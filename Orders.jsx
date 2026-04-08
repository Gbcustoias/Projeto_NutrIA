import { useEffect, useState } from "react";
import api from "../api/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await api.get("/orders");
        setOrders(res.data);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  return (
    <>
      <Header />

      <main style={{ width: "100%", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 32px" }}>
          <h2 style={{ marginBottom: 24 }}>Meus Programas</h2>

          {loading && <p>Carregando seus programas...</p>}

          {!loading && orders.length === 0 && (
            <p>Você ainda não iniciou nenhum programa.</p>
          )}

          {!loading &&
            orders.map((order) => (
              <div
                key={order.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 12,
                  padding: 20,
                  marginBottom: 16,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                  backgroundColor: "#ffffff",
                }}
              >
                <p style={{ marginBottom: 8 }}>
                  <strong>Programa iniciado em:</strong>{" "}
                  {new Date(order.created_at).toLocaleDateString()}
                </p>

                <p style={{ marginBottom: 8 }}>
                  <strong>Status:</strong> {order.status}
                </p>

                <p>
                  <strong>Investimento:</strong>{" "}
                  R$ {(order.total_cents / 100).toFixed(2)}
                </p>
              </div>
            ))}
        </div>
      </main>

      <Footer />
    </>
  );
}