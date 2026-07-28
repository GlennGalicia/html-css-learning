# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

This is Glenn Galicia's learning repository for HTML5/CSS3/Sass, structured as a series of numbered practice projects (`01-ecommerce` through `14-airbnb`), each self-contained. Later projects build on earlier ones — the setup workflow in `prompts/templates/setup.md` explicitly bootstraps a new numbered project by copying the folder structure, `gulpfile.js`, and `package.json` from the previous one.

Two project generations exist:
- **`01`–`10`**: static HTML + plain CSS, no build step, no `package.json`. Open the `.html` files directly or serve with Live Server (VS Code, port 5501 per `.vscode/settings.json`).
- **`11-cafeteria`, `12-DeliveryApp`, `13-PodcastApp`, `14-airbnb`**: Gulp + Sass builds, each with its own `package.json`, `gulpfile.js`, and `src/` → `build/` pipeline. These are independent Node projects — there is no root `package.json`; always `cd` into the specific project directory first.

### Course context — read before flagging inconsistencies

This repo follows a course, and the instructor intentionally varies folder organization and code patterns between lessons (`11`→`14`) to teach different approaches — it is **not** technical debt to unify. Concretely: the CommonJS-vs-ESM gulpfiles, the missing dev/build task split in `11`/`12`, and the `base/` partial differences documented below are the pedagogical progression of the course, not mistakes.

This also means **this repo is an exception to Glenn's global CLAUDE.md conventions** (7-1 architecture, mixins never forwarded through `_index.scss`, color tokens as CSS custom properties, etc.). Don't flag deviations from those global rules as issues in `11`–`14` unless Glenn is actively writing *new* code in the current lesson and asks for a review of it — the historical lessons stay as they are. Glenn's other projects outside this repo do follow the global conventions strictly.

The course is still in progress — `14-airbnb` is the latest of 19 planned lessons; 5 more numbered projects are still to come. Expect each to bring its own scaffolding, image pipeline, and folder architecture, same as the variation already seen across `11`–`14`. Don't assume a new lesson follows any prior one's pattern — check its own `gulpfile.js`/`package.json`/`src/scss` layout first, and update the sections below once it lands rather than extrapolating ahead of it.

## Commands (per Gulp-based project)

The Gulp projects are not uniform — two distinct generations exist. Always check the project's own `gulpfile.js`/`package.json` before assuming a command works.

**Package manager: pnpm.** `13-PodcastApp`, `14-airbnb`, and `15-realState` were migrated from npm to pnpm (each still independent — no workspace root, no root `package.json`). pnpm's content-addressable global store dedupes disk usage across these projects' shared devDependencies (`gulp`, `sass`, `autoprefixer`, etc.) without turning the repo into a monorepo. `11-cafeteria` and `12-DeliveryApp` are **not migrated yet** — see the note at the end of this section.

Two pnpm behaviors to expect the first time a project is installed/rebuilt:
- **Supply-chain trust policy**: pnpm blocks packages whose trust evidence (provenance/trusted-publisher) looks *weaker* than an earlier-published version of the same package (`ERR_PNPM_TRUST_DOWNGRADE`) — a signal of possible account takeover. This machine has `trustPolicyIgnoreAfter` set globally (`~/Library/Preferences/pnpm/config.yaml`, ~12 months) to silence the common benign case (old pre-2023 packages that simply predate npm's attestation rollout). A downgrade on a package published *recently* is not covered by that and should be investigated before overriding (`--trust-policy-exclude <pkg>`) — don't reach for the override reflexively.
- **Build script approval**: native-binary deps (`sharp`, `cwebp-bin`, `@parcel/watcher`, `es5-ext` — pulled in by `gulp-webp`/`gulp-avif`/`gulp watch`) need `pnpm approve-builds --all` followed by `pnpm rebuild` once per fresh install, or their postinstall/compile step is silently skipped and the corresponding gulp task will fail at runtime.

```bash
cd 14-airbnb && pnpm install   # first time only; then `pnpm approve-builds --all && pnpm rebuild` if it warns about ignored builds
pnpm dev                       # -> gulp default: imagenes -> versionWebp -> css (dev) -> watch
```
Tasks: `css` (sourcemaps, no `cssnano`) and `build` (`cssnano`, no sourcemaps) are separate functions, correctly following the dev/build split — `build` isn't wired into a package.json script, run `pnpm exec gulp build` if needed. `imagenes` copies `src/img/**/*` to `build/img`; `versionWebp` generates `.webp` from `png`/`jpg`. None of these three list `gulp-imagemin` anymore (it was an unused devDependency — removed during the pnpm migration since it pulled in a flagged transitive package and wasn't referenced by any of these gulpfiles).

**`11-cafeteria`, `12-DeliveryApp`** (CommonJS gulpfile, `"type": "commonjs"`, no npm script defined, **still on npm**):
```bash
cd 11-cafeteria && npm install   # first time only
npx gulp                         # default: images -> imgWebp -> imgAvif -> css -> watch
```
There is only one `css` task (no dev/build split) that already includes `cssnano` — in `12-DeliveryApp` the `cssnano` line is commented out, so its output is unminified despite the dependency being installed. Image tasks additionally generate `.avif` via `gulp-avif`/`gulp-imagemin`. Unlike `13`/`14`/`15`, these two projects actually invoke `gulp-imagemin` in their gulpfiles, and pnpm flags a transitive dependency of it (`fast-xml-parser`, via `imagemin-svgo`) with a more serious trust-downgrade signal (a recently-published version that lost its trusted-publisher status, not just an old pre-attestation package) — that needs a deliberate decision before migrating these two, not a blanket override. Until resolved, leave these on npm.

There is no lint or test tooling in this repository.

## Architecture (Gulp/Sass projects)

Each project's Sass entry point is `src/scss/app.scss`, containing only `@use` statements — no styles of its own.

Folder layout differs slightly by project vintage — check the actual project before assuming a layout:
- `11-cafeteria` uses page/section-based folders: `base/`, `header/`, `footer/`, `inicio/`, `internas/`, `utilidades/`.
- `13-PodcastApp` and `14-airbnb` use `base/` + `ui/` (with `14-airbnb` further nesting `ui/header/` and `ui/contenido/` by section).

Every Gulp project has a `base/` folder that `@forward`s its partials through `_index.scss`, always including `_normalize`, `_variables` (Sass `$variables` for fonts, breakpoints, and color tokens), `_mixins` (breakpoint mixins `telefono`/`tablet`/`desktop`, `@content`-based), and `_globales`. The last partial varies: `11-cafeteria` and `14-airbnb` add `_tipografia.scss`; `12-DeliveryApp` and `13-PodcastApp` add `_utilidades.scss` instead — check which one a given project actually has rather than assuming.

Section folders outside `base/` (e.g. `ui/header/_index.scss`, `ui/contenido/_index.scss`) follow the same `@forward`-through-`_index.scss` pattern. This, along with Sass `$variables` for color tokens, differs from Glenn's global CLAUDE.md conventions — per the course-context note above, that's intentional for this repo and not something to flag or refactor here.

Breakpoints (`$telefono: 480px`, `$tablet: 768px`, `$desktop: 1024px`) are consumed via mixins (`@include tablet { ... }`), mobile-first (`min-width`).

## Prompts directory

`prompts/templates/setup.md` documents the standard two-phase (Plan → Execute) prompt used to scaffold a new numbered Gulp project from a reference project. `prompts/project/*.md` holds the actual filled-in prompt used for a specific project (e.g. `12-DeliveryApp.md`). Consult these before scaffolding a new numbered project — they encode the expected folder structure and phased workflow (plan first, execute only after confirmation).

## Git

Branches are named after the project/feature being worked on (e.g. `airbnb`, `readme-info`) rather than the `feature/*` prefix convention in the global CLAUDE.md. `develop` is the integration branch; `main` is production. Per global instructions, Claude never runs `git`/`gh` commands directly — only suggests them.
