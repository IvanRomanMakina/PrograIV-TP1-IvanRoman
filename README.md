# PrograIV-TP1-IvanRoman

# Cine Burga - Sistema Integral de Gestión y Venta de Entradas

Repositorio oficial del Trabajo Práctico de **Programación IV (C2) - UTN**. Plataforma web integral para la gestión y comercialización de entradas de cine, desarrollada como Progressive Web Application (PWA).

---

## 🚀 Stack Tecnológico
* **Frontend:** Angular (Arquitectura modular basada en componentes *standalone*).
* **Backend as a Service (BaaS):** Supabase (Base de datos en tiempo real, autenticación y almacenamiento).
* **Estilos e Interfaz:** Tema personalizado *Cyber Burn* (Diseño responsivo y de alto contraste).

---

## 👥 Roles y Permisos del Sistema
El sistema contempla tres perfiles principales con accesos diferenciados:

1. **Cliente (Anónimo y Registrado):**
   * Visualización del catálogo de películas y cartelera (Top 3, Próximamente y Preventa).
   * Registro de usuarios con validaciones de datos específicos (fecha de nacimiento, etc.) y cupones de bienvenida.
   * Selección en tiempo real de butacas en salas distribuidas en 20 filas (A-T), incluyendo filas adaptadas para personas con discapacidad (J-K) y zonas VIP (R-S-T).
   * Compra integrada de entradas y productos de confitería (Candy Bar) unificados bajo un mismo código QR].
   * Sección "Mis películas", historial de funciones y sistema de reseñas con calificaciones.
   * Programa de fidelización de puntos por cada peso gastado y canje de recompensas.

2. **Empleado:**
   * Módulo validador para escaneo rápido de códigos QR (entradas y confitería).
   * Opción de ingreso manual de códigos ante fallas técnicas y control de invalidación automática post-uso.

3. **Administrador:**
   * Control total y centralizado de salas, funciones, precios, butacas, productos y cupones.
   * Reportes diarios de facturación y entradas vendidas con exportación directa a PDF y Excel.
   * Gráficos estadísticos de rendimiento y log de auditoría detallado con estampa de tiempo.

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
