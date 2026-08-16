# Xingyi Zhang — Personal Collection

Static GitHub Pages edition of Xingyi Zhang's personal collection.

## Publish

1. Create a public GitHub repository named `xingyi-zhang.github.io`.
2. Upload this project's contents to the repository's `main` branch.
3. Open **Settings → Pages** and select **GitHub Actions** as the source.
4. The included workflow will build and publish the site automatically.

The finished URL will be <https://xingyi-zhang.github.io>.

## Edit the collection

- Cards and their filters live in `app/data.ts`.
- Page introductions live in their route folders under `app/`.
- Put image files in `public/images/` when they are ready.
- Push edits to `main`; GitHub Actions republishes the site.

## Preview locally

```bash
pnpm install
pnpm dev
```
