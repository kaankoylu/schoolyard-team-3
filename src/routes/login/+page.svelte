<script>
	let activeTab = "teacher";

	const tabs = [
		{ id: "teacher", label: "Teacher" },
		{ id: "student", label: "Student" },
		{ id: "admin", label: "Administrator" }
	];
</script>

<div class="w-full min-h-screen flex flex-col items-center py-12">
	
<!-- Tabs -->
<div class="w-full max-w-md flex bg-[#f3f3f7] p-1 rounded-full shadow-sm mb-6">
	{#each tabs as tab}
		<button
			class={`flex-1 px-6 py-2 rounded-full transition font-medium text-center ${
				activeTab === tab.id 
				? "bg-white shadow text-black" 
				: "text-gray-600 hover:text-black"
			}`}
			on:click={() => activeTab = tab.id}
		>
			{tab.label}
		</button>
	{/each}
</div>


	<!-- Card -->
	<div class={`w-full max-w-md bg-white shadow-md p-8 rounded-xl ${ activeTab === "student" ? "border-4" : "border border-gray-200" }`} style={activeTab === "student" ? "border-color: #DAB2FF;" : ""} >

		
		{#if activeTab === "teacher"}
			<h2 class="text-xl font-semibold">Teacher Login</h2>
			<p class="text-gray-500 text-sm mb-6">
				Log in met jouw eigen account
			</p>

			<div class="space-y-4">
				<div>
					<label class="font-medium text-sm">Email</label>
					<input type="email" placeholder="docent@school.com"
						class="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md outline-none" />
				</div>

				<div>
					<label class="font-medium text-sm">Wachtwoord</label>
					<input type="password" placeholder="••••••••"
						class="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md outline-none" />
				</div>

				<button class="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900">
					Log in als docent
				</button>
			</div>

		{:else if activeTab === "student"}
        <div>
			<h2 class="student-font-size-login">🎉 Student Login</h2>
			<p class="text-gray-500 text-sm mb-6 student-font-size-description">
                Vul de code die je op je scherm ziet en starten maar!
			</p>

			<div class="space-y-4">
				<div>
					<label class="font-medium text-xl text-black">✏️ Wat is jouw naam?</label>
					<input type="text" placeholder="Vul je naam hier in"
						class="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md outline-none" />
				</div>

				<div>
					<label class="font-medium text-xl text-black">🔑 Vul de code in</label>
					<input type="password" placeholder="ABC123"
						class="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md outline-none" />
				</div>

				<button class="w-full text-white py-2 rounded-md bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500">
                    🚀 Let's go!
                </button>

			</div>
        </div>

		{:else if activeTab === "admin"}
			<h2 class="text-xl font-semibold">Administratie Login</h2>
			<p class="text-gray-500 text-sm mb-6">
				Log in met jouw administratie account
			</p>

			<div class="space-y-4">
				<div>
					<label class="font-medium text-sm">Email</label>
					<input type="text" placeholder="administratie@school.com"
						class="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md outline-none" />
				</div>

				<div>
					<label class="font-medium text-sm">Wachtwoord</label>
					<input type="password" placeholder="••••••••"
						class="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md outline-none" />
				</div>

				<button class="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900">
					Log in als administrator
				</button>
			</div>
		{/if}

	</div>
</div>

<style>
    body {
        background-color: #F5F9FF;
        margin: 0;
        min-height: 100vh;
    }

    .student-font-size-login{
        font-size: 30px;
        font-weight: 500;
        color: #000;
    }

    .student-font-size-description{
        font-size: 15px;
    }
</style>


