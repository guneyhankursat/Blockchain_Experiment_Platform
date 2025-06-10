// Theme toggle logic
document.getElementById('themeToggle').addEventListener('change', function () {
    document.body.classList.toggle('dark');
  });
  
  // Form submission handler
  document.getElementById('guess-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const secretInput = document.getElementById('secret-input');
    const statusDiv = document.getElementById('status');
    const secret = secretInput.value.trim();
  
    if (!secret) {
      statusDiv.textContent = '⚠️ Please enter a secret guess.';
      return;
    }
  
    try {
      statusDiv.textContent = '⏳ Sending guess to contract...';
  
      // --- Fetch the secret hash from the smart contract ---
      const contract = new HashLock(); // Initialize the contract instance
      const expectedHash = await contract.methods.getSecretHash(); // Replace with actual method
  
      // Convert the user's input to hash and compare with the contract's stored hash
      const userHash = sha256(toByteString(secret, true)); 
  
      if (userHash === expectedHash) {
        statusDiv.innerHTML = '✅ Correct! Contract unlocked successfully.';
      } else {
        statusDiv.innerHTML = '❌ Incorrect secret. Try again.';
      }
  
    } catch (err) {
      console.error(err);
      statusDiv.textContent = '❌ Error interacting with contract.';
    }
  });
  