// ==========================================
// GENERAR ESTRELLAS DE FONDO
// ==========================================
const starsContainer = document.getElementById('stars');
const starCount = 200;

for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (2 + Math.random() * 2) + 's';
    starsContainer.appendChild(star);
}

// ==========================================
// SMOOTH SCROLL PARA NAVEGACIÓN
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// ANIMACIÓN DE SCROLL PARA ELEMENTOS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar tarjetas de proyectos y habilidades
document.querySelectorAll('.project-card, .skill-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(element);
});

// ==========================================
// EFECTO PARALLAX EN EL HERO
// ==========================================
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = Math.max(0, 1 - scrolled / 700);
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ==========================================
// NAVBAR BACKGROUND ON SCROLL
// ==========================================
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(15, 15, 35, 0.98)';
        nav.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.2)';
    } else {
        nav.style.background = 'rgba(15, 15, 35, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// ==========================================
// ANIMACIÓN DE ENTRADA PARA SECCIONES
// ==========================================
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// ==========================================
// CURSOR PERSONALIZADO (OPCIONAL)
// ==========================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
}

animateFollower();

// Efecto hover en enlaces y botones
document.querySelectorAll('a, button, .project-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.3)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ==========================================
// CONTADOR DE HABILIDADES (ANIMACIÓN)
// ==========================================
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.2
});

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px) scale(0.9)';
    item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    skillObserver.observe(item);
});

// ==========================================
// TYPING EFFECT PARA EL TÍTULO (OPCIONAL)
// ==========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Descomentar si quieres el efecto de escritura
// window.addEventListener('load', () => {
//     const title = document.querySelector('h1');
//     const titleText = title.textContent;
//     typeWriter(title, titleText, 80);
// });

// ==========================================
// LAZY LOADING PARA IMÁGENES
// ==========================================
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// ==========================================
// BOTÓN DE SCROLL TO TOP
// ==========================================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Volver arriba');
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// PREVENIR SCROLL MIENTRAS CARGA EL VIDEO
// ==========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==========================================
// ANALYTICS Y TRACKING (OPCIONAL)
// ==========================================
// Rastrear clics en proyectos
document.querySelectorAll('.project-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const projectName = e.target.closest('.project-card').querySelector('.project-title').textContent;
        console.log(`Proyecto visitado: ${projectName}`);
        // Aquí puedes agregar Google Analytics o cualquier otro sistema de tracking
        // gtag('event', 'click', { 'event_category': 'project', 'event_label': projectName });
    });
});

// Rastrear clics en redes sociales
document.querySelectorAll('.social-link, .whatsapp-float').forEach(link => {
    link.addEventListener('click', (e) => {
        const platform = e.currentTarget.href.includes('github') ? 'GitHub' :
                        e.currentTarget.href.includes('linkedin') ? 'LinkedIn' :
                        e.currentTarget.href.includes('wa.me') ? 'WhatsApp' :
                        e.currentTarget.href.includes('mailto') ? 'Email' : 'Otra red';
        console.log(`Red social clickeada: ${platform}`);
        // gtag('event', 'click', { 'event_category': 'social', 'event_label': platform });
    });
});

// ==========================================
// DESCARGAR PORTAFOLIO EN ZIP
// ==========================================
document.getElementById('downloadBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Cambiar texto del botón
    const originalText = this.innerHTML;
    this.innerHTML = '<span>📋 Copiando instrucciones...</span>';
    this.style.pointerEvents = 'none';
    
    setTimeout(() => {
        // Crear modal con instrucciones
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 15, 35, 0.95);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(15, 15, 35, 0.9));
                border: 2px solid rgba(139, 92, 246, 0.5);
                border-radius: 20px;
                padding: 3rem;
                max-width: 600px;
                color: #F8FAFC;
                box-shadow: 0 25px 50px rgba(139, 92, 246, 0.3);
                position: relative;
            ">
                <button onclick="this.closest('div[style*=fixed]').remove()" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: rgba(139, 92, 246, 0.2);
                    border: none;
                    color: #F8FAFC;
                    font-size: 1.5rem;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">✕</button>
                
                <h2 style="
                    font-family: 'Orbitron', sans-serif;
                    background: linear-gradient(135deg, #8B5CF6, #06B6D4);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-size: 1.8rem;
                    margin-bottom: 1.5rem;
                ">📦 Descargar Portafolio</h2>
                
                <p style="margin-bottom: 1.5rem; line-height: 1.8; color: rgba(248, 250, 252, 0.9);">
                    Para descargar el código completo del portafolio, tienes 3 opciones:
                </p>
                
                <div style="
                    background: rgba(139, 92, 246, 0.1);
                    border-left: 3px solid #8B5CF6;
                    padding: 1.5rem;
                    border-radius: 10px;
                    margin-bottom: 1rem;
                ">
                    <h3 style="color: #06B6D4; margin-bottom: 1rem; font-size: 1.2rem;">
                        🌟 Opción 1: Desde esta conversación
                    </h3>
                    <p style="margin-bottom: 0.5rem; line-height: 1.6;">
                        <strong>1.</strong> Mira arriba en esta conversación<br>
                        <strong>2.</strong> Busca el archivo <code style="background: rgba(139, 92, 246, 0.2); padding: 0.2rem 0.5rem; border-radius: 5px;">portfolio-wanderley-solano.zip</code><br>
                        <strong>3.</strong> Haz clic en el botón de descarga
                    </p>
                </div>
                
                <div style="
                    background: rgba(59, 130, 246, 0.1);
                    border-left: 3px solid #3B82F6;
                    padding: 1.5rem;
                    border-radius: 10px;
                    margin-bottom: 1rem;
                ">
                    <h3 style="color: #06B6D4; margin-bottom: 1rem; font-size: 1.2rem;">
                        💾 Opción 2: Guardar esta página
                    </h3>
                    <p style="margin-bottom: 0.5rem; line-height: 1.6;">
                        <strong>1.</strong> Presiona <code style="background: rgba(59, 130, 246, 0.2); padding: 0.2rem 0.5rem; border-radius: 5px;">Ctrl + S</code> (Windows) o <code style="background: rgba(59, 130, 246, 0.2); padding: 0.2rem 0.5rem; border-radius: 5px;">Cmd + S</code> (Mac)<br>
                        <strong>2.</strong> Guarda como "Página web completa"<br>
                        <strong>3.</strong> Ya tendrás todos los archivos
                    </p>
                </div>
                
                <div style="
                    background: rgba(6, 182, 212, 0.1);
                    border-left: 3px solid #06B6D4;
                    padding: 1.5rem;
                    border-radius: 10px;
                ">
                    <h3 style="color: #06B6D4; margin-bottom: 1rem; font-size: 1.2rem;">
                        🔗 Opción 3: Desde GitHub
                    </h3>
                    <p style="margin-bottom: 0.5rem; line-height: 1.6;">
                        Visita mi GitHub y clona el repositorio:<br>
                        <a href="https://github.com/koreag123" target="_blank" style="
                            color: #8B5CF6;
                            text-decoration: none;
                            font-weight: 600;
                        ">github.com/koreag123</a>
                    </p>
                </div>
                
                <div style="
                    margin-top: 2rem;
                    text-align: center;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(139, 92, 246, 0.3);
                ">
                    <p style="color: rgba(248, 250, 252, 0.7); font-size: 0.9rem;">
                        ℹ️ El archivo incluye: HTML, CSS, JS y todas las instrucciones
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Restaurar botón
        this.innerHTML = originalText;
        this.style.pointerEvents = 'auto';
    }, 500);
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c¡Hola Developer! 👋', 'color: #8B5CF6; font-size: 20px; font-weight: bold;');
console.log('%cPortafolio de Wanderley Solano', 'color: #06B6D4; font-size: 16px;');
console.log('%c¿Buscando el código? Está todo aquí 😉', 'color: #EC4899; font-size: 14px;');
