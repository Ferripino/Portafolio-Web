# 2x3 Webs - Static Landing Page

Professional landing page with neon effects for 2x3 Webs Cuba, built with HTML, Tailwind CSS, and vanilla JavaScript.

## 🚀 Features

- ✨ **Neon effects** and modern animations
- 📱 **Fully responsive** design for all devices
- 📧 **Functional contact form** with PHP backend
- 💳 **PayPal integration** highlighted as recommended payment method
- 🎨 **Modern interface** with gradients and visual effects
- ⚡ **Smooth scrolling** and fluid animations
- 🇨🇺 **Optimized for Cuba** with localized content
- 🌟 **Particle background** system
- 📊 **Form validation** and user feedback

## 📦 Quick Setup

### Option 1: Local Server (Recommended)
\`\`\`bash
# If you have XAMPP/WAMP/MAMP installed
# Copy files to htdocs/www directory
# Access http://localhost/2x3-webs-landing
\`\`\`

### Option 2: Static Hosting
\`\`\`bash
# Upload files to any web hosting with PHP support
# Ensure PHP mail() function is enabled
# Update contact.php email destination if needed
\`\`\`

### Option 3: Development Server
\`\`\`bash
# Using Python (for static files only)
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP built-in server
php -S localhost:8000
\`\`\`

## 📧 Contact Form Configuration

The contact form is configured to work with PHP mail():

1. **Upload files** to a server with PHP enabled
2. **Verify mail()** function is configured in hosting
3. **Check logs** in `/api/contact.log` for debugging
4. **Email destination**: fpelegrincardoso@gmail.com

### PHP Features:
- ✅ Complete field validation
- ✅ Data sanitization
- ✅ Professional HTML email template
- ✅ Error and success logging
- ✅ CORS headers configured
- ✅ JSON API responses

## 💳 Payment Methods

- 💰 **Cash** - Payment in Havana
- 🏦 **Bank Transfer** - National banking
- 💳 **Cards** - Debit and credit
- 🌐 **PayPal** - ⭐ Highlighted for international payments
- 📱 **Digital** - Mobile payments

## 🎨 Customization

Edit content in:
- `script.js` - Site configuration and functionality
- `styles.css` - Custom neon effects and animations
- `index.html` - Structure and content
- `images/` - Site images

## 📱 Responsive Design

- 📱 **Mobile**: < 480px
- 📱 **Tablet**: 480px - 768px  
- 💻 **Desktop**: 768px - 1024px
- 🖥️ **Large**: > 1024px

## 🎯 Interactive Features

- **Mobile menu** with smooth toggle
- **Particle background** animation system
- **Smooth scrolling** between sections
- **Form validation** with real-time feedback
- **Success animations** on form submission
- **Neon hover effects** on interactive elements
- **Scroll animations** for content reveal

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **Tailwind CSS** - Utility-first styling
- **Vanilla JavaScript** - Interactive functionality
- **PHP** - Backend form processing
- **CSS3** - Custom neon effects and animations

## 📞 Contact Information

- **Email**: fpelegrincardoso@gmail.com
- **WhatsApp**: +53 5234-5678
- **Location**: La Habana, Cuba 🇨🇺

## 🔧 Troubleshooting

### Form not working:
1. Verify server has PHP enabled
2. Check logs in `/api/contact.log`
3. Verify mail() configuration in hosting
4. Check CORS headers

### Styles not loading:
1. Verify `styles.css` is linked correctly
2. Clear browser cache
3. Check file paths
4. Ensure Tailwind CDN is loading

### PayPal not highlighted:
1. Check PayPal card in HTML
2. Verify `border-2 border-blue-500` classes
3. Review neon effect styles

### JavaScript errors:
1. Check browser console for errors
2. Verify all script functions are loaded
3. Check DOM element IDs match JavaScript selectors

## 📄 File Structure

\`\`\`
2x3-webs-landing/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS and neon effects
├── script.js           # JavaScript functionality
├── api/
│   └── contact.php     # PHP form handler
├── images/
│   ├── hero-web-design.png
│   └── favicon.png
└── README.md
\`\`\`

## 🚀 Deployment

1. **Upload all files** to web server
2. **Ensure PHP support** is enabled
3. **Test contact form** functionality
4. **Verify all images** load correctly
5. **Check responsive design** on different devices

## 📄 License

© 2024 2x3 Webs. All rights reserved.
