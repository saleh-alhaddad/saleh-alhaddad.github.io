# Saleh Salem Alhaddad - Portfolio Website

A modern, responsive portfolio website built with Jekyll and deployed on GitHub Pages. Features a clean, professional design with dark/light theme support and mobile optimization.

## 🏗️ Project Structure

```
.
├── _config.yml              # Main site configuration
├── _data/                   # Data files for content management
│   ├── author.yml          # Author information and bio
│   ├── navigation.yml      # Site navigation structure
│   └── social.yml          # Social media links
├── _includes/              # Reusable HTML components
│   ├── head.html          # HTML head with meta tags
│   ├── header.html        # Site navigation header
│   ├── footer.html        # Site footer
│   ├── social-sidebar.html # Social media sidebar
│   ├── loading-screen.html # Loading animation
│   └── navigation.html    # Quick navigation component
├── _layouts/               # Page layouts
│   ├── default.html       # Basic layout template
│   ├── modern.html        # Modern layout with all features
│   └── clean.html         # Minimal layout option
├── _site/                  # Generated site (auto-generated)
├── assets/                 # Static assets
│   ├── css/
│   │   └── modern.css     # Main stylesheet with theme system
│   ├── js/
│   │   └── modern.js      # JavaScript functionality
│   ├── images/            # Image assets
│   └── fonts/             # Custom fonts (if any)
├── pages/                  # Main site pages
│   ├── index.html         # Homepage
│   ├── about.html         # About page
│   ├── articles.html      # Articles/blog listing
│   └── contact.html       # Contact page
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Ruby 2.7+
- Bundler gem
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/saleh-alhaddad/saleh-alhaddad.github.io.git
   cd saleh-alhaddad.github.io
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Start the development server**
   ```bash
   bundle exec jekyll serve --livereload
   ```

4. **Open in browser**
   ```
   http://localhost:4000
   ```

## 🚢 Deployment

### GitHub Pages (Automatic)

The site automatically deploys when you push to the `main` branch.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

**Made with ❤️ using Jekyll & GitHub Pages & AI**