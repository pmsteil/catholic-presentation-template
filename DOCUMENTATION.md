# Catholic Presentation Template Documentation

This documentation provides comprehensive guidance on using and customizing the Catholic Presentation Template.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Template Structure](#template-structure)
3. [Creating Slides](#creating-slides)
4. [Sidebar Outline Configuration](#sidebar-outline-configuration)
5. [Using Catholic Design Elements](#using-catholic-design-elements)
6. [Scripture Formatting](#scripture-formatting)
7. [Customization Options](#customization-options)
8. [Advanced Usage](#advanced-usage)

## Getting Started

### Prerequisites

- A modern web browser
- Basic knowledge of HTML/CSS
- Optional: Web server for hosting

### Installation

1. Clone or download this repository
2. Open `index.html` in your browser
3. Navigate through the presentation using arrow keys

### Local Development

For local development with live reload capabilities:

1. Install [Node.js](https://nodejs.org/)
2. Use a local server like [http-server](https://www.npmjs.com/package/http-server) or [live-server](https://www.npmjs.com/package/live-server)

```bash
npm install -g live-server
live-server
```

## Template Structure

The template consists of the following key files:

- `index.html` - Main presentation file
- `css/catholic-theme.css` - Catholic design theme
- `js/sidebar-outline.js` - Sidebar synchronization functionality
- `img/` - Directory for images and assets

## Creating Slides

### Basic Slide Structure

```html
<section data-outline="Section Title">
  <h2>Slide Title</h2>
  <p class="fragment">Content that appears incrementally</p>
  
  <div class="fragment">
    <p>More content that appears together</p>
    <ul>
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
  </div>
</section>
```

### Scripture Formatting

For scripture quotes, use the provided scripture classes:

```html
<div class="scripture fragment">
  <p>In the beginning was the Word, and the Word was with God, and the Word was God.</p>
  <p class="scripture-reference">John 1:1</p>
</div>
```

### Vertical Slides

Create nested slides to organize related content:

```html
<section>
  <section data-outline="Main Topic">
    <h2>Main Topic</h2>
    <!-- Content for first slide -->
  </section>
  
  <section data-outline="Main Topic - Detail 1">
    <h3>Detail 1</h3>
    <!-- Content for second slide -->
  </section>
  
  <section data-outline="Main Topic - Detail 2">
    <h3>Detail 2</h3>
    <!-- Content for third slide -->
  </section>
</section>
```

## Sidebar Outline Configuration

### Slide Outline Labels

Use the `data-outline` attribute to define each slide's entry in the sidebar:

```html
<section data-outline="Introduction">
  <h2>Welcome</h2>
  <!-- Slide content -->
</section>
```

### Outline Synchronization

The sidebar outline automatically updates based on:
- Current active slide
- Fragments that have been revealed
- Slide progression through the presentation

## Using Catholic Design Elements

### Typography

The template uses traditional serif fonts:
- Headings: Cinzel (via Google Fonts)
- Body text: EB Garamond (via Google Fonts)

### Color Palette

A Catholic-inspired color palette is defined in CSS variables:
- `--catholic-red` (#8b0000) - Cardinal red
- `--catholic-gold` (#d4af37) - Traditional gold
- `--catholic-purple` (#4b0082) - Papal purple
- `--catholic-blue` (#000080) - Marian blue
- `--catholic-dark` (#000000) - Black (for backgrounds)

### Decorative Elements

Add decorative dividers with:

```html
<div class="catholic-divider"></div>
```

## Customization Options

### Changing the Background

The template uses a black background by default. To use an image background, modify the CSS in `catholic-theme.css`:

```css
body {
  background: var(--catholic-dark);
  /* For image background, uncomment: */
  /* background-image: url('../img/parchment-bg.jpg'); */
  /* background-size: cover; */
  /* background-attachment: fixed; */
}
```

### Customizing Colors

Modify color variables in `catholic-theme.css` to match specific requirements:

```css
:root {
  --catholic-red: #8b0000;     /* Change to your preferred red */
  --catholic-gold: #d4af37;    /* Change to your preferred gold */
  /* Other colors... */
}
```

### Adjusting the Sidebar

Change sidebar width or appearance in `catholic-theme.css`:

```css
#sidebar {
  width: 25%;           /* Adjust width as needed */
  background-color: rgba(0, 0, 0, 0.9);  /* Adjust opacity or color */
  /* Other properties... */
}
```

## Advanced Usage

### Custom Fragments Sequence

Create complex reveal sequences with fragment attributes:

```html
<p class="fragment fade-in">Appears first</p>
<p class="fragment fade-up">Appears second with upward animation</p>
<p class="fragment highlight-current-red">Highlighted in red when active</p>
```

### Adding Custom JavaScript

Extend the functionality by adding custom JavaScript in the `<script>` section of `index.html` or in a separate file.

### Using Reveal.js Plugins

The template is compatible with all Reveal.js plugins. Add them in the `index.html` file:

```html
<script src="path/to/plugin.js"></script>

<script>
  Reveal.initialize({
    // ... other options
    plugins: [ RevealMarkdown, RevealHighlight, RevealNotes, YourCustomPlugin ]
  });
</script>
```

## Troubleshooting

- **Sidebar not showing**: Ensure `sidebar-outline.js` is properly loaded
- **Fragments not syncing**: Check that your fragments have the proper `fragment` class
- **Images not loading**: Verify image paths are correct relative to `index.html`

## Resources

- [Reveal.js Documentation](https://revealjs.com/)
- [Catholic Color Symbolism](https://www.catholiccompany.com/magazine/colors-catholic-liturgical-year-6175)
- [Google Fonts](https://fonts.google.com/)