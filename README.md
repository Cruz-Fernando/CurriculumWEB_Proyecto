# 💼 Portfolio Futurista - Curriculum Vitae Interactivo

Un sitio web portfolio moderno con diseño futurista en colores dorado y blanco, que incluye animaciones dinámicas, efectos glassmorphism, mini-juegos interactivos y integración con APIs externas (GitHub, LinkedIn).

## ✨ Características

### 🎨 Diseño
- **Esquema de colores**: Dorado (#FFD700) y Blanco (#FFFFFF) con fondo oscuro
- **Efectos glassmorphism**: Fondos translúcidos con efecto de vidrio esmerilado
- **Animaciones fluidas**: Efectos de scroll, hover, y transiciones suaves
- **Sistema de partículas**: Fondo animado con partículas conectadas
- **Responsive**: Completamente adaptable a móviles, tablets y desktop

### 🚀 Secciones
1. **Hero** - Presentación inicial animada
2. **Sobre Mí** - Información personal, educación e intereses
3. **Habilidades** - Barras de progreso animadas con tus skills técnicas
4. **Experiencia** - Timeline de tu trayectoria profesional
5. **Mini-Juegos** - Tres juegos interactivos que demuestran habilidades
6. **Contacto** - Formulario de contacto y enlaces sociales

### 🎮 Mini-Juegos Incluidos
1. **Visualizador de Algoritmos** - Observa Bubble Sort y Selection Sort en acción
2. **Memory Matrix** - Juego de memoria con patrones
3. **Desafío de Código** - Test de velocidad de escritura con código

### 🔗 Integraciones
- **GitHub API** - Muestra tus estadísticas y repositorios automáticamente
- **LinkedIn** - Enlaces directos a tu perfil profesional
- **Redes Sociales** - Iconos animados para todas tus plataformas

## 📁 Estructura del Proyecto

```
CurriculumWEB_Proyecto/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Todos los estilos y diseño
├── js/
│   ├── main.js         # Animaciones e interacciones principales
│   ├── games.js        # Lógica de los mini-juegos
│   └── api.js          # Integración con APIs (GitHub, LinkedIn)
└── README.md           # Este archivo
```

## 🛠️ Configuración

### 1. Personalizar tu Información

#### En `index.html`:
- Línea 33: Cambia "TU NOMBRE AQUÍ" por tu nombre
- Línea 34: Actualiza tu título profesional
- Líneas 36-39: Modifica tu descripción personal
- Sección "Sobre Mí": Agrega tu historia, educación e intereses
- Sección "Experiencia": Actualiza con tu experiencia laboral real
- Sección "Contacto": Actualiza enlaces de redes sociales y email

#### En `js/api.js`:
- **Línea 7**: Cambia `'tuusuario'` por tu usuario de GitHub
- **Línea 11**: Cambia la URL por tu perfil de LinkedIn

```javascript
const API_CONFIG = {
    github: {
        username: 'tu-usuario-github',  // ← CAMBIAR AQUÍ
        token: null
    },
    linkedin: {
        profileUrl: 'https://linkedin.com/in/tu-usuario'  // ← CAMBIAR AQUÍ
    }
};
```

### 2. Agregar tu Foto de Perfil

Reemplaza el emoji 👨‍💻 en la sección "Sobre Mí" con tu foto:

```html
<!-- En index.html, línea ~93 -->
<div class="profile-image-wrapper glass-card">
    <img src="assets/tu-foto.jpg" alt="Tu Nombre" class="profile-image">
</div>
```

### 3. Actualizar Habilidades

En la sección de "Habilidades" en `index.html`, modifica las tecnologías y porcentajes según tu experiencia:

```html
<div class="skill-item glass-card">
    <div class="skill-name">Tu Tecnología</div>
    <div class="skill-bar">
        <div class="skill-progress" data-progress="85"></div>
    </div>
</div>
```

## 🚀 Cómo Ejecutar

### Opción 1: Abrir Directamente
Simplemente abre el archivo `index.html` en tu navegador favorito (Chrome, Firefox, Edge).

### Opción 2: Servidor Local (Recomendado)

Si tienes Node.js instalado:

```bash
# Opción 1: http-server
npx http-server -p 8080

# Opción 2: live-server (con recarga automática)
npx live-server --port=8080
```

Luego visita: `http://localhost:8080`

### Opción 3: Visual Studio Code
Si usas VS Code, instala la extensión "Live Server" y haz clic derecho en `index.html` → "Open with Live Server"

## 🎨 Personalización de Colores

Para cambiar el esquema de colores, edita las variables CSS en `css/styles.css`:

```css
:root {
  /* Cambia estos valores para personalizar los colores */
  --color-primary-gold: #FFD700;    /* Color dorado principal */
  --color-accent-gold: #FFA500;     /* Color dorado acento */
  --color-white: #FFFFFF;           /* Blanco */
  --color-background-dark: #0A0A0A; /* Fondo oscuro */
}
```

## 📱 Características Técnicas

### Tecnologías Utilizadas
- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno con variables CSS, Grid, Flexbox
- **JavaScript (ES6+)** - Interactividad y animaciones
- **Canvas API** - Sistema de partículas animadas
- **Intersection Observer API** - Animaciones activadas por scroll
- **GitHub API** - Integración con datos reales
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografías Orbitron y Rajdhani

### Optimizaciones
- ✅ Animaciones optimizadas con `requestAnimationFrame`
- ✅ Lazy loading de secciones
- ✅ Caché de datos de API
- ✅ Responsive design
- ✅ Accesibilidad (ARIA labels)

## 🎯 Próximos Pasos (Opcional)

### Deploy a la Web
Puedes publicar tu portfolio gratuitamente en:

1. **GitHub Pages**
   - Crea un repositorio en GitHub
   - Sube todos los archivos
   - Ve a Settings → Pages → Selecciona la rama main
   - Tu sitio estará en `https://tu-usuario.github.io/nombre-repo`

2. **Netlify** (Recomendado)
   - Regístrate en [netlify.com](https://netlify.com)
   - Arrastra la carpeta del proyecto
   - ¡Listo! Tendrás una URL personalizada

3. **Vercel**
   - Similar a Netlify
   - Ideal si quieres agregar funcionalidades backend después

### Agregar Funcionalidades
- [ ] Blog personal
- [ ] Galería de proyectos destacados
- [ ] Modo claro/oscuro
- [ ] Multiidioma (ES/EN)
- [ ] Formulario de contacto funcional con EmailJS
- [ ] Analytics con Google Analytics
- [ ] Más mini-juegos

## 📞 Soporte

Si encuentras algún problema o tienes preguntas:
1. Revisa que todos los archivos estén en las carpetas correctas
2. Verifica la consola del navegador (F12) para errores
3. Asegúrate de que tu usuario de GitHub esté correcto en `api.js`

## 📄 Licencia

Este proyecto es de código abierto. Siéntete libre de usarlo, modificarlo y compartirlo.

---

**Hecho con 💛 y mucho ☕**

¡Buena suerte con tu portfolio! 🚀
