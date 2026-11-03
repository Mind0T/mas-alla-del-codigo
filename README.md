# Más allá del código

Presentación web para la charla **"Más allá del código: El algoritmo de la actitud y la resiliencia"** (30 min).
Sitio estático en HTML, CSS y JavaScript, sin dependencias ni build. Listo para Vercel.

## Estructura

```
.
├── index.html        # Todas las diapositivas + notas del orador (guion)
├── css/
│   ├── tokens.css    # Branding SCD CDMX 2026: colores y tipografías
│   ├── fonts.css     # @font-face de las fuentes incluidas
│   └── deck.css      # Layout, marcos con grecas y componentes
├── js/
│   └── deck.js       # Navegación, escalado, notas y cronómetro
├── assets/
│   ├── fonts/        # Silkscreen, Josefin Sans, JetBrains Mono (woff2, funcionan sin internet)
│   └── img/
│       ├── *.webp    # Originales de la identidad (alta resolución)
│       └── web/      # Versiones optimizadas que usa la presentación
└── vercel.json
```

## Cómo presentar

| Tecla | Acción |
|---|---|
| `→` / espacio / clicker | Siguiente |
| `←` | Anterior |
| `N` | Notas del orador con el guion y cronómetro por bloque |
| `T` | Reiniciar cronómetro |
| `F` | Pantalla completa |
| `?` | Atajos |

- Cada diapositiva tiene su URL: `/#s5` abre la 5.
- El cronómetro arranca al pasar la portada y se pone en rojo si te pasas del minuto objetivo del bloque.
- Las notas salen del `<aside class="notes">` de cada `<section>` en `index.html`.

## Identidad visual

Basada en el kit de speakers del AWS Student Community Day CDMX 2026:

- **Color:** fondo `#0E0E19`, naranja `#D85A2F`, turquesa `#5DBEC2`, magenta `#AB3B8D`, azul `#4285C5`, lila `#B9A7E0`. Cada bloque de la charla usa un acento.
- **Tipografía:** Silkscreen (pixel) para etiquetas, portada y separadores; Josefin Sans Bold para titulares.
- **Gráficos:** cenefa y esquinas de grecas (`56`, `57`), trazos de luz (`58`, `59`), ilustraciones de la CDMX y Fetch, la mascota.
- Para cambiar una ilustración: optimízala a `assets/img/web/` y cambia el `src` del `<img class="art">` en `index.html`.
- Falta reemplazar `[Nombre de la ponente]` en la portada y en el cierre.

## Correr en local

```bash
npx serve .
# o
python3 -m http.server 8000
```

## Desplegar en Vercel

1. En vercel.com → **Add New… → Project** → importa este repositorio.
2. Framework Preset: **Other**. Sin build command. Output directory: raíz (`.`).
3. **Deploy**. Cada `git push` a `main` vuelve a desplegar.
