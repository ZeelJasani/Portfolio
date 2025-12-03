# Cleanup Guide

Based on the analysis of your active features, here is the list of folders and files that can be safely deleted to clean up your codebase.

> [!WARNING]
> Before deleting, make sure to back up your project or commit your current changes to Git.

## 1. Top-Level Folders to Delete

These folders are completely unrelated to your portfolio website.

- `packages/` (Contains the CLI tool `ncdai`)
- `public/r/` (Contains registry JSON definitions)
- `src/__registry__/` (Contains auto-generated registry files)

## 2. Unused Routes

This route is explicitly marked as disabled/legacy.

- `src/app/(app)/projects/` (Delete the whole folder)

## 3. Unused Registry Components

Your portfolio only uses `flip-sentences`. All other registry components can be deleted.

**Delete these folders in `src/registry/`:**

- `src/registry/apple-hello-effect/`
- `src/registry/examples/`
- `src/registry/github-stars/`
- `src/registry/shimmering-text/`
- `src/registry/slide-to-unlock/`
- `src/registry/testimonials-marquee/`
- `src/registry/theme-switcher/`
- `src/registry/wheel-picker/`
- `src/registry/work-experience/`

**Delete these files in `src/registry/`:**

- `src/registry/index.ts`
- `src/registry/registry-blocks.ts`
- `src/registry/registry-components.ts`
- `src/registry/registry-examples.ts`
- `src/registry/registry-hook.ts`
- `src/registry/registry-lib.ts`

> [!IMPORTANT]
> **DO NOT DELETE** `src/registry/flip-sentences/`. It is used in your Profile Header.

## 4. Unused Scripts & Components

- `src/scripts/capture.mts` (Screenshot utility)
- `src/components/registry-command-animated.tsx` (Unused component)

## 5. Advanced Cleanup (Requires Code Changes)

The following files are likely unused but are imported by `src/components/mdx.tsx`. To delete them, you must first remove their imports from `src/components/mdx.tsx`.

- `src/components/component-preview.tsx`
- `src/components/component-source.tsx`
- `src/components/v0-open-button.tsx`
- `src/components/code-block-command.tsx`
- `src/components/code-tabs.tsx`
- `src/components/copy-button.tsx` (Check if used elsewhere)

## Summary of Immediate Deletion List

```text
packages/
public/r/
src/__registry__/
src/app/(app)/projects/
src/registry/apple-hello-effect/
src/registry/examples/
src/registry/github-stars/
src/registry/shimmering-text/
src/registry/slide-to-unlock/
src/registry/testimonials-marquee/
src/registry/theme-switcher/
src/registry/wheel-picker/
src/registry/work-experience/
src/registry/index.ts
src/registry/registry-blocks.ts
src/registry/registry-components.ts
src/registry/registry-examples.ts
src/registry/registry-hook.ts
src/registry/registry-lib.ts
src/scripts/capture.mts
src/components/registry-command-animated.tsx
```
