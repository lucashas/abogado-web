const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");
const cors = require("cors")({ origin: true });

// Read SendGrid key and addresses from functions config
const SENDGRID_KEY = functions.config().sendgrid?.key || "";
const FROM_EMAIL = functions.config().sendgrid?.from || "";
const TO_EMAIL = functions.config().sendgrid?.to || "";

if (SENDGRID_KEY) {
  sgMail.setApiKey(SENDGRID_KEY);
}

exports.sendContact = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send({ ok: false, error: "Method Not Allowed" });
    }

    const { nombre, email, telefono, mensaje } = req.body || {};
    if (!nombre || !email || !mensaje) {
      return res.status(400).send({ ok: false, error: "Missing fields" });
    }

    if (!SENDGRID_KEY || !FROM_EMAIL || !TO_EMAIL) {
      console.error("SendGrid not configured properly.");
      return res
        .status(500)
        .send({ ok: false, error: "Email service not configured" });
    }

    const msg = {
      to: TO_EMAIL,
      from: FROM_EMAIL,
      subject: `Nueva consulta desde sitio - ${nombre}`,
      html: `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || "-"}</p>
        <p><strong>Mensaje:</strong><br/>${mensaje.replace(/\n/g, "<br/>")}</p>
      `,
    };

    try {
      await sgMail.send(msg);
      return res.status(200).send({ ok: true });
    } catch (err) {
      console.error("SendGrid error:", err?.response?.body || err.message || err);
      return res.status(500).send({ ok: false, error: "Failed to send email" });
    }
  });
});
