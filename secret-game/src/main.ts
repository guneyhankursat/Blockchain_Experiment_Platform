import './style.css';

document.getElementById('themeToggle')?.addEventListener('change', function () {
  document.body.classList.toggle('dark');
});

document.getElementById('guess-form')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const secretInput = document.getElementById('secret-input') as HTMLInputElement;
  const statusDiv = document.getElementById('status');
  const secret = secretInput.value.trim();

  if (!secret) {
    statusDiv!.textContent = '⚠️ Please enter a secret guess.';
    return;
  }

  try {
    statusDiv!.textContent = '⏳ Sending guess to contract...';

    // --- Replace this section with real smart contract interaction ---
    // This is just a mock to simulate feedback
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (secret === '777') {
      statusDiv!.innerHTML = '✅ Correct! Contract unlocked successfully.';
    } else {
      statusDiv!.innerHTML = '❌ Incorrect secret. Try again.';
    }
    // ---------------------------------------------------------------

  } catch (err) {
    console.error(err);
    statusDiv!.textContent = '❌ Error interacting with contract.';
  }
});
