const API_URL = "http://localhost"; // this is the Laravel backend URL we should keep it empty

export async function getCsrf() {
    // Get CSRF cookie for the Sanctum
    await fetch(`${API_URL}/sanctum/csrf-cookie`, { credentials: "include" });
}

export async function login(email: string, password: string) {
    await getCsrf();

    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Login failed");
    }
    return res.json();
}

export async function getUser() {
    const res = await fetch(`${API_URL}/api/user`, {
        credentials: "include",
    });
    return res.json();
}

export async function logout() {
    await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });
}