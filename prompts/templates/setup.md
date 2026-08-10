# Setup Proyecto Frontend con Gulp

## Metadata
- **Versión:** v1.0
- **Creado:** Abril 2026
- **Funciona con:** GitHub Copilot Agent Mode
- **Modelos probados:** GPT-4o, GPT-4.1, Claude Haiku 4.5

---

## Cuándo usar este prompt

Usar cuando se inicia un nuevo proyecto frontend que necesite:
- Estructura de carpetas SCSS modular con partials
- Compilación con Gulp 4
- Optimización de imágenes (WebP, AVIF)
- Referencia a un proyecto anterior como base

---

## Variables a reemplazar

Antes de usar el prompt, reemplaza estos valores:

| Variable                  | Descripción                         | Ejemplo                    |
| ------------------------- | ----------------------------------- | -------------------------- |
| `{{NOMBRE_PROYECTO}}`     | Nombre de la carpeta del proyecto   | `12-DeliveryApp`           |
| `{{PROYECTO_REFERENCIA}}` | Proyecto anterior a tomar como base | `11-cafeteria`             |
| `{{PARTIALS}}`            | Lista de archivos SCSS parciales    | `_globales, _variables...` |

---

## Prompt — Fase 1: Plan (usar en modo Plan)

```
Analyze and create a detailed plan (without executing anything yet) for setting up
a frontend project called "{{NOMBRE_PROYECTO}}" that includes:

0. Before planning anything, locate the project "{{PROYECTO_REFERENCIA}}" in the
   current workspace and use it as a reference for folder structure, gulpfile.js
   configuration, and package.json dependencies. List what you found in it.

1. Creating the main project folder: {{NOMBRE_PROYECTO}}

2. Creating this folder structure inside it:
   - src/
     - img/      (empty folder)
     - scss/
       - base/
           {{PARTIALS}}
       - app.scss    (inside scss/, not base/)
     - index.html  (inside src/)

3. Running `npm init -y` inside {{NOMBRE_PROYECTO}} to generate package.json.

4. Creating a gulpfile.js in the root with the same configuration found in
   {{PROYECTO_REFERENCIA}}, adapted for this project's folder structure.

5. Replicating the same npm dependencies found in {{PROYECTO_REFERENCIA}}/package.json
   and installing them with `npm install`.

6. All scss partials (_*.scss) created as empty files.
7. index.html with a basic HTML5 boilerplate.
8. app.scss with @use imports (with underscore) for all partials inside base/.

For each step, tell me:
- What exactly you will do
- What files or folders will be created
- What commands will be executed
Do not execute anything, just show me the plan.
```

---

## Prompt — Fase 2: Ejecución (usar en modo Agent)

```
The plan looks good. Execute all steps now.
Use @use 'base/_partial' format (with underscore) for all imports in app.scss.
After generating the script, execute it automatically in the terminal.
```

---

## Resultado esperado

Al terminar deberías tener:

```
{{NOMBRE_PROYECTO}}/
├── src/
│   ├── img/
│   ├── scss/
│   │   ├── base/
│   │   │   ├── _globales.scss
│   │   │   ├── _index.scss
│   │   │   ├── _mixins.scss
│   │   │   ├── _normalize.scss
│   │   │   ├── _utilidades.scss
│   │   │   └── _variables.scss
│   │   └── app.scss
│   └── index.html
├── gulpfile.js
├── package.json
└── node_modules/
```

---

## Verificación

Después de ejecutar, corre estos comandos para confirmar que todo funciona:

```bash
cd {{NOMBRE_PROYECTO}}
gulp
```

Deberías ver que Gulp compila el SCSS y arranca en modo watch.

---

## Historial de versiones

| Versión | Cambios                                             |
| ------- | --------------------------------------------------- |
| v1.0    | Prompt inicial — creado con proyecto 12-DeliveryApp |

---

## Notas y aprendizajes

- El modo **Plan** primero permite detectar errores antes de ejecutar nada
- Copilot Agent puede crear archivos y ejecutar comandos directamente sin bash script
- Especificar el `_` en los `@use` imports evita inconsistencias con los nombres reales de archivos
- Dejar **Auto** en la selección de modelo funciona bien para tareas de este tipo
