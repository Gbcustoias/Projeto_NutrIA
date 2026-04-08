def order_confirmation_email(
    customer_name: str,
    order_id: str,
    total_cents: int
) -> str:
    total = total_cents / 100

    return f"""
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 8px;">
          
          <h2 style="color: #2c3e50;">✅ Pedido confirmado!</h2>

          <p>Olá <strong>{customer_name}</strong>,</p>

          <p>Seu pedido foi recebido com sucesso e já está em processamento.</p>

          <hr>

          <p><strong>Número do pedido:</strong> {order_id}</p>
          <p><strong>Valor total:</strong> R$ {total:.2f}</p>

          <hr>

          <p>
            Em breve entraremos em contato para os próximos passos.
          </p>

          <p style="color: #7f8c8d; font-size: 12px;">
            Este é um e-mail automático, por favor não responda.
          </p>
        </div>
      </body>
    </html>
    """