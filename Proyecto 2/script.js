// Site Configuration
const siteConfig = {
  company: {
    name: "2x3 Webs",
    tagline: "Cuba Digital",
    email: "fpelegrincardoso@gmail.com",
    phone: "+53 5234-5678",
    location: "La Habana, Cuba 🇨🇺",
    whatsapp: "+53 5234-5678",
  },
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

// Initialize Application
function initializeApp() {
  initMobileMenu()
  initSmoothScrolling()
  initParticles()
  initContactForm()
  initScrollAnimations()
}

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")
  const menuIcon = document.getElementById("menu-icon")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  let isMenuOpen = false

  mobileMenuBtn.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen

    if (isMenuOpen) {
      mobileMenu.classList.remove("hidden")
      menuIcon.textContent = "✕"
    } else {
      mobileMenu.classList.add("hidden")
      menuIcon.textContent = "☰"
    }
  })

  // Close menu when clicking on nav links
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
      menuIcon.textContent = "☰"
      isMenuOpen = false
    })
  })
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Particle System
function initParticles() {
  const particlesBg = document.getElementById("particles-bg")

  function createParticle() {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDuration = Math.random() * 3 + 2 + "s"
    particle.style.opacity = Math.random()

    particlesBg.appendChild(particle)

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    }, 5000)
  }

  // Create particles periodically
  setInterval(createParticle, 300)
}

// Contact Form
function initContactForm() {
  const form = document.getElementById("contact-form")
  const submitBtn = document.getElementById("submit-btn")
  const formStatus = document.getElementById("form-status")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(form)
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    // Validate form
    if (!validateForm(data)) {
      showFormStatus("Por favor, completa todos los campos correctamente.", "error")
      return
    }

    // Show loading state
    setFormLoading(true)

    try {
      const response = await fetch("./api/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        showFormStatus(result.message, "success")
        form.reset()

        // Show success animation
        showSuccessAnimation()
      } else {
        showFormStatus(result.message, "error")
      }
    } catch (error) {
      console.error("Error sending form:", error)
      showFormStatus(
        "❌ Error de conexión. Por favor, intenta de nuevo o contáctanos directamente al +53 5234-5678.",
        "error",
      )
    } finally {
      setFormLoading(false)
    }
  })
}

// Form Validation
function validateForm(data) {
  // Check required fields
  if (!data.firstName || data.firstName.trim().length < 2) return false
  if (!data.lastName || data.lastName.trim().length < 2) return false
  if (!data.email || !isValidEmail(data.email)) return false
  if (!data.subject || data.subject.trim().length < 5) return false
  if (!data.message || data.message.trim().length < 10) return false

  return true
}

// Email Validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Form Loading State
function setFormLoading(loading) {
  const submitBtn = document.getElementById("submit-btn")

  if (loading) {
    submitBtn.disabled = true
    submitBtn.innerHTML = "⏳ Enviando..."
    submitBtn.classList.add("opacity-50")
  } else {
    submitBtn.disabled = false
    submitBtn.innerHTML = "🚀 Enviar Mensaje"
    submitBtn.classList.remove("opacity-50")
  }
}

// Show Form Status
function showFormStatus(message, type) {
  const formStatus = document.getElementById("form-status")

  formStatus.classList.remove("hidden")
  formStatus.textContent = message

  // Remove existing classes
  formStatus.classList.remove(
    "bg-green-500",
    "bg-red-500",
    "border-green-500",
    "border-red-500",
    "text-green-400",
    "text-red-400",
  )

  if (type === "success") {
    formStatus.classList.add("bg-green-500", "bg-opacity-10", "border-green-500", "border-opacity-50", "text-green-400")
  } else {
    formStatus.classList.add("bg-red-500", "bg-opacity-10", "border-red-500", "border-opacity-50", "text-red-400")
  }

  // Auto hide after 5 seconds
  setTimeout(() => {
    formStatus.classList.add("hidden")
  }, 5000)
}

// Success Animation
function showSuccessAnimation() {
  // Create success overlay
  const overlay = document.createElement("div")
  overlay.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  overlay.innerHTML = `
        <div class="bg-slate-800 rounded-2xl p-8 text-center border border-cyan-500/20 animate-pulse-neon">
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="text-2xl font-bold text-white mb-2 neon-text">¡Mensaje Enviado!</h3>
            <p class="text-gray-300">Te contactaremos pronto</p>
        </div>
    `

  document.body.appendChild(overlay)

  // Remove after 3 seconds
  setTimeout(() => {
    overlay.remove()
  }, 3000)

  // Add click to close
  overlay.addEventListener("click", () => {
    overlay.remove()
  })
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in")
      }
    })
  }, observerOptions)

  // Observe all cards and sections
  const elementsToAnimate = document.querySelectorAll(".card-neon, section")
  elementsToAnimate.forEach((el) => observer.observe(el))
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Add fade-in animation class
const style = document.createElement("style")
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.6s ease-in-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`
document.head.appendChild(style)

// Console welcome message
console.log(`
🚀 2x3 Webs - Cuba Digital
💻 Sitio web desarrollado con HTML, CSS y JavaScript
📧 Contacto: ${siteConfig.company.email}
🇨🇺 Transformando Cuba digitalmente
`)
