# Drupal Custom Modules & Themes

This repository contains a collection of **custom Drupal modules** and **drupal custom themes** developed to enhance and streamline Drupal site development. These modules are reusable, developer-friendly, and focused on extending core Drupal features while adhering to Drupal coding standards.

---

## 📁 Repository Structure

```bash
├── drupal-custom-modules/
│   ├── admin_style_tweaks/
│   ├── main_navigation_seed/
│   ├── custom_entities/
│   ├── admin_dashboard_tweaks/
│   ├── academics_course_finder/
│   └── program_finder/
└── drupal-custom-themes/
    ├── bloomix_base/
    ├── novaspire/
    └── fluxio/
    

---

## 🧩 Custom Drupal Modules

### 1. `admin_style_tweaks`

**Purpose:**  
Enhances the Drupal admin experience with custom styles and scripts.

**Features:**
- Injects custom CSS and JavaScript into admin pages.
- Improves usability and accessibility for content editors by changing orders of custom fields.
- Adds subtle admin UI improvements such as button enhancements, layout tweaks, etc.

**Use Cases:**
- Customize the Claro or Gin admin theme without altering core files.
- Improve workflow for site admins and editors.

---

### 2. `main_navigation_seed`

**Purpose:**  
Automatically seeds the main navigation menu and essential system blocks during initial setup.

**Features:**
- Creates default main menu items (e.g., Home, About, Contact).
- Places blocks like "Main Navigation" and "Footer" in appropriate regions.
- Helps projects with common layout requirements.

**Use Cases:**
- Save time during site installation and prototyping.
- Ensure consistent navigation structure across environments or installations.

---

### 3. `custom_entities`

**Purpose:**  
Provides custom content entities for structured data management on the site.

**Features:**
- Defines the following custom entities:
  - `Demand`
  - `Project`
  - `Meeting`
  - `Resource`
  - `Social`
  - `Profile`
- Includes schema, CRUD operations, form handling, and admin UI integration for each entity.
- Extendable for workflows, relationships, and field-level permissions.

**Use Cases:**
- Useful for complex platforms like collaborative networks, portfolios, or service directories.
- Centralized structure for managing distinct content types beyond standard nodes.

---

### 4. `admin_dashboard_tweaks`

**Purpose:**  
Adds enhancements and automation to the Drupal admin dashboard.

**Features:**
- UI tweaks for better usability on the admin theme.
- Provides cron-based automation for:
  - Importing Media files.
  - Importing Faculty content (nodes).
- Custom styles for a cleaner admin interface experience.

**Use Cases:**
- Useful for content-heavy sites where regular data imports are needed.
- Streamlines admin tasks for site editors and managers.

---

### 5. `academics_course_finder`

**Purpose:**  
Provides a Program Finder that lists all academic courses and programs.

**Features:**
- Displays a structured, filterable list of programs or courses.
- Supports integration with `Program` or `Course` content types.
- Theming-ready with custom templates and layouts.
- Configurable route and URL path from the admin UI.

**Use Cases:**
- Ideal for universities, colleges, or learning platforms needing searchable academic directories.
- Can be extended with filters, views integration, or taxonomy-based browsing.

---

### 6. `program_finder`

**Purpose:**  
Displays a customizable listing of nodes from the **Programs** content type on Dynamic Route.

**Features:**
- Dynamic route rendering via custom controller.
- Admin-configurable path (e.g., `/finder`) through site configuration.
- Clean, themeable Twig templates.
- Extendable with filters, search, or taxonomy-based refinement.

**Use Cases:**
- Build a searchable directory of academic programs.
- Use in portals where structured listings are needed.

---

## 1. Custom Theme: `bloomix_base`

**Theme Type:**  
Custom base theme for Drupal 10+, optionally using custom grid.

**Purpose:**  
A lightweight, responsive starter theme to integrated developed frontend layout quickly and cleanly.

**Key Features:**
- Mobile-first design, grid-ready layout.
- Organized folder structure for CSS, JS, and Twig templates.
- Basic styling for Drupal core elements (nodes, views, menus, forms).
- Extendable with Sass, PostCSS, or utility frameworks.

**Directory Structure:**

bloomix_base/
├── css/
│ └── custom.css
├── js/
│ └── custom.js
├── images/
│ └── wordmark.png
├── layouts/ck_twocol/
│ └── layout--ck-twocol.html.twig
├── public/assets/
│ └── *.svg
├── templates/
│ └── */*.html.twig
├── logo.svg
├── favicon.ico
├── bloomix_base.info.yml
├── bloomix_base.theme
├── bloomix_base.layouts.yml
└── bloomix_base.libraries.yml

**Use Cases:**
- Serve as a base theme for multiple projects.
- Reduce redundant boilerplate and unify branding across sites.

---

## 2. Custom Theme: `novaspire`

**Theme Type:**  
Custom base theme for Drupal 10+, optionally using custom grid.

**Purpose:**  
A lightweight, responsive starter theme to integrated developed frontend layout quickly and cleanly.

**Key Features:**
- Mobile-first design, grid-ready layout.
- Organized folder structure for CSS, JS, and Twig templates.
- Basic styling for Drupal core elements (nodes, views, menus, forms).
- Extendable with Sass, PostCSS, or utility frameworks.

**Directory Structure:**

novaspire/
├── css/
│ └── custom.css
├── js/
│ └── custom.js
├── dist/assets/
│ └── *.svg
├── src/
│ └── */*.*
├── templates/
│ └── */*.html.twig
├── screenshot.png
├── favicon.ico
├── novaspire.info.yml
├── novaspire.theme
├── novaspire.layouts.yml
└── novaspire.libraries.yml

**Use Cases:**
- Serve as a base theme for multiple projects.
- Reduce redundant boilerplate and unify branding across sites.

---

## 3. Custom Theme: `fluxio`

**Theme Type:**  
Custom base theme for Drupal 10+, optionally using custom grid.

**Purpose:**  
A lightweight, responsive starter theme to integrated developed frontend layout quickly and cleanly.

**Key Features:**
- Mobile-first design, grid-ready layout.
- Organized folder structure for CSS, JS, and Twig templates.
- Basic styling for Drupal core elements (nodes, views, menus, forms).
- Extendable with Sass, PostCSS, or utility frameworks.

**Directory Structure:**

fluxio/
├── css/
│ └── custom.css
├── js/
│ └── custom.js
├── dist/assets/
│ └── *.svg
├── src/
│ └── */*.*
├── templates/
│ └── */*.html.twig
├── public/assets/
│ └── *.svg
├── screenshot.png
├── favicon.ico
├── novaspire.info.yml
├── novaspire.theme
└── novaspire.libraries.yml

**Use Cases:**
- Serve as a base theme for multiple projects.
- Reduce redundant boilerplate and unify branding across sites.

---

## 🚀 Installation

To use these modules and theme in your Drupal project:

1. **Clone the repository** inside your Drupal root (outside `/web` if using Composer):


2. Copy modules and theme into your Drupal project:
# Copy modules
cp -r drupal-custom-modules/* web/modules/custom/

# Copy theme
cp -r drupal-custom-themes/* web/themes/custom/

3. Enable modules and theme:
drush en admin_style_tweaks main_navigation_seed program_finder
drush theme:enable bloomix_base

4. (Optional) Set bloomix_base as default theme:
drush config:set system.theme default bloomix_base
