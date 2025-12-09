# Terminal.web Static HTML Pages

This directory contains static HTML versions of each page from the Terminal.web website view.

## Pages

### Main Pages
- **index.html** - Entry point that redirects to home.html
- **home.html** - Main landing page with hero section
- **features.html** - Showcase of key features
- **about.html** - Project information and description
- **contact.html** - Contact information page
- **theme.html** - Theme browser showing all available color schemes

### BSOD Pages (Under Construction)
These pages display a "Blue Screen of Death" error message indicating they're under construction:
- **learning.html** - Learning module (coming soon)
- **exam.html** - Exam module (coming soon)
- **glossary.html** - Glossary module (coming soon)

## Design

All pages follow a consistent design system:
- **Typography**: JetBrains Mono for terminal aesthetic, Inter for body text
- **Colors**: OKLCH color space for better perceptual uniformity
- **Layout**: Responsive design that works on mobile and desktop
- **Navigation**: Consistent nav bar across all pages (except BSOD pages)

## Accessing the Pages

When running the Vite dev server, these pages are accessible at:
- http://localhost:5173/home.html
- http://localhost:5173/features.html
- http://localhost:5173/about.html
- http://localhost:5173/contact.html
- http://localhost:5173/theme.html
- http://localhost:5173/learning.html
- http://localhost:5173/exam.html
- http://localhost:5173/glossary.html

## Integration with React App

These HTML files are separate from the main React application. They serve as:
1. Static documentation/reference
2. Individual page exports that can be hosted independently
3. Templates for future page implementations

The React app (in /src) provides the interactive terminal experience with all the dynamic features, while these HTML files provide standalone versions of the website content.
