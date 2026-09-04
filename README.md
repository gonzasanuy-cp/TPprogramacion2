# Mi Agenda de Contactos

Proyecto web para Programación 2. Es una agenda personal para crear, buscar, editar, eliminar y destacar contactos. No usa frameworks ni necesita servidor.

## Cómo usarlo

1. Descargá o copiá la carpeta del proyecto.
2. Abrí `index.html` en cualquier navegador moderno.
3. Entrá a **Añadir** para guardar tu primer contacto.

Los contactos y la preferencia de tema se guardan en `localStorage`: permanecen al recargar la página en el mismo navegador.

## Estructura

```text
tp1/
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

