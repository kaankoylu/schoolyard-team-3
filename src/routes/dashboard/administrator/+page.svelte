<script>
	// Example: your navigation links
	const links = [
		{ name: "Dashboard", href: "/dashboard" },
		{ name: "Projects", href: "/projects" },
		{ name: "Settings", href: "/settings" },
		{ name: "Contact", href: "/contact" }
	];
</script>

<div class="w-full flex p-6 bg-green-200">
	<div class="w-1/2 flex flex-col items-center gap-4">
		<div class="w-40 h-40 rounded-full bg-green-300 overflow-hidden">
			<img 
				src="/dgfzhfh.jpg" 
				alt="Profile" 
				class="w-full h-full object-cover"
			/>
		</div>

		<h2 class="text-xl font-semibold">Marilin Monroe</h2>
	</div>

	<div class="w-1/2 flex-1 flex flex-col justify-center items-start pl-16 gap-4">
		{#each links as link}
			<a 
				href={link.href}
				class="px-6 py-3 bg-green-600 !text-black rounded-xl shadow 
					   hover:bg-green-700 transition font-medium"
			>
				{link.name}
			</a>
		{/each}
	</div>
</div>