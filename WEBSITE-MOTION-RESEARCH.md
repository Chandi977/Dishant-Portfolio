# Portfolio motion audit and redesign direction

Reviewed 6 September 2026 in `Portfolio - Copy`.

## Understanding

Extend the existing hero and Trionn ribbon's visual confidence across the portfolio: oversized typography, physical artwork layers, parallax, scroll-controlled sequences and 3D depth. The existing hero and ribbon remain the visual anchors. All new artwork comes from this project's assets.

## Codebase analysis

The live development server on port 3000 belongs to this copy. This folder has no Git metadata. Next.js App Router serves the homepage, `/gallery`, eight project routes generated from `data/projects.ts`, and the not-found route. Static export is configured. The copied `out` directory contains older project routes and is not evidence of the current source or development output.

The stack already contains React 19, TypeScript, Tailwind 4, GSAP/ScrollTrigger, Lenis, Framer Motion, Three.js, React Three Fiber and OGL. No animation dependency installation is necessary.

`PortfolioClient.tsx` owns homepage content, Lenis, GSAP entrance/scroll timelines, pointer effects and navigation. `SelectedWorkShowcase.tsx` owns its horizontal track and image parallax. `RibbonPortfolioSection.tsx` owns the sticky ribbon's progress; `ribbon/TrionnRibbon.tsx` owns its custom Three.js scene. `Reveal.tsx` already provides reusable entrance and text-mask effects. `DepthText.tsx` already provides extruded typography.

The gallery uses `data/scrapedProjects.ts`, category filters and an animated preview overlay. Case studies use the separate typed `data/projects.ts` contract, existing screenshot arrays and next-project navigation. No API route or database schema was found in the application source. Local NVIDIA configuration exists, but no environment-variable references or fetch calls were found in the inspected app/components/data source. This visual work does not require environment, API, schema or infrastructure changes.

### Section findings

| Area                | Existing state                                                                                                  | Design direction                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Navigation and hero | Strong giant masthead, cutout portrait, paper/ink/gold palette, entrance masks and layered parallax             | Preserve as the visual identity                                                                                      |
| Craft & Concept     | Serif heading, second portrait, small project tiles and rounded information surfaces                            | Oversized solid/outline typography, a photographic print and floating artwork with distinct scroll speeds            |
| Intro strip         | Existing opposing horizontal text movement                                                                      | Keep as a compact transition between chapters                                                                        |
| Selected Work       | Four projects in a sticky horizontal track, active progress and pointer tilt                                    | Increase artwork depth within the current track; preserve links and readable project information                     |
| About               | Dense four-column portrait/profile/skills composition, metrics; developer-oriented text in a CSS pseudo-element | Larger three-column introduction with an expertise strip and metric baseline; same actual profile content            |
| Experience          | Editorial heading, five role entries and credential/tool sidebar; desktop motion less developed than mobile     | Scroll-linked perspective on role entries, moving headline, sticky supporting credentials where the viewport permits |
| Ribbon              | Custom WebGL sequence over 7.5 desktop viewport heights, intro typography and closing wipe                      | Preserve its visual sequence as the principal 3D scene                                                               |
| Services            | Four text-heavy panels in a grid, similar entrance effects                                                      | Large artwork-led panels, sticky stacking and internal image parallax                                                |
| Contact and footer  | Existing extruded text, orbit outlines, magnetic email action and footer reveal                                 | Give the existing contact composition a scroll-controlled perspective entrance and stronger orbit depth              |
| Gallery             | Regular three-column archive and functional preview overlay                                                     | Alternating two-column artwork layout, independent depth movement, existing filtering and previews                   |
| Case studies        | Large titles, cover, screenshot grid, content reveals and next-project link                                     | Cover perspective/parallax and offset screenshot compositions using a reusable scroll layer                          |

## Reference research

These are references for specific design decisions, not a claim that their source code was copied or their runtime performance measured.

1. **[Trionn](https://trionn.com/)** — inspected live at several scroll positions. Its current homepage has a dark interactive 3D opening, restrained navigation, large typography, perspective-treated information panels and large project imagery. It differs from the earlier ribbon-based reference represented in this repository. The useful principle is continuity between typography, scene depth and project presentation. Keep this portfolio's own paper palette and ribbon.
2. **[Igloo Inc on Awwwards](https://www.awwwards.com/sites/igloo-inc)** — its Awwwards entry categorizes the experience under 3D, animation and transitions. Useful direction: treat immersive motion as a composed scene, with a limited palette and legible interface around it. The live site's motion was not independently benchmarked in this audit.
3. **[Dennis Snellenberg on Awwwards](https://www.awwwards.com/sites/dennis-snellenberg)** — portfolio reference for the interaction research shortlist. Use as a secondary reference for project presentation and navigation; the Awwwards listing was read, rather than claiming a full live interaction audit.
4. **[GRASS: Scroll-Triggered 3D Product Animation on Dribbble](https://dribbble.com/shots/20298536-Scroll-Triggered-3D-Product-Animation-GRASS)** — the creator describes an interactive scrollytelling microsite for Vionaro V8. Applicable principle: scroll progress should reveal a meaningful new state. For this portfolio, artwork, title and description should arrive as one sequence.
5. **[Davide Perozzi: Developer Portfolio Page Transition on Dribbble](https://dribbble.com/shots/6255938-Developer-Portfolio-Page-Transition-and-Animation)** — a portfolio transition study. Useful reference for treating project navigation as part of the visual experience. Full route-cover transitions are a possible later extension; they are not implemented here.

### React Bits shortlist

[React Bits](https://github.com/DavidHDev/react-bits) provides individual customizable components with TypeScript variants. Its component pages are largely client rendered; page availability and the main repository were checked, not every component's implementation.

| Reference                                                                | Appropriate use here                                     | Decision                                                                              |
| ------------------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [Scroll Stack](https://reactbits.dev/components/scroll-stack)            | Services unfolding as large sheets                       | Implement the stacking pattern with existing CSS sticky and GSAP                      |
| [Tilted Card](https://reactbits.dev/components/tilted-card)              | Project artwork responding to depth and pointer position | Extend the existing project tilt rather than introduce a second owner                 |
| [Scroll Reveal](https://reactbits.dev/text-animations/scroll-reveal)     | A statement gaining emphasis with scroll                 | Existing GSAP and Reveal utilities cover the required behavior                        |
| [Scroll Velocity](https://reactbits.dev/text-animations/scroll-velocity) | Expressive typographic transition                        | Useful later refinement; current opposing marquee remains                             |
| [Flowing Menu](https://reactbits.dev/components/flowing-menu)            | Image-rich service/navigation interactions               | Keep as an alternative to the implemented artwork panels                              |
| [Circular Gallery](https://reactbits.dev/components/circular-gallery)    | Experimental 3D archive                                  | Optional future gallery mode; preserve the current searchable/filterable archive flow |

The implementation is original work using existing dependencies, informed by these patterns. It does not vendor React Bits source. A second full-screen WebGL scene is unnecessary for extending the visual language: DOM perspective and artwork parallax can provide depth between the hero and ribbon.

## Plan and implementation

- `components/motion/editorialMotion.ts`: scoped homepage scroll sequences, created within the existing GSAP lifecycle and responsive to desktop/reduced-motion media conditions.
- `components/ScrollScene.tsx`: a reusable scroll transform wrapper for gallery and case-study artwork. Its transform belongs to a different DOM layer from the existing Framer Motion entrance effects.
- `components/PortfolioClient.tsx`: integrate the section timelines and existing service artwork/project destinations.
- `components/SelectedWorkShowcase.tsx`: stronger artwork parallax/depth and a reduced-motion path.
- `components/GalleryClient.tsx`: artwork scroll wrappers and reduced-motion entry behavior; retain filters and previews.
- `app/work/[slug]/page.tsx`: wrap cover/screenshots while keeping the server-rendered page and project data contract.
- `app/editorial-motion.css` and its import in `app/layout.tsx`: scoped visual composition, responsive layouts and motion fallbacks.

The alternative is a new all-page WebGL scene with a camera moving between every section. That would require more asset production, loading coordination and interaction work, and would substantially change the existing architecture. This iteration extends the current architecture.

## Review and risks

- The original hero markup and ribbon rendering implementation are preserved.
- Existing entrance helpers are reused; new GSAP transforms operate on separate layers or replace the corresponding old homepage timelines.
- ScrollTrigger cleanup and media-query cleanup prevent new timeline accumulation on navigation. See [GSAP ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
- The existing ribbon runs its own continuous rendering loop and lacks a full reduced-motion alternative. The new effects do not establish complete sitewide reduced-motion compliance. A still-artwork fallback for that existing scene would be a separate worthwhile change.
- Existing homepage, ribbon and depth-text render loops are not a single centralized renderer. Adding more shader scenes should follow profiling on physical mobile hardware.
- Existing content has inconsistencies: layout metadata says 5+ years while page copy says 6+; the same 15+ figure has different labels. These were not silently reconciled or independently verified.
- Baseline rendering included a Next.js image LCP advisory. Browser and lint observations are development checks, not production performance scores.
- Reduced-motion page-load testing reproduced an existing hydration mismatch in the homepage navigation's initial style and the shared footer Reveal. These components condition their initial server-rendered styles on a client media preference. The issue is recorded here; the hero/navigation animation and shared Reveal implementation were not redesigned in this change.

## Testing and rollback

Use the running development server and hot reload. Type-check without emitting a build; lint only the affected files. No full production rebuild is required to review these changes.

Manual checks:

1. Scroll the homepage slowly in both directions at 1440px; verify complete artwork/text states, readable stacked service panels and arrival at Contact.
2. Check the hero and ribbon against the original visual composition, including the ribbon's opening, midpoint and closing wipe.
3. At 390px, check the menu, all sections and horizontal document overflow. At tablet widths, confirm the natural vertical flow.
4. In Gallery, change categories, open/close previews, navigate between projects and return to the index.
5. Open a case study directly; check images, outbound links and the next-project route. Visit a second case study to check shared rendering.
6. Enable reduced motion; check that the new scroll effects stop and selected work remains readable. Inspect existing ribbon behavior separately.
7. Check a short desktop viewport: tall content must remain reachable without being clipped inside a sticky stage.

Original versions of modified pre-existing files are saved under `output/redesign-backup/`. To roll back, restore those individual files and remove the newly introduced motion helpers/style import. Leave unrelated workspace files untouched. This folder has no Git repository, so do not use `git reset` as a rollback procedure.

### Validation completed

- `npx tsc --noEmit --incremental false`: passed after the final source edits.
- Focused ESLint on the seven affected TS/TSX files: zero errors; two pre-existing unused-prop warnings in GalleryClient (`projectCount`, `videoCount`).
- Original hero markup compared against the saved backup: identical.
- Desktop screenshots reviewed at 1440 × 900 for the major homepage scenes, Services stacking, gallery and two case studies.
- Homepage samples at 390 × 844: no horizontal document overflow at Hero, Craft, About, Services or Contact. An inherited offscreen-reveal overflow was contained within its section.
- 768 × 1024 Services/tablet overflow check: passed. 1440 × 720 About layout reviewed with natural scrolling for short desktop screens.
- Mobile menu opening and About navigation: passed. Contact's first heading line was explicitly checked for full opacity after a direct scroll; the mobile reveal setup was corrected to avoid leaving that first element hidden after refresh.
- Gallery Packaging filter and reset to All: passed. Preview opening and closing: passed. Phone gallery overflow: passed after containing the category rail.
- `/work/prem-industries` and `/work/hapito-packaging`: HTTP 200 with screenshot content. Next-project navigation from Hapito to `/work/teak-traditions-work`: passed. Phone case-study overflow: passed. The route test completed without page errors.
- Reduced-motion Selected Work: natural layout with all four cards visible. The new scroll wrapper observes media changes. The separate existing navigation/footer hydration issue and ribbon limitation remain as documented above.
- Screenshots and reproducible browser checks are in `output/playwright/` with `redesign-` and `qa-` prefixes. No claim is made about physical-device frame rates, Lighthouse scores or a production deployment.
