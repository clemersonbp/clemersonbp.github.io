/**
 * Personal Website Scripts
 * Tema, navegação, destaque da seção ativa e animações de entrada
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHeader();
    initMobileNav();
    initActiveSection();
    initReveal();
    initCopyEmail();

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
});

/**
 * Tema claro/escuro
 * O tema inicial é aplicado por um script inline no <head> para evitar "flash".
 */
function initTheme() {
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const setTheme = (theme, persist) => {
        root.classList.add('theme-transition');
        root.setAttribute('data-theme', theme);
        window.setTimeout(() => root.classList.remove('theme-transition'), 350);
        if (persist) {
            try { localStorage.setItem('theme', theme); } catch (e) { /* storage indisponível */ }
        }
    };

    toggle?.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(next, true);
    });

    // Segue o sistema enquanto o usuário não escolher manualmente
    prefersDark.addEventListener('change', (e) => {
        let saved = null;
        try { saved = localStorage.getItem('theme'); } catch (err) { /* noop */ }
        if (!saved) setTheme(e.matches ? 'dark' : 'light', false);
    });
}

/**
 * Header ganha fundo/borda ao rolar a página
 */
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const update = () => header.classList.toggle('scrolled', window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
}

/**
 * Menu mobile
 */
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    const setOpen = (open) => {
        menu.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };

    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('click', (e) => {
        if (menu.classList.contains('open') && !e.target.closest('.nav')) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
            setOpen(false);
            toggle.focus();
        }
    });
}

/**
 * Destaca no menu o link da seção visível
 */
function initActiveSection() {
    const links = document.querySelectorAll('.nav-link');
    const sections = [...links]
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (!sections.length || !('IntersectionObserver' in window)) return;

    const setActive = (id) => {
        links.forEach(link => {
            const active = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) setActive(entry.target.id);
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));

    // No topo da página nenhum link fica ativo
    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight * 0.4) setActive(null);
    }, { passive: true });
}

/**
 * Animação suave de entrada dos elementos
 */
function initReveal() {
    const items = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('visible'));
        return;
    }

    // Escalona elementos irmãos para um efeito em cascata
    items.forEach(el => {
        const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
        const index = siblings.indexOf(el);
        if (index > 0) el.style.setProperty('--delay', `${Math.min(index, 8) * 60}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    items.forEach(el => observer.observe(el));
}

/**
 * Botão "Copiar e-mail"
 */
function initCopyEmail() {
    const button = document.getElementById('copyEmail');
    if (!button) return;

    const label = button.querySelector('.copy-label');
    let timer;

    button.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(button.dataset.email);
            button.classList.add('copied');
            if (label) label.textContent = 'Copiado!';
            clearTimeout(timer);
            timer = setTimeout(() => {
                button.classList.remove('copied');
                if (label) label.textContent = 'Copiar';
            }, 2000);
        } catch (e) {
            window.location.href = `mailto:${button.dataset.email}`;
        }
    });
}
