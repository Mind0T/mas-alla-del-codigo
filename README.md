# Más allá del código

Presentación web para la charla **"Más allá del código: El algoritmo de la actitud y la resiliencia"** (30 min).
Sitio estático en HTML, CSS y JavaScript, sin dependencias ni build. Listo para Vercel.

## Estructura

```
.
├── index.html        # Todas las diapositivas + notas del orador (guion)
├── css/
│   ├── tokens.css    # Branding: colores y tipografías (cambia aquí la identidad)
│   └── deck.css      # Layout y componentes de las diapositivas
├── js/
│   └── deck.js       # Navegación, escalado, notas y cronómetro
├── assets/           # Logos e imágenes del branding (identidad-XX.png)
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

## Aplicar el branding oficial

1. Cambia los HEX y las familias en `css/tokens.css`.
2. Si cambias de fuentes, actualiza el `<link>` de Google Fonts en `index.html`.
3. Copia los logos a `assets/` y agrégalos donde los necesites (p. ej. en la portada o el `.hud`).
4. Reemplaza `[Nombre de la ponente]` en la portada y en el cierre.

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
