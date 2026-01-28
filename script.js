// script.js - CGB Main Controller
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const walletStatus = document.getElementById('walletStatus');
    const walletAddress = document.getElementById('walletAddress');
    const verifyBtn = document.getElementById('verifyBtn');
    const verifyStatus = document.getElementById('verifyStatus');
    const mintBtn = document.getElementById('mintBtn');
    const mintStatus = document.getElementById('mintStatus');
    const rewardBox = document.getElementById('rewardBox');
    const rewardTitle = document.getElementById('rewardTitle');
    const rewardMessage = document.getElementById('rewardMessage');
    const rewardDetails = document.getElementById('rewardDetails');

    // State
    let userWallet = null;
    let userAddress = null;
    let isEligible = false;

    // 1. Connect Wallet
    connectWalletBtn.addEventListener('click', async () => {
        try {
            if (typeof window.ethereum === 'undefined') {
                alert('Please install MetaMask!');
                return;
            }

            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            userWallet = window.ethereum;
            userAddress = accounts[0];
            
            // Display shortened address
            const shortAddr = userAddress.substring(0, 6) + '...' + userAddress.substring(38);
            walletAddress.textContent = shortAddr;
            walletStatus.classList.remove('hidden');
            connectWalletBtn.innerHTML = '<i class="fas fa-check"></i> Connected';
            connectWalletBtn.disabled = true;
            
            // Enable verify button
            verifyBtn.disabled = false;
            verifyStatus.textContent = 'Wallet connected. Ready for verification.';
            verifyStatus.style.color = '#00ffaa';
            
        } catch (error) {
            console.error('Connection error:', error);
            verifyStatus.textContent = 'Connection failed. Please try again.';
            verifyStatus.style.color = '#ff5555';
        }
    });

    // 2. Verify Eligibility
    verifyBtn.addEventListener('click', async () => {
        if (!userAddress) return;
        
        verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
        verifyBtn.disabled = true;
        
        // Simulate blockchain check (in real version, check balance/tokens)
        setTimeout(() => {
            // For demo: 80% chance of being eligible
            isEligible = Math.random() > 0.2;
            
            if (isEligible) {
                verifyStatus.innerHTML = '<i class="fas fa-check-circle"></i> Eligible! You qualify for a Seed NFT.';
                verifyStatus.style.color = '#00ffaa';
                
                // Enable mint button
                mintBtn.disabled = false;
                mintBtn.innerHTML = '<i class="fas fa-hammer"></i> Mint My Seed NFT';
                
                // Update reward box
                rewardBox.style.border = '2px solid #00ffaa';
                rewardMessage.textContent = 'You are verified! Ready to mint your Seed.';
                
            } else {
                verifyStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Not eligible yet.';
                verifyStatus.style.color = '#ff5555';
                mintBtn.disabled = true;
            }
            
            verifyBtn.innerHTML = '<i class="fas fa-search"></i> Verify Eligibility';
            verifyBtn.disabled = false;
        }, 1500);
    });

    // 3. Mint NFT
    mintBtn.addEventListener('click', async () => {
        if (!userAddress || !isEligible) return;
        
        mintBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Minting...';
        mintBtn.disabled = true;
        mintStatus.textContent = 'Minting your Seed NFT...';
        mintStatus.style.color = '#00ffaa';
        
        // Simulate minting delay
        setTimeout(() => {
            // Generate unique seed
            const seedTypes = ['Cosmic Seed', 'Temporal Seed', 'Harmony Seed', 'Nova Seed'];
            const seedType = seedTypes[Math.floor(Math.random() * seedTypes.length)];
            const tokenId = Date.now().toString().slice(-6);
            
            // Update UI
            rewardBox.querySelector('.nft-display').textContent = '🌱';
            rewardTitle.textContent = `Your ${seedType}`;
            rewardMessage.textContent = 'Successfully minted to your wallet!';
            rewardDetails.classList.remove('hidden');
            rewardDetails.innerHTML = `
                <p><strong>Seed Type:</strong> ${seedType}</p>
                <p><strong>Token ID:</strong> ${tokenId}</p>
                <p><strong>Owner:</strong> ${userAddress.substring(0,10)}...</p>
                <p><strong>Message:</strong> This Seed holds potential for Just Land.</p>
            `;
            
            rewardBox.style.background = 'linear-gradient(135deg, rgba(0, 212, 170, 0.3), rgba(138, 43, 226, 0.3))';
            
            mintStatus.innerHTML = '<i class="fas fa-check-circle"></i> Mint successful!';
            
            // Celebrate
            createConfetti();
            
            mintBtn.innerHTML = '<i class="fas fa-redo"></i> Mint Another';
            mintBtn.disabled = false;
        }, 2000);
    });

    // Confetti effect
    function createConfetti() {
        const confettiCount = 30;
        const confettiTypes = ['✨', '🌟', '⭐', '🎉', '🌱'];
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.textContent = confettiTypes[Math.floor(Math.random() * confettiTypes.length)];
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-20px';
                confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
                confetti.style.opacity = '0.9';
                confetti.style.zIndex = '9999';
                confetti.style.pointerEvents = 'none';
                confetti.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 2000);
            }, i * 100);
        }
        
        // Add animation CSS if not present
        if (!document.getElementById('confettiStyle')) {
            const style = document.createElement('style');
            style.id = 'confettiStyle';
            style.textContent = `
                @keyframes fall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize
    console.log('CGB - Crypto Gift Box initialized');
});
