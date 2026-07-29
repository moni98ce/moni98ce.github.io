# Moniruzzaman Moni — Personal Website

A responsive static website ready for GitHub Pages.

## Publish on GitHub Pages

1. Sign in to GitHub and create a new **public** repository, for example `moniruzzaman-moni`.
2. Upload every file and folder from this package to the repository root.
3. Open the repository's **Settings**.
4. Select **Pages** in the left menu.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/ (root)`, then click **Save**.
7. GitHub will display the live website address after deployment.

Typical address:

`https://YOUR-GITHUB-USERNAME.github.io/moniruzzaman-moni/`

## Recommended edits before publishing

- Replace the `MM` portrait placeholder with a professional headshot.
- Review all project descriptions and remove anything confidential or employer-sensitive.
- Add only contact information you are comfortable publishing publicly.
- Confirm employer naming and any required conflict-of-interest or disclaimer language.
- Add publication titles manually or link to Google Scholar, as this version does.

## Add a portrait

1. Save the photo as `assets/profile.jpg`.
2. In `index.html`, replace:

```html
<div class="portrait-placeholder" aria-hidden="true">MM</div>
```

with:

```html
<img class="profile-photo" src="assets/profile.jpg" alt="Dr. Moniruzzaman Moni">
```

3. Add this to `styles.css`:

```css
.profile-photo{width:150px;height:150px;object-fit:cover;border-radius:50%;margin-bottom:20px}
```

## Custom domain

After buying a domain, enter it under **Settings → Pages → Custom domain**. Follow GitHub's DNS instructions from your domain registrar.
