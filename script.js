// script.js - Bright Future Gift Box
// ENKI's Future-Ready Script

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const connectionField = document.getElementById('connectionField');
    const fieldStatus = document.getElementById('fieldStatus');
    const connectBtn = document.getElementById('connectBtn');
    const infoBtn = document.getElementById('infoBtn');
    const connectionInfo = document.getElementById('connectionInfo');
    const connectionPanel = document.getElementById('connectionPanel');
    const giftPanel = document.getElementById('giftPanel');
    const giftBox = document.getElementById('giftBox');
    const messageContainer = document.getElementById('messageContainer');
    const futureMessage = document.getElementById('futureMessage');
    const shareBtn = document.getElementById('shareBtn');
    const resetBtn = document.getElementById('resetBtn');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');

    // Future Messages Database
    const futureMessages = [
        "Your future shines brighter than a thousand suns. Keep walking your path with courage.",
        "The seeds you plant today will become the forest you walk through tomorrow. Plant wisely.",
        "Your journey is uniquely yours. Trust the timing of your life's unfolding.",
        "The universe is conspiring in your favor. Your brightest days are ahead.",
        "Your potential is limitless. Every small step today is a giant leap for tomorrow.",
        "The future belongs to those who believe in the beauty of their dreams. Keep dreaming.",
        "Your energy creates your reality. Focus on what you want to manifest.",
        "You are exactly where you need to be. The next chapter is being written now.",
        "Your resilience is preparing you for something wonderful. Don't give up.",
        "The brightest futures are built on moments of hope, courage, and kindness.",
        "You carry within you everything needed to create a magnificent future.",
        "Every ending is a new beginning in disguise. Your story is just getting started.",
        "The stars have aligned for your success. Trust your journey.",
        "Your future self is already proud of you for taking steps today.",
        "The world needs your unique light. Shine brightly and unapologetically."
    ];

    // Connection State
    let isConnected = false;
    let connectionAttempts = 0;

    // Initialize
    function init() {
        console.log("🕉️ ENKI: Bright Future Gift Box Initialized");
        
        // Check if already connected (from previous session)
        const savedConnection = localStorage.getItem('brightFutureConnected');
        if (savedConnection === 'true') {
            simulateConnection();
        }
    }

    // Simulate Connection Process
    function simulateConnection() {
        if (isConnected) return;
        
        connectionAttempts++;
        isConnected = true;
        
        // Update UI
        connectBtn.innerHTML = '<i class="fas fa-check"></i> Connected';
        connectBtn.disabled = true;
        connectBtn.style.opacity = '0.7';
        connectBtn.style.cursor = 'default';
        
        // Animate connection
        fieldStatus.textContent = 'Connecting...';
        fieldStatus.className = 'field-status';
        
        // Simulate connection process
        setTimeout(() => {
            fieldStatus.textContent = 'Establishing link...';
            fieldStatus.style.color = '#ffb347';
        }, 500);
        
        setTimeout(() => {
            fieldStatus.textContent = 'Future aligned ✓';
            fieldStatus.className = 'field-status connected';
            connectionField.classList.add('connected');
            
            // Show success
            showNotification('Connection established! Your future is now linked.', 'success');
            
            // Move to next step
            setTimeout(() => {
                connectionPanel.style.display = 'none';
                giftPanel.style.display = 'block';
                updateProgress(2);
            }, 1000);
            
            // Save connection state
            localStorage.setItem('brightFutureConnected', 'true');
        }, 1500);
    }

    // Show Gift Message
    function showRandomMessage() {
        const randomIndex = Math.floor(Math.random() * futureMessages.length);
        const message = futureMessages[randomIndex];
        
        // Animate gift opening
        giftBox.classList.add('opening');
        
        setTimeout(() => {
            giftBox.classList.add('open');
            giftBox.classList.remove('opening');
            
            // Show message after delay
            setTimeout(() => {
                futureMessage.textContent = message;
                messageContainer.style.display = 'block';
                updateProgress(3);
                
                // Save this message
                localStorage.setItem('lastFutureMessage', message);
            }, 800);
        }, 500);
    }

    // Update Progress Steps
    function updateProgress(step) {
        // Reset all
        step1.classList.remove('active');
        step2.classList.remove('active');
        step3.classList.remove('active');
        
        // Activate up to current step
        if (step >= 1) step1.classList.add('active');
        if (step >= 2) step2.classList.add('active');
        if (step >= 3) step3.classList.add('active');
    }

    // Share Message
    function shareMessage() {
        const message = futureMessage.textContent;
        const shareText = `My Bright Future Message: "${message}" - Discover yours at ${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My Bright Future Gift',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                showNotification('Message copied to clipboard!', 'success');
            });
        }
    }

    // Show Notification
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Style it
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(0, 255, 170, 0.9)' : 'rgba(0, 255, 234, 0.9)'};
            color: #000;
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            max-width: 300px;
        `;
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Reset Everything
    function resetExperience() {
        isConnected = false;
        connectionAttempts = 0;
        
        // Reset UI
        connectBtn.innerHTML = '<i class="fas fa-bolt"></i> Connect Now';
        connectBtn.disabled = false;
        connectBtn.style.opacity = '1';
        connectBtn.style.cursor = 'pointer';
        
        fieldStatus.textContent = 'Not connected';
        fieldStatus.className = 'field-status';
        connectionField.classList.remove('connected');
        
        giftBox.classList.remove('open');
        messageContainer.style.display = 'none';
        
        connectionPanel.style.display = 'block';
        giftPanel.style.display = 'none';
        
        updateProgress(1);
        
        localStorage.removeItem('brightFutureConnected');
        showNotification('Experience reset. Ready for a new connection!', 'success');
    }

    // Event Listeners
    connectBtn.addEventListener('click', simulateConnection);
    
    infoBtn.addEventListener('click', function() {
        connectionInfo.style.display = connectionInfo.style.display === 'block' ? 'none' : 'block';
    });
    
    giftBox.addEventListener('click', function() {
        if (!isConnected) {
            showNotification('Please connect first to open your gift!', 'info');
            return;
        }
        
        if (!giftBox.classList.contains('open')) {
            showRandomMessage();
        }
    });
    
    shareBtn.addEventListener('click', shareMessage);
    
    resetBtn.addEventListener('click', resetExperience);

    // Initialize
    init();
    updateProgress(1);
});
