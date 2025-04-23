document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a blog page
    const isBlogPage = window.location.pathname.includes('/blog/');
    
    if (isBlogPage) {
        // If on a blog page, don't need to set up tab navigation
        return;
    }

    // Tab navigation functionality
    const tabLinks = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Initialize to show home tab
    showTab('home');
    
    // Add click event to tab links
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });
    
    // Function to display the active tab
    function showTab(tabId) {
        // Hide all tabs
        tabContents.forEach(tab => {
            tab.style.display = 'none';
        });
        
        // Remove active class from all tabs
        tabLinks.forEach(link => {
            link.classList.remove('nav-item-active');
        });
        
        // Show the selected tab
        document.getElementById(tabId).style.display = 'block';
        
        // Add active class to the clicked tab
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('nav-item-active');
        
        // Scroll to top when changing tabs
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Handle form submission
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Display success message
            document.getElementById('form-success').style.display = 'block';
            
            // Reset form after submission
            volunteerForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                document.getElementById('form-success').style.display = 'none';
            }, 5000);
            
            // Add confetti effect (simple animation)
            createConfetti();
        });
    }
    
    // Simple confetti animation
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = 0;
        confettiContainer.style.left = 0;
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = 9999;
        document.body.appendChild(confettiContainer);
        
        // Create 100 confetti pieces
        for (let i = 0; i < 100; i++) {
            createConfettiPiece(confettiContainer);
        }
        
        // Remove container after animation
        setTimeout(() => {
            document.body.removeChild(confettiContainer);
        }, 4000);
    }
    
    function createConfettiPiece(container) {
        const colors = ['#6772E5', '#8E8DFE', '#4CAF50', '#FF5722', '#FF9800'];
        const piece = document.createElement('div');
        
        // Style for confetti piece
        piece.style.position = 'absolute';
        piece.style.width = `${Math.random() * 10 + 5}px`;
        piece.style.height = `${Math.random() * 10 + 5}px`;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.opacity = Math.random();
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        // Starting position
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.top = '-20px';
        
        // Animation
        piece.style.transition = `all ${Math.random() * 3 + 2}s ease-out`;
        container.appendChild(piece);
        
        // Animate falling
        setTimeout(() => {
            piece.style.top = `${Math.random() * 100 + 100}%`;
            piece.style.left = `${parseInt(piece.style.left) + (Math.random() * 40 - 20)}%`;
            piece.style.transform = `rotate(${Math.random() * 360}deg)`;
            piece.style.opacity = 0;
        }, 10);
    }

    // Simple carousel functionality
    const carouselImages = [
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    ];
    
    const carouselImage = document.querySelector('.carousel-image');
    if (carouselImage) {
        let currentImageIndex = 0;
        
        // Change image every 5 seconds
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
            carouselImage.style.opacity = '0';
            
            setTimeout(() => {
                carouselImage.src = carouselImages[currentImageIndex];
                carouselImage.style.opacity = '1';
            }, 500);
        }, 5000);
        
        // Add fade effect to image transitions
        carouselImage.style.transition = 'opacity 0.5s ease';
    }

    // Add animation to elements as they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .impact-story, .pillar-lead, .animation-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            // If element is in viewport
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
            }
        });
    };
    
    // Set initial state for animations
    document.querySelectorAll('.card, .impact-story, .pillar-lead, .animation-container').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on load
    animateOnScroll();

    // Handle hash navigation
    if (window.location.hash) {
        const tabId = window.location.hash.substring(1);
        if (document.getElementById(tabId)) {
            showTab(tabId);
        }
    }
    
    // Handle direct link to blog tab
    if (window.location.hash === '#blog') {
        showTab('blog');
    }
    
    // Add animation for blog cards
    const animateBlogCards = () => {
        const blogCards = document.querySelectorAll('.blog-card');
        
        blogCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            // Add a slight delay for each card based on its index
            setTimeout(() => {
                if (cardPosition < screenPosition) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            }, index * 100); // 100ms delay between each card
        });
    };
    
    // Initialize blog cards for animation
    document.querySelectorAll('.blog-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
    });
    
    // Listen for tab changes to trigger animations
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            if (this.getAttribute('data-tab') === 'blog') {
                setTimeout(animateBlogCards, 100);
            }
        });
    });
    
    // Call animation function on scroll in case they're already in the blog tab
    window.addEventListener('scroll', () => {
        if (document.getElementById('blog') && document.getElementById('blog').style.display !== 'none') {
            animateBlogCards();
        }
    });
});
