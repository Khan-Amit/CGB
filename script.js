// script.js - Bright Future Gift Box with REAL Wallet Connection
// ENKI: Real MetaMask/WalletConnect Integration

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const metamaskBtn = document.getElementById('metamaskBtn');
    const walletconnectBtn = document.getElementById('walletconnectBtn');
    const coinbaseBtn = document.getElementById('coinbaseBtn');
    const connectionStatus = document.getElementById('connectionStatus');
    const connectedWallet = document.getElementById('connectedWallet');
    const walletAddress = document.getElementById('walletAddress');
    const walletBalance = document.getElementById('walletBalance');
    const openGiftBtn = document.getElementById('openGiftBtn');
    const giftPanel = document.getElementById('giftPanel');
    const giftBox = document.getElementById('giftBox');
    const futureMessage = document.getElementById('futureMessage');
    const messageContent = document.getElementById('messageContent');
    const shareBtn = document.getElementById('shareBtn');
    const saveBtn = document.getElementById('saveBtn');
    const disconnectBtn = document.getElementById('disconnectBtn');
    const helpBtn = document.getElementById('helpBtn');
    const closeModal = document.getElementById('closeModal');
    const helpModal = document.getElementById('helpModal');

    // State
    let connectedAccount = null;
    let web3 = null;

    // Future Messages
    const futureMessages = [
        "Your future shines with infinite possibilities. Every step forward illuminates new paths.",
        "The seeds of today become the forests of tomorrow. Plant with intention, grow with joy.",
        "Your journey is painting a masterpiece. Each moment adds color to your grand canvas.",
        "The universe whispers encouragement: 'Your brightest days are unfolding now.'",
        "Within you lies everything needed for a magnificent future. Trust your inner compass.",
        "Your potential is like the ocean—vast, deep, and full of unseen treasures.",
        "Every challenge is preparing you for greater blessings ahead. Stay resilient.",
        "You are exactly where you need to be. The next chapter awaits your courage.",
        "Your energy creates reality. Focus on what you wish to manifest.",
        "The stars have aligned for your success. Walk confidently toward your dreams.",
        "Your future self is already proud of you for taking this step today.",
        "The world needs your unique light. Shine brightly and transform darkness.",
        "Every ending births a new beginning. Your story is being beautifully written.",
        "Abundance flows to those who believe. Your prosperity is on its way.",
        "You are a beacon of hope. Your journey inspires others to shine too."
    ];

    // Initialize
    function init() {
        console.log("🕉️ ENKI: Bright Future Gift Box with Wallet Connection Initialized");
        
        // Check if already connected from previous session
        const savedAccount = localStorage.getItem('connectedAccount');
        if (savedAccount) {
            connectWithSavedAccount(savedAccount);
        }
        
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            console.log("✅ MetaMask is installed");
            updateButtonState('metamaskBtn', true);
        } else {
            updateButtonState('metamaskBtn', false, "Install MetaMask");
        }
    }

    // Connect with MetaMask
    async function connectMetaMask() {
        try {
            if (typeof window.ethereum === 'undefined') {
                showNotification('Please install MetaMask first!', 'error');
                window.open('https://metamask.io/download/', '_blank');
                return;
            }
            
            showNotification('Connecting to MetaMask...', 'info');
            
            // Request account access
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            connectedAccount = accounts[0];
            web3 = new Web3(window.ethereum);
            
            // Update UI
            updateConnectionUI(connectedAccount);
            showNotification('Successfully connected to MetaMask!', 'success');
            
            // Get balance
            const balance = await web3.eth.getBalance(connectedAccount);
            const ethBalance = web3.utils.fromWei(balance, 'ether');
            updateBalance(ethBalance);
            
            // Save to localStorage
            localStorage.setItem('connectedAccount', connectedAccount);
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            
        } catch (error) {
            console.error('MetaMask connection error:', error);
            showNotification('Connection failed: ' + error.message, 'error');
        }
    }

    // Connect with WalletConnect (simulated for now)
    function connectWalletConnect() {
        showNotification('WalletConnect coming soon! For now, use MetaMask.', 'info');
        // In a real implementation, you would integrate WalletConnect library
    }

    // Connect with Coinbase Wallet (simulated for now)
    function connectCoinbase() {
        showNotification('Coinbase Wallet coming soon! For now, use MetaMask.', 'info');
        // In a real implementation, you would integrate Coinbase Wallet SDK
    }

    // Update UI after connection
    function updateConnectionUI(address) {
        // Shorten address for display
        const shortAddress = address.substring(0, 6) + '...' + address.substring(38);
        
        // Update status
        connectionStatus.classList.add('connected');
        connectionStatus.querySelector('h3').textContent = 'Wallet Connected';
        connectionStatus.querySelector('p').textContent = 'Ready to open your gift!';
        connectionStatus.querySelector('.status-icon i').className = 'fas fa-check-circle';
        
        // Show connected wallet section
        connectedWallet.style.display = 'block';
        walletAddress.innerHTML = `<i class="fas fa-check-circle"></i><span>Connected: ${shortAddress}</span>`;
        
        // Enable gift panel
        openGiftBtn.disabled = false;
    }

    // Update balance display
    function updateBalance(balance) {
        const formattedBalance = parseFloat(balance).toFixed(4);
        walletBalance.innerHTML = `<i class="fas fa-coins"></i><span>Balance: ${formattedBalance} ETH</span>`;
    }

    // Handle account changes
    function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // User disconnected all accounts
            disconnectWallet();
            showNotification('Wallet disconnected', 'info');
        } else if (accounts[0] !== connectedAccount) {
            // User switched accounts
            connectedAccount = accounts[0];
            updateConnectionUI(connectedAccount);
            showNotification('Switched to new account', 'info');
            
            // Update balance for new account
            web3.eth.getBalance(connectedAccount).then(balance => {
                const ethBalance = web3.utils.fromWei(balance, 'ether');
                updateBalance(ethBalance);
            });
        }
    }

    // Disconnect wallet
    function disconnectWallet() {
        connectedAccount = null;
        web3 = null;
        
        // Reset UI
        connectionStatus.classList.remove('connected');
        connectionStatus.querySelector('h3').textContent = 'Wallet Not Connected';
        connectionStatus.querySelector('p').textContent = 'Connect a wallet to unlock your bright future gift';
        connectionStatus.querySelector('.status-icon i').className = 'fas fa-plug';
        
        connectedWallet.style.display = 'none';
        giftPanel.style.display = 'none';
        futureMessage.style.display = 'none';
        
        // Clear localStorage
        localStorage.removeItem('connectedAccount');
        
        // Remove event listeners
        if (window.ethereum && window.ethereum.removeListener) {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
        
        showNotification('Wallet disconnected successfully', 'info');
    }

    // Open gift box
    function openGift() {
        if (!connectedAccount) {
            showNotification('Please connect your wallet first!', 'error');
            return;
        }
        
        // Show gift panel
        giftPanel.style.display = 'block';
        
        // Animate gift opening
        giftBox.classList.add('open');
        
        // Show message after delay
        setTimeout(() => {
            const randomMessage = futureMessages[Math.floor(Math.random() * futureMessages.length)];
            messageContent.textContent = randomMessage;
            futureMessage.style.display = 'block';
            
            // Save message to localStorage
            localStorage.setItem('lastFutureMessage', randomMessage);
            
            showNotification('Your bright future message revealed!', 'success');
        }, 1500);
    }

    // Share message
    function shareMessage() {
        const message = messageContent.textContent;
        const shareText = `My Bright Future Message: "${message}" - Discover yours at ${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My Bright Future Gift',
                text: shareText,
                url: window.location.href
            }).then(() => {
                showNotification('Shared successfully!', 'success');
            });
        } else {
            // Copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                showNotification('Message copied to clipboard!', 'success');
            });
        }
    }

    // Save message
    function saveMessage() {
        const message = messageContent.textContent;
        const blob = new Blob([`Bright Future Message:\n\n${message}\n\nReceived: ${new Date().toLocaleString()}\n\nWebsite: ${window.location.href}`], 
            { type: 'text/plain' });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bright-future-message.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('Message saved as text file!', 'success');
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Style
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(0, 255, 170, 0.9)' : 
                         type === 'error' ? 'rgba(255, 50, 50, 0.9)' : 
                         'rgba(0, 255, 234, 0.9)'};
            color: #000;
            padding: 15px 25px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            max-width: 400px;
            font-weight: 600;
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
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideIn 0.3s ease reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 4000);
    }

    // Update button state
    function updateButtonState(buttonId, enabled, text = null) {
        const button = document.getElementById(buttonId);
        if (enabled) {
            button.disabled = false;
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
        } else {
            button.disabled = true;
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
            if (text) {
                button.querySelector('span').textContent = text;
            }
        }
    }

    // Connect with saved account
    function connectWithSavedAccount(address) {
        connectedAccount = address;
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            updateConnectionUI(address);
            
            // Get balance
            web3.eth.getBalance(address).then(balance => {
                const ethBalance = web3.utils.fromWei(balance, 'ether');
                updateBalance(ethBalance);
            });
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }
    }

    // Event Listeners
    metamaskBtn.addEventListener('click', connectMetaMask);
    walletconnectBtn.addEventListener('click', connectWalletConnect);
    coinbaseBtn.addEventListener('click', connectCoinbase);
    openGiftBtn.addEventListener('click', openGift);
    shareBtn.addEventListener('click', shareMessage);
    saveBtn.addEventListener('click', saveMessage);
    disconnectBtn.addEventListener('click', disconnectWallet);
    
    // Gift box click
    giftBox.addEventListener('click', openGift);
    
    // Help modal
    helpBtn.addEventListener('click', () => {
        helpModal.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', () => {
        helpModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });

    // Initialize
    init();
});
