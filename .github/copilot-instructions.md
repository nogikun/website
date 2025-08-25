# NOGI's Illustration Website

NOGI's illustration website is a static HTML/CSS/JavaScript portfolio website showcasing artwork by NOGI, a university student specializing in AI. The site features both Japanese and English versions with navigation between artwork galleries, social media links, and personal information.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

**NEVER CANCEL any server commands - they start instantly and run continuously until stopped.**

Bootstrap and serve the website:
- Method 1 (Built-in Python): `python3 -m http.server 8000` -- NEVER CANCEL: Starts in 1-2 seconds and runs continuously.
- Method 2 (NPX Serve): `npx serve . -p 8080` -- NEVER CANCEL: First run takes 8 seconds (installs serve package), subsequent runs start in 1-2 seconds.

Stop servers when done:
- Python server: Use Ctrl+C or stop the process
- NPX serve: Use Ctrl+C or stop the process

## Website Access URLs
- Main site (Japanese): `http://localhost:8000/` or `http://localhost:8080/`
- English version: `http://localhost:8000/en/index.html` or `http://localhost:8080/en/index.html`
- Works gallery: `http://localhost:8000/works.html` or `http://localhost:8080/works.html`

## Validation

**CRITICAL: Always manually validate the website after making changes by testing these complete scenarios:**

1. **Homepage Navigation Test:**
   - Start a local server using one of the methods above
   - Navigate to the homepage
   - Verify the main heading "I'm NOGI !" displays correctly
   - Click the "作品" (Artworks) link and verify it navigates to works.html
   - Verify artwork images and navigation work on the works page

2. **Language Switching Test:**
   - From the main page, click the "en" link in the navigation menu
   - Verify the English page loads with "Hello!!" heading
   - Click "Artworks" link and verify English artwork page loads
   - Use "jp" link to return to Japanese version

3. **External Links Test:**
   - Verify social media links (Twitter, Blog, Profile) work correctly
   - Note: External CDN resources (jQuery, Google Fonts) may be blocked in sandboxed environments but the site remains functional

4. **Complete User Flow Test:**
   - Start from Japanese homepage
   - Navigate to works gallery and verify artwork displays
   - Switch to English version via "en" link
   - Navigate English works gallery
   - Return to Japanese version via "jp" link
   - Verify all content loads and displays correctly

**Expected Behavior:**
- Site loads successfully with both serving methods
- Navigation between pages works smoothly  
- Images display correctly (local images work, external images may be blocked in sandboxed environments)
- Text content displays in correct language
- Layout and styling render properly
- CDN resource errors (jQuery, Google Fonts) are expected in sandboxed environments but don't break functionality

**Common Issues in Sandboxed Environments:**
- JavaScript errors: `ReferenceError: $ is not defined` - Expected due to blocked jQuery CDN
- Network errors: `ERR_BLOCKED_BY_CLIENT` for external resources - Expected and harmless
- Missing fonts: Google Fonts blocked - Site uses fallback fonts automatically
- External images: Twitter/Pixiv images may not load - Expected in restricted environments

Always take screenshots of the website after significant changes to document the visual state.

## Repository Structure

### Key Directories and Files
```
/
├── index.html              # Main homepage (Japanese)
├── works.html             # Artwork gallery page
├── en/                    # English version directory
│   ├── index.html         # English homepage
│   ├── works.html         # English artwork gallery
│   └── [other pages]      # Other English pages
├── css/                   # Stylesheets
│   ├── base.css           # Base styles
│   ├── index.css          # Homepage styles
│   ├── works.css          # Gallery styles
│   └── [other css files]  # Component styles
├── js/                    # JavaScript files
│   ├── cssSetting.js      # CSS configuration
│   ├── imgChanger.js      # Image manipulation
│   └── [other js files]   # Utility scripts
├── images/                # Local image assets
├── .github/               # GitHub configuration
│   └── workflows/         # GitHub Actions
└── README.md              # Basic project information
```

### GitHub Actions
- The repository uses GitHub Pages for deployment via `.github/workflows/static.yml`
- No build process required - static files are deployed directly

## Common Tasks and Troubleshooting

### Making Content Changes
1. Edit HTML files directly for content changes
2. Edit CSS files in the `css/` directory for styling changes
3. Edit JavaScript files in the `js/` directory for functionality changes
4. Always test changes locally before committing

### Adding New Pages
1. Create new HTML file in root directory (for Japanese) or `en/` directory (for English)
2. Follow the existing structure and include necessary CSS/JS references
3. Update navigation menus in existing pages to link to new page
4. Test navigation works correctly

### Working with Images
- Local images are stored in the `images/` directory
- External images are loaded from CDNs (may be blocked in sandboxed environments)
- Always test image loading after making changes

### Debugging Issues
- Use browser developer tools to check for JavaScript errors
- Common issues: External CDN resources blocked (jQuery, Google Fonts) - site remains functional
- Check console for network errors if images don't load

### Frequently Used Commands
```bash
# Start development server (choose one method)
python3 -m http.server 8000           # Python method
npx serve . -p 8080                   # NPX serve method

# View repository structure
ls -la                                # Root directory contents
ls -la css/                           # CSS files
ls -la js/                            # JavaScript files
ls -la en/                            # English version files

# Quick validation
curl -s http://localhost:8000/ | grep "I'm NOGI"              # Test homepage loads
curl -s http://localhost:8000/en/index.html | grep "Hello!!"  # Test English page
```

### Key File Locations
- Main pages: `index.html`, `works.html`, `sns.html`, `news.html`
- English pages: `en/index.html`, `en/works.html`, `en/sns.html`
- Stylesheets: `css/base.css`, `css/index.css`, `css/works.css`
- Scripts: `js/cssSetting.js`, `js/imgChanger.js`, `js/menuControl.js`
- Images: `images/` directory (favicons, backgrounds, local artwork)
- GitHub config: `.github/workflows/static.yml` (deployment), `.github/copilot-instructions.md` (this file)

## File Serving Notes
- No compilation or build step required
- All files are served statically
- External dependencies loaded via CDN (jQuery, Google Fonts, etc.)
- Site works offline for core functionality even when CDN resources are blocked

## Language Structure
- Japanese version: Root directory (index.html, works.html, etc.)
- English version: `/en/` subdirectory with parallel structure
- Shared resources: CSS, JS, and images are shared between versions
- Navigation links use relative paths to switch between languages

Always serve the website locally and test functionality manually before considering any changes complete.