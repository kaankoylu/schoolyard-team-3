const API_URL = "http://localhost"; // Laravel backend

async function getCsrf() {
    // getting ssrf cookie
    const res = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include", 
    });
    if (!res.ok) {
        throw new Error("Failed to get CSRF cookie");
    }
}

export async function login(email: string, password: string) {
    await getCsrf(); // ensuring CSRF cookie is set

    const res = await fetch(`${API_URL}/login`, { 
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Login failed with status ${res.status}`);
    }

    return res.json();
}

export async function getUser() {
    const res = await fetch(`${API_URL}/api/user`, {
        method: "GET",
        credentials: "include",
        headers: { "Accept": "application/json" },
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to fetch user");
    }

    return res.json();
}

export async function logout() {
    await getCsrf();
    const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Accept": "application/json" },
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Logout failed");
    }

    return res.json();
}
