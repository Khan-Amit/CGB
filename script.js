// script.js - Bright Future Gift Box
// ENKI: Simple and Effective

document.addEventListener('DOMContentLoaded', function() {
    console.log("🕉️ ENKI: Bright Future Gift Box loaded!");
    
    // Elements
    const connectBtn = document.getElementById('connectBtn');
    const statusText = document.querySelector('.status-text');
    const statusDiv = document.querySelector('.status');
    const giftBox = document.getElementById('giftBox');
    const messageDiv = document.getElementById('message');
    const messageText = document.getElementById('messageText');
    const shareBtn = document.querySelector('.share-btn');
    
    // Future Messages
    const futureMessages = [
        "Your future is radiant with success. Every step you take illuminates new opportunities.",
        "The universe is aligning for your greatest achievements. Trust the journey ahead.",
        "Your potential is limitless. The world awaits the brilliance only you can bring.",
        "Greatness is your destiny. Each day brings you closer to your brightest future.",
        "Your energy creates miracles. Focus on what you wish to manifest.",
        "The stars have prepared a path of abundance just for you. Walk it with confidence.",
        "Your resilience today builds the foundation for tomorrow's triumphs.",
        "You are exactly where you need to be. Your next chapter begins now.",
        "The future belongs to those who believe in their dreams. Yours are coming true.",
        "Your light inspires others. Keep shining brightly on your unique path."
    ];
    
    // Connection state
    let isConnected = false;
    
    // Connect Wallet Function
    function connectWallet() {
        if (isConnected) {
            alert("Already connected!");
            return;
        }
        
        // Update status
        statusText.textContent = "Connecting...";
        statusText.style.color = "#00ffea";
        
        // Simulate connection process
        setTimeout(() => {
            isConnected = true;
            statusText.textContent = "Connected!";
            statusText.style.color = "#00ffaa";
            statusDiv.classList.add('connected');
            connectBtn.innerHTML = '<i class="fas fa-check"></i> Connected';
            connectBtn.style.background = "linear-gradient(135deg, #00ffaa, #00cc88)";
            
            // Show success
            showNotification("✅ Wallet connected successfully!", "success");
            
            // Enable gift box
            giftBox.style.cursor = "pointer";
        }, 2000);
    }
    
    // Open Gift Box
    function openGift() {
        if (!isConnected) {
            showNotification("Please connect your wallet first!", "error");
            return;
        }
        
        // Animate opening
        giftBox.classList.add('open');
        
        // Get random message
        const randomIndex = Math.floor(Math.random() * futureMessages.length);
        const message = futureMessages[randomIndex];
        
        // Show message after delay
        setTimeout(() => {
            messageText.textContent = message;
            messageDiv.style.display = "block";
            
            // Scroll to message
            messageDiv.scrollIntoView({ behavior: 'smooth' });
            
            // Save to localStorage
            localStorage.setItem('lastFutureMessage', message);
            
            showNotification("🎁 Your bright future message revealed!", "success");
        }, 1500);
    }
    
    // Share Message
    function shareMessage() {
        const message = messageText.textContent;
        const shareText = `My Bright Future Message: "${message}"\n\nGet yours at: ${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My Bright Future Gift',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                showNotification("📋 Message copied to clipboard!", "success");
            });
        }
    }
    
    // Show Notification
    function showNotification(text, type = "info") {
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${text}</span>
        `;
        
        // Style it
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(0, 255, 170, 0.9)' : 'rgba(255, 50, 50, 0.9)'};
            color: #000;
            padding: 15px 25px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            font-weight: bold;
            max-width: 350px;
        `;
        
        // Add animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideIn 0.3s ease reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 4000);
    }
    
    // Check for saved connection
    function checkSavedConnection() {
        const saved = localStorage.getItem('connected');
        if (saved === 'true') {
            isConnected = true;
            statusText.textContent = "Connected!";
            statusText.style.color = "#00ffaa";
            statusDiv.classList.add('connected');
            connectBtn.innerHTML = '<i class="fas fa-check"></i> Connected';
            connectBtn.style.background = "linear-gradient(135deg, #00ffaa, #00cc88)";
            
            // Load saved message
            const savedMessage = localStorage.getItem('lastFutureMessage');
            if (savedMessage) {
                messageText.textContent = savedMessage;
                messageDiv.style.display = "block";
                giftBox.classList.add('open');
            }
        }
    }
    
    // Event Listeners
    connectBtn.addEventListener('click', connectWallet);
    
    giftBox.addEventListener('click', openGift);
    
    shareBtn.addEventListener('click', shareMessage);
    
    // Initialize
    checkSavedConnection();
    
    // Force black background
    document.body.style.backgroundColor = "#000000";
    document.body.style.background = "#000000";
    document.documentElement.style.backgroundColor = "#000000";
    
    console.log("ENKI: All systems ready!");
});

// Force black background even if script fails
document.body.style.backgroundColor = "#000000";
