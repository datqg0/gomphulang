async function test() {
    try {
        const res = await fetch('http://localhost:5000/api/auth/social-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: "google.user@example.com",
                username: "Google User",
                avatar: "https://lh3.googleusercontent.com/a/ACg8ocL...",
                googleId: "google-123456789"
            })
        });
        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Response:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Fetch error:', err.message);
    }
}
test();
