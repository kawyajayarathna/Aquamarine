// Add event listener to nav toggle button
document.getElementById('nav-toggle').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('show');
});

// Add click functionality to SVG nodes
const nodes = document.querySelectorAll('.neuro-node');
nodes.forEach(node => {
    node.addEventListener('click', function() {
        // Get the text content from the associated text elements
        const nodeTexts = this.parentNode.querySelectorAll('text');
        let nodeText = '';
        
        // Find text elements that belong to this node
        const nodeX = parseFloat(this.getAttribute('x'));
        const nodeWidth = parseFloat(this.getAttribute('width'));
        const nodeCenterX = nodeX + (nodeWidth / 2);
        
        for (let textElement of nodeTexts) {
            const textX = parseFloat(textElement.getAttribute('x'));
            // Check if text element is positioned within or near this node
            if (Math.abs(textX - nodeCenterX) < 10) {
                nodeText += textElement.textContent.toLowerCase() + ' ';
            }
        }
        
        nodeText = nodeText.trim();
        console.log('Clicked node text:', nodeText); // For debugging
        
        // Navigation based on node text
        if (nodeText.includes('home')) {
            window.location.href = 'home.html';
        } else if (nodeText.includes('gallery')) {
            window.location.href = 'gallery.html';
        } else if (nodeText.includes('shop')) {
            window.location.href = 'shop.html';
        } else if (nodeText.includes('profile')) {
            window.location.href = 'profile.html';
        } else if (nodeText.includes('feedback')) {
            window.location.href = 'feedback.html';
        } else if (nodeText.includes('about us')) {
            window.location.href = 'team.html'; // Assuming About Us links to team page
        } else if (nodeText.includes('team')) {
            window.location.href = 'team.html';
        } else if (nodeText.includes('aquamarine')) {
            window.location.href = 'home.html'; // Main node goes to home
        } 
        // Handle the Home subsection nodes
        else if (nodeText.includes('marine life')) {
            // Create anchor link to marine life section on home page
            window.location.href = 'home.html#marine-life';
        } else if (nodeText.includes('marine archeology')) {
            // Create anchor link to marine archeology section on home page
            window.location.href = 'home.html#marine-archeology';
        } else if (nodeText.includes('marine pollution')) {
            // Create anchor link to marine pollution section on home page
            window.location.href = 'home.html#marine-pollution';
        } else if (nodeText.includes('take action')) {
            // Create anchor link to take action section on home page
            window.location.href = 'home.html#take-action';
        } else {
            console.log('No navigation defined for:', nodeText);
            // Optional: Show a message or provide fallback navigation
            alert('Navigation for "' + nodeText + '" will be available soon!');
        }
    });
});

// Enhanced hover effects - pressed button style
nodes.forEach(node => {
    node.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.1s ease';
        // Pressed button effect - move down and reduce shadow
        this.style.transform = 'translateY(3px)';
        this.style.filter = 'drop-shadow(2px 2px 4px rgba(0,119,190,0.3)) drop-shadow(-1px -1px 2px rgba(255,255,255,0.9))';
        
        // Darken the fill slightly to simulate pressed state
        const currentFill = this.getAttribute('fill');
        if (currentFill.includes('mainGradient')) {
            this.style.fill = '#d1e7dd';
        } else if (currentFill.includes('primaryGradient')) {
            this.style.fill = '#a3d5f7';
        } else if (currentFill.includes('secondaryGradient')) {
            this.style.fill = '#7cc7f5';
        }
    });
    
    node.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.1s ease';
        // Return to normal position and shadow
        this.style.transform = 'translateY(0)';
        this.style.filter = 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3)) drop-shadow(-2px -2px 4px rgba(255,255,255,0.8))';
        
        // Restore original fill
        const currentFill = this.getAttribute('fill');
        this.style.fill = currentFill;
    });
    
    // Add cursor pointer to indicate clickability
    node.style.cursor = 'pointer';
});

// Add loading animation for better UX
function showLoadingIndicator(message = 'Navigating...') {
    // Create a simple loading overlay
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(227, 242, 253, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
    `;
    
    const loadingText = document.createElement('div');
    loadingText.textContent = message;
    loadingText.style.cssText = `
        color: #0077be;
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
    `;
    
    overlay.appendChild(loadingText);
    document.body.appendChild(overlay);
    
    // Remove overlay after a short delay if navigation doesn't happen
    setTimeout(() => {
        if (document.getElementById('loading-overlay')) {
            document.body.removeChild(overlay);
        }
    }, 2000);
}

// Optional: Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('neuro-node')) {
            focusedElement.click();
        }
    }
});

// Make nodes focusable for accessibility
nodes.forEach((node, index) => {
    node.setAttribute('tabindex', index + 1);
    node.setAttribute('role', 'button');
    
    // Add focus styles
    node.addEventListener('focus', function() {
        this.style.outline = '3px solid #0077be';
        this.style.outlineOffset = '2px';
    });
    
    node.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});