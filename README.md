# PrograIV-TP1-IvanRoman

# Cine Burga - Sistema Integral de Gestión y Venta de Entradas

Repositorio oficial del Trabajo Práctico de **Programación IV (C2) - UTN**. Plataforma web integral para la gestión y comercialización de entradas de cine, desarrollada como Progressive Web Application (PWA)[cite: 1].

---

## 🚀 Stack Tecnológico
* **Frontend:** Angular (Arquitectura modular basada en componentes *standalone*).
* **Backend as a Service (BaaS):** Supabase (Base de datos en tiempo real, autenticación y almacenamiento)[cite: 1].
* **Estilos e Interfaz:** Tema personalizado *Cyber Burn* (Diseño responsivo y de alto contraste).

---

## 👥 Roles y Permisos del Sistema
El sistema contempla tres perfiles principales con accesos diferenciados[cite: 1]:

1. **Cliente (Anónimo y Registrado):**
   * Visualización del catálogo de películas y cartelera (Top 3, Próximamente y Preventa)[cite: 1, 2].
   * Registro de usuarios con validaciones de datos específicos (fecha de nacimiento, etc.) y cupones de bienvenida[cite: 2].
   * Selección en tiempo real de butacas en salas distribuidas en 20 filas (A-T), incluyendo filas adaptadas para personas con discapacidad (J-K) y zonas VIP (R-S-T)[cite: 1, 2].
   * Compra integrada de entradas y productos de confitería (Candy Bar) unificados bajo un mismo código QR[cite: 2].
   * Sección "Mis películas", historial de funciones y sistema de reseñas con calificaciones[cite: 2].
   * Programa de fidelización de puntos por cada peso gastado y canje de recompensas[cite: 2].

2. **Empleado:**
   * Módulo validador para escaneo rápido de códigos QR (entradas y confitería)[cite: 3].
   * Opción de ingreso manual de códigos ante fallas técnicas y control de invalidación automática post-uso[cite: 3].

3. **Administrador:**
   * Control total y centralizado de salas, funciones, precios, butacas, productos y cupones[cite: 3].
   * Reportes diarios de facturación y entradas vendidas con exportación directa a PDF y Excel[cite: 3].
   * Gráficos estadísticos de rendimiento y log de auditoría detallado con estampa de tiempo[cite: 3].

---

## 📋 Resumen de Módulos

| Módulo / Funcionalidad | Cliente (Anónimo) | Cliente (Registrado) | Empleado | Administrador |
| :--- | :---: | :---: | :---: | :---: |
| **Cartelera y Buscador** | Sí | Sí | Sí | Sí |
| **Compra de Entradas y Candy** | Sí | Sí | No | Sí |
| **Reseñas y Puntuaciones** | No | Sí | No | Sí |
| **Programa de Fidelización (Puntos)** | No | Sí | No | Sí |
| **Validación de QRs (Entrada / Candy)** | No | No | Sí | Sí |
| **Gestión del Sistema y Reportes** | No | No | No | Sí |

---
