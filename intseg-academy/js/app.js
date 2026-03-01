/**
 * IntSeg Academy — Lógica Principal
 * Grupo IntSeg | TecMilenio 2025
 */

// ── Usuarios simulados (en producción se usa JWT + backend) ──────────────────
const USUARIOS = [
  { usuario: "guardia01",  password: "intseg123", rol: "guardia",  nombre: "Juan García" },
  { usuario: "admin",      password: "admin123",  rol: "admin",    nombre: "E. Hernández" },
  { usuario: "instructor", password: "inst123",   rol: "maestro",  nombre: "Lic. González" },
];

// ── Cursos del sistema ───────────────────────────────────────────────────────
const CURSOS = [
  {
    id: 1,
    titulo: "Normatividad en Seguridad Privada",
    categoria: "Certificación DC3",
    duracion: "3 horas",
    modulos: 5,
    progreso: 60,
    obligatorio: true,
    color: "#1E40AF",
  },
  {
    id: 2,
    titulo: "ISO 28001: Seguridad en la Cadena de Suministro",
    categoria: "Certificación Internacional",
    duracion: "4 horas",
    modulos: 6,
    progreso: 30,
    obligatorio: false,
    color: "#0369A1",
  },
  {
    id: 3,
    titulo: "Antilavado de Dinero y Seguridad Patrimonial",
    categoria: "Certificación OEA",
    duracion: "2 horas",
    modulos: 4,
    progreso: 50,
    obligatorio: true,
    color: "#DC2626",
  },
  {
    id: 4,
    titulo: "Primeros Auxilios y Respuesta a Emergencias",
    categoria: "Capacitación General",
    duracion: "2 horas",
    modulos: 3,
    progreso: 100,
    obligatorio: false,
    color: "#16A34A",
  },
  {
    id: 5,
    titulo: "Ética y Conducta Profesional del Guardia",
    categoria: "Capacitación General",
    duracion: "1.5 horas",
    modulos: 3,
    progreso: 0,
    obligatorio: false,
    color: "#7C3AED",
  },
];

// ── Función de Login ─────────────────────────────────────────────────────────
function login() {
  const usuario  = document.getElementById("usuario")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!usuario || !password) {
    mostrarError("Por favor ingresa tu usuario y contraseña.");
    return;
  }

  const user = USUARIOS.find(u => u.usuario === usuario && u.password === password);

  if (!user) {
    mostrarError("Usuario o contraseña incorrectos. Intenta de nuevo.");
    return;
  }

  // Guardar sesión
  sessionStorage.setItem("usuario", JSON.stringify(user));

  // Redirigir según rol
  if (user.rol === "admin" || user.rol === "maestro") {
    window.location.href = "pages/admin.html";
  } else {
    window.location.href = "pages/catalogo.html";
  }
}

function mostrarError(msg) {
  const errorMsg = document.getElementById("errorMsg");
  if (errorMsg) {
    errorMsg.textContent = msg;
    errorMsg.style.display = "block";
    setTimeout(() => { errorMsg.style.display = "none"; }, 4000);
  }
}

// ── Permitir login con Enter ─────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach(input => {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") login();
    });
  });

  // Activar chips de filtro
  const chips = document.querySelectorAll(".chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
    });
  });
});

// ── Cerrar sesión ────────────────────────────────────────────────────────────
function logout() {
  sessionStorage.removeItem("usuario");
  window.location.href = "../index.html";
}

// ── Utilidades ───────────────────────────────────────────────────────────────
function getUsuarioActual() {
  const data = sessionStorage.getItem("usuario");
  return data ? JSON.parse(data) : null;
}
