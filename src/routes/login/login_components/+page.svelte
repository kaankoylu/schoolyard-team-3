<script lang="ts">
  export let mode: "teacher" | "student" | "admin" = "student";
  export let active: boolean = false;   // for purple border

   import { login } from "$lib/api";

  let email = ""; // teacher or admin email 
  let password = ""; // taeacher or admin password
  let name = ""; //student name 
  let code = ""; // student join code variable
  let error = "";

  /**
   * for teacher login variables can change but for developing 
   * i will keep it as simple as possible because i am constantly trying it 
   */
  async function handleTeacherLogin() {
    try {
      await login(email, password);
      error = "";
      alert("Teacher logged in!");
    } catch (err: any) {
      error = err.message;
    }
  }

  /**
   * for student login variables, it can change.
   */
  async function handleStudentLogin() {
    try {
      await login(name, code); 
      error = "";
      alert("Student logged in!");
    } catch (err: any) {
      error = err.message;
    }
  }
</script>

<!-- Card -->
<div
  class={`w-full max-w-md bg-white shadow-md p-8 rounded-xl ${
    active ? "border-4" : "border border-gray-200"
  }`}
  style={active ? "border-color: #DAB2FF;" : ""}
>

  {#if mode === "teacher"}
    <h2 class="text-xl font-semibold">Teacher Login</h2>
    <p class="text-gray-500 text-sm mb-6">
      Log in met jouw eigen account
    </p>

    <div class="space-y-4">
      <div>
        <label class="font-medium text-sm">Email</label>
        <input
          type="email"
          placeholder="docent@school.com"
          class="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md outline-none"
          bind:value={email} 
        />
      </div>

      <div>
        <label class="font-medium text-sm">Wachtwoord</label>
        <input
          type="password"
          placeholder="••••••••"
          class="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md outline-none"
          bind:value={password}
        />
      </div>

      <button class="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900" on:click={handleTeacherLogin}>
        Log in als docent
      </button>
    </div>

  {:else if mode === "student"}
    <div>
      <h2 class="student-font-size-login">🎉 Student Login</h2>
      <p class="text-gray-500 text-sm mb-6 student-font-size-description">
        Vul de code die je op je scherm ziet en starten maar!
      </p>

      <div class="space-y-4">
        <div>
          <label class="font-medium text-xl text-black">✏️ Wat is jouw naam?</label>
          <input
            type="text"
            placeholder="Vul je naam hier in"
            class="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md outline-none"
            bind:value={name}
          />
        </div>

        <div>
          <label class="font-medium text-xl text-black">🔑 Vul de code in</label>
          <input
            type="password"
            placeholder="ABC123"
            class="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md outline-none"
            bind:value={code}
          />
        </div>

        <button
          class="w-full text-white py-2 rounded-md bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500"
          on:click={handleStudentLogin}
        >
          🚀 Let's go!
        </button>
      </div>
    </div>

  {:else if mode === "admin"}
    <h2 class="text-xl font-semibold">Administratie Login</h2>
    <p class="text-gray-500 text-sm mb-6">
      Log in met jouw administratie account
    </p>

    <div class="space-y-4">
      <div>
        <label class="font-medium text-sm">Email</label>
        <input
          type="text"
          placeholder="administratie@school.com"
          class="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md outline-none"
          bind:value={email}
        />
      </div>

      <div>
        <label class="font-medium text-sm">Wachtwoord</label>
        <input
          type="password"
          placeholder="••••••••"
          class="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md outline-none"
          bind:value={password}
        />
      </div>

      <button class="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900" >
        Log in als administrator
      </button>
    </div>
  {/if}

</div>
