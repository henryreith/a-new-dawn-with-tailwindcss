### Customisation
## Added Sections
- **announcement-bar-simple.liquid** - simple. So HTML can be added stright to the template and not via blocks
- **FAQ.liquid** - create FAQ section with table of content that deep links to questions e.g. for collection and product pages
- **extended-collection-banner.liquid** - Image with rich text overlay (CSS of background image needs updating to be more like the image with rich text overlay section)
- **benefit-inline.liquid** - icon + headline text
- **image-with-rich-text-overlay.liquid** - Image with rich text overlay which could be used for mission statement, or key product features
- **sub-menu.liquid** - Sub menu for the main menu. Can be used to link to key products, if you use the main menu as more of an informational link section e.g. about us, contact us, blog etc.
- **highlighted-products.liquid** - Section to show off specific variants. Can be used on any page. Can be used to show off specific variants of a product.
- **footer-modern.liquid** - Modern look to the footer. Including logo, tagline, social icons. Block based so can be customised in the theme editor & footer aside for currency selector, payment icons, but country selector has been left off for now.
- **drawer-cart-rec-product.liquid** - Product recommendations section rendered in the cart drawer with js.

**Note:** Most of these new sections have settings and block instructions in the en.default.schema.json file, but one or two don't yet. I'll add these in later updates.

## Added Snippets
- **Breadcrumbs** - used to display breadcrumbs on collection pages. Not implimented anywhere yet.
- **Variant Buy now / Add to cart button** - Used in highlighted products section where we display popular varients vs the whole product. So the add to cart buttons must be linked to the correct variant.

## Customised Default Sections
- **custom-liquid.liquid** - Added option to define page width.
- **cart-drawer.liquid** - Made 48rem wide using css in the template so it doesn't look like every other dawn site.

## Customised Default Snippets
- **social-icons.liquid** - Updated social media snippet to include title='Connect with {{ shop_name }} on X Network' & target='_blank' on links

## Customised CSS
**component-loading-spinner.css** - Updated the dashoffset from 280 to 285 and 50% from 75 to 80 just so it doesn't look like other Dawn sites. Small differences make the difference


## Settings updates
<!-- - Preload main stylesheets in theme.liquid at top of file as print and add on.load to change it to screen. This means they start to be be loaded instantly, and then they are left in as full stylesheet loads later on in the head, which means it will render block if they aren't loaded yet. -->
- **Change default color scheme color** rgba from 0.75 opacity to 0.9 so there is less of a difference between headers and main text color, plus when using mid-dark colors the text is more readable.

### Dev Setup
- **Tailwind CSS** - used to style the custom sections & snippets. It can be run using npm run tailwind:watch
- **Webpack** - used to compile and minify and css that is created outside of tailwind. e.g. a annimation scss file and custom css for sections where tailwind didn't have enough flexability. These spesific files are then loaded into sections on a per section basis. Webpack also compiles all the js files in the src folder and again these files are loaded into sections on a per section basis. It can be run using npm run dev - at present this option minify's the files but we'll come back to fix this so it's only minified for production. A npm run build is also available to minify the js and css files for production - but is not fully setup yet. 
- **husky** - NPM package, used to run lint-staged before a commit is made. This will run prettier and eslint on all files that are being commited. If there are any errors the commit will be stopped and the errors will need to be fixed before the commit can be made. This is not setup yet but will be in the future.
- **prettier** - NPM package, used to format the code. And @trelliscommerce/prettier-config is used to define the rules. Thank you to Trellis for this.
- **SCSS** - used to style the custom sections & snippets where tailwind doesn't do the full job needed.
- **Swiper** - Used for any custom swipers created on the website. 

## Folder Structure
- **src folder** - to keep all custom scss and js files before they are complied with webpack into the assets folder

Note: All other folders are the same as the default Dawn theme as this is required for any shopify theme. 

### Thanks & Shoutout's
- Shopify and the (Dawn theme)[https://github.com/Shopify/dawn] as this is the base theme used.
- And (TrellisCommerce & their Dawn starter theme)[https://github.com/TrellisCommerce/shopify-tailwind-starter-base] for the ideas on how to set up the base config for tailwind and webpack.

--------

Dawn 12.0.0 introduces additional customization options by adding color scheme pickers to new areas, and new ways to visually display product filters. It also introduces some performance improvements related to image loading. 

### Added
- Important: If you use a gradient as a main background, the look of your cart drawer and product modal (quick add) will be affected. 
- You can now select a color scheme for the Image with text section, Collection template (Product grid section), Product information section, Cart drawer, and Cart page.

### Changed
- If you are using the Search & Discovery app, you can now change the logical operator for facet filter values between OR and AND.
- If you are using the Search & Discovery app, you can now choose to apply a swatch visual style for certain filter types (references to metaobjects).

### Fixes and improvements
- We fixed an issue with facet filters that affected currencies that use comma separators.
- We fixed a formatting issue with metadata that is used for SEO purposes.
- We fixed a visual bug that was affecting the collage section.
- We fixed an issue with the “compare at” price to ensure more predictable behavior.
- We’ve improved the experience of adding items to cart on slower connections.
- We fixed a styling issue affecting collections in empty cart drawers.
- We fixed an issue in the Slideshow section where the next slide flashes before coming into view. 
- We’ve improved various visual elements on the Quick order list including font consistency, alignment, and spacing. 
- We fixed an issue affecting Quick order list on iOS, removing the need to double tap the info icon to open it.

### Removed
- Removed image tag attribute that indicated which images to load first. We will now allow the platform to determine this, which will improve performance.