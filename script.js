// ===== Theme Toggle Functionality =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Function to update GitHub graph based on theme
function updateGitHubGraph() {
    const githubGraph = document.getElementById('githubGraph');
    if (githubGraph) {
        const isDark = html.classList.contains('dark');
        // Use GitHub's actual color schemes
        if (isDark) {
            // Dark mode: GitHub's dark theme colors (green: #0e4429, #006d32, #26a641, #39d353)
            githubGraph.src = 'https://ghchart.rshah.org/39d353/DocTiano';
        } else {
            // Light mode: GitHub's light theme colors (green: #9be9a8, #40c463, #30a14e, #216e39)
            githubGraph.src = 'https://ghchart.rshah.org/216e39/DocTiano';
        }
    }
}

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    html.classList.add('dark');
}

// Update graph on initial load
updateGitHubGraph();

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    
    // Save theme preference
    const theme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    // Update GitHub graph when theme changes
    updateGitHubGraph();
    
    // Add a subtle animation to the toggle button
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// ===== Smooth Scroll Animation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and timeline items
document.querySelectorAll('.card, .timeline-item, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Badge Hover Effect Enhancement =====
document.querySelectorAll('.badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Card Click Ripple Effect =====
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .card {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: hsl(var(--primary) / 0.1);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Button Interaction Feedback =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});

// ===== Skill Badge Interactive Counter =====
const skillBadges = document.querySelectorAll('.skill-category .badge');
let totalSkills = skillBadges.length;

// You could add a subtle counter or stats display
console.log(`Total Skills: ${totalSkills}`);

// ===== Project Card Link Handling =====
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card click event
    });
});

// ===== Keyboard Navigation Enhancement =====
document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        themeToggle.click();
    }
    
    // Press 'Escape' to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// ===== Console Easter Egg =====
console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%cInterested in the code? Check out the GitHub repo!', 'font-size: 14px; color: #64748b;');
console.log('%c💡 Tip: Press "T" to toggle theme, "Escape" to scroll to top', 'font-size: 12px; color: #64748b; font-style: italic;');

// ===== Skills Carousel Functionality =====
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.carousel-indicator');
const prevBtn = document.querySelector('.carousel-btn-prev');
const nextBtn = document.querySelector('.carousel-btn-next');

function showSlide(index) {
    // Handle wrap-around
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlide) {
            slide.classList.add('active');
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.remove('active');
        if (i === currentSlide) {
            indicator.classList.add('active');
        }
    });
}

// Next button
nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Previous button
prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

// Indicator buttons
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    // Arrow keys for carousel navigation
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const carouselContainer = document.querySelector('.skills-carousel-container');

carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carouselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextBtn.click();
        } else {
            // Swipe right - previous slide
            prevBtn.click();
        }
    }
}

// Auto-advance carousel (optional - uncomment if desired)
// let autoSlideInterval = setInterval(() => {
//     showSlide(currentSlide + 1);
// }, 5000);

// // Pause auto-advance on hover
// carouselContainer.addEventListener('mouseenter', () => {
//     clearInterval(autoSlideInterval);
// });

// carouselContainer.addEventListener('mouseleave', () => {
//     autoSlideInterval = setInterval(() => {
//         showSlide(currentSlide + 1);
//     }, 5000);
// });

// ===== GitHub Stats Fetcher =====
async function fetchGitHubStats() {
    const username = 'DocTiano';
    
    try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposResponse.json();
        
        // Calculate total stars
        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        
        // Fetch contribution data from events (approximate)
        const eventsResponse = await fetch(`https://api.github.com/users/${username}/events?per_page=100`);
        const eventsData = await eventsResponse.json();
        
        // Get unique days with contributions in the last year
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
        const contributionDays = new Set();
        eventsData.forEach(event => {
            const eventDate = new Date(event.created_at);
            if (eventDate >= oneYearAgo) {
                contributionDays.add(eventDate.toDateString());
            }
        });
        
        // Update the DOM
        document.getElementById('contributionCount').textContent = contributionDays.size || '84';
        document.getElementById('repoCount').textContent = userData.public_repos || '-';
        document.getElementById('starCount').textContent = totalStars || '-';
        
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        // Keep loading/default values on error
        document.getElementById('contributionCount').textContent = '84';
        document.getElementById('repoCount').textContent = '-';
        document.getElementById('starCount').textContent = '-';
    }
}

// Fetch GitHub stats on page load
fetchGitHubStats();
