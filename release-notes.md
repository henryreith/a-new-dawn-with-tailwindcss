### Customisation
## Added Sections
- **announcement-bar-simple.liquid** - simple. So HTML can be added stright to the template and not via blocks.
- **home-page-hero.liquid** - A modern looking hero area for the home page. Including a title, subtitle, button and image sliders.
- **FAQ.liquid** - create FAQ section with table of content that deep links to questions e.g. for collection and product pages
- **extended-collection-banner.liquid** - Image with rich text overlay (CSS of background image needs updating to be more like the image with rich text overlay section)
- **benefit-inline.liquid** - icon + headline text
- **image-with-rich-text-overlay.liquid** - Image with rich text overlay which could be used for mission statement, or key product features.
- **liquid-with-text.liquid** - Liquid with text section. This takes the Dawn image with text and gives the option for including liquid instead. This is useful for including a video or a map.
- **sub-menu.liquid** - Sub menu for the main menu. Can be used to link to key products, if you use the main menu as more of an informational link section e.g. about us, contact us, blog etc.
- **highlighted-products.liquid** - Section to show off specific variants. Can be used on any page. Can be used to show off specific variants of a product.
- **footer-modern.liquid** - Modern look to the footer. Including logo, tagline, social icons. Block based so can be customised in the theme editor & footer aside for currency selector, payment icons, but country selector has been left off for now.
- **drawer-cart-rec-product.liquid** - Product recommendations section rendered in the cart drawer with js.
- **simple-text34-and-image14.liquid** - Simple text and image section. This is a simple section with a 3/4 width text block and a 1/4 width image block. Useful for adding as a content section at the bottom of collection pages.

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

Dawn 13.0.1 introduces a few fixes.
### Changed
- The cart drawer header (Product, Total) is not sticky anymore when the content is scrollable
### Fixes and improvements
- Fix product rating alignment when the product doesn't have a media
- Fix scroll issue on variant change
- Limit width of country selector when the currency is the same for all the countries
- Fix missing alt tags for the collection image on the collection page as well as for collection cards
- Fix cart drawer's cart note to prevent overlapping of the text and caret icon
- Fix cart drawer's header to prevent an overlap with the items in the cart