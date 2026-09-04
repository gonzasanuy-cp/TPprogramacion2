# Mi Agenda de Contactos

Proyecto web para Programación 2. Es una agenda personal para crear, buscar, editar, eliminar y destacar contactos. No usa frameworks ni necesita servidor.

## Cómo usarlo

1. Descargá o copiá la carpeta del proyecto.
2. Abrí `index.html` en cualquier navegador moderno.
3. Entrá a **Añadir** para guardar tu primer contacto.

Los contactos y la preferencia de tema se guardan en `localStorage`: permanecen al recargar la página en el mismo navegador.

## Estructura

```text
mi-agenda/
├── index.html              # Página de bienvenida
├── contactos.html          # Lista, buscador y ordenamiento
├── agregar.html            # Alta y edición de contactos
├── favoritos.html          # Contactos destacados
├── assets/
│   ├── css/estilos.css
│   ├── js/app.js
│   └── img/                # SVG livianos: avatar y favicon
└── capturas/               # Espacio para las capturas de entrega
```

## Funciones principales

- CRUD completo: crear, leer, editar y eliminar contactos.
- Datos de contacto: nombre, apellido, teléfono, correo, dirección, fecha, categoría, preferencia, favorito y foto opcional.
- Búsqueda instantánea por nombre, apellido o teléfono.
- Orden alfabético A-Z y Z-A.
- Favoritos en una página propia y con estrella para activar/desactivar.
- Validación visual mientras se completa el formulario.
- Foto predeterminada; la foto elegida se convierte a texto para poder guardarse localmente.
- Tema claro/oscuro persistente.

## Tecnologías y requisitos

- HTML5 semántico: `header`, `nav`, `main`, `section`, `article`, `footer`, `form` y `fieldset`.
- CSS3 propio con Flexbox y Grid; sin Bootstrap, Tailwind ni frameworks.
- JavaScript: DOM, eventos, funciones, condicionales, ciclos, arreglos y `localStorage`.
- Paleta base: `#0B132B`, `#1C2541`, `#3A506B`, `#5BC0BE`, `#6FFFE9`.
- Tipografía sans-serif.
- Diseño responsive: escritorio, tablet (menú hamburguesa) y celular (menos de 480 px).
- Interacciones: menú desplegable, animación de entrada/flotación, botones con hover, favoritos y cambio de tema.

## Capturas para entregar

Guardá aquí las capturas realizadas al abrir el proyecto:

1. `capturas/inicio.png` — página de inicio.
2. `capturas/contactos.png` — lista con contactos, buscador y ordenamiento.
3. `capturas/formulario.png` — validación en tiempo real.
4. `capturas/mobile.png` — menú hamburguesa o vista celular.

## Nota para explicar en clase

La función `obtenerContactos()` lee el arreglo desde `localStorage` y `guardarContactos()` lo vuelve a guardar. Al crear o editar, el formulario arma un objeto contacto. Las funciones de mostrar recorren el arreglo y generan las tarjetas visibles.
