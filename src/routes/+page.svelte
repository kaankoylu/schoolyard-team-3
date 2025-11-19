<script>
	// in case of need, which is prob not needed
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Schoolplein ontwerper" />
</svelte:head>

<section class="min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-24 text-center">
	<h1 class="text-4xl md:text-5xl font-semibold text-blue-900">
		Ontwerp Jouw Droomspeelplaats
	</h1>

	<p class="mt-6 max-w-2xl mx-auto text-gray-600 text-lg">
		Een samenwerkingsplatform waar leerlingen hun ideale speelplaats kunnen ontwerpen,
		docenten projecten kunnen beheren en beheerders overzicht houden over plattegronden
		en beschikbare objecten.
	</p>

	<a
		href="/login"
		class="inline-block mt-8 px-8 py-3 rounded-md shadow transition 
		       !bg-black hover:!bg-neutral-800 !text-white"
	>
		Aan de slag
	</a>
</section>

<section class="w-full py-20 bg-white">
	<h2 class="text-center font-bold text-black mb-16" style="font-size: 35px">
		Functionaliteiten voor Iedereen
	</h2>

	<div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
		<!-- Students -->
		<div class="p-8 border rounded-xl shadow-sm hover:shadow-md transition">
			<div class="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
				<!-- Person icon (Students) -->
				<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M20 21v-2a4 4 0 00-3-3.87"></path>
					<path d="M4 21v-2a4 4 0 013-3.87"></path>
					<circle cx="12" cy="7" r="4"></circle>
				</svg>
			</div>

			<h3 class="text-xl font-semibold mb-2">Voor Leerlingen</h3>
			<p class="text-gray-600">
				Ontwerp en bewerk je eigen speelplaats met gebruiksvriendelijke tools
				en een grote selectie aan objecten om uit te kiezen.
			</p>
		</div>

		<!-- Teachers -->
		<div class="p-8 border rounded-xl shadow-sm hover:shadow-md transition">
			<div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
				<!-- Academic cap / Book icon (Teachers) -->
				<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M12 2l9 4-9 4-9-4 9-4z"></path>
					<path d="M3 10v6a3 3 0 003 3h12a3 3 0 003-3v-6"></path>
					<path d="M12 22v-8"></path>
				</svg>
			</div>

			<h3 class="text-xl font-semibold mb-2">Voor Docenten</h3>
			<p class="text-gray-600">
				Beheer klasprojecten, genereer toegangscodes, bekijk ontwerpen van leerlingen
				en verzamel feedback over speelplaatsobjecten.
			</p>
		</div>

		<!-- Administrators -->
		<div class="p-8 border rounded-xl shadow-sm hover:shadow-md transition">
			<div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
				<!-- Gear / Shield icon (Administrators) -->
				<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M12 1v3"></path>
					<path d="M12 20v3"></path>
					<path d="M4.2 4.2l2.1 2.1"></path>
					<path d="M17.7 17.7l2.1 2.1"></path>
					<path d="M1 12h3"></path>
					<path d="M20 12h3"></path>
					<path d="M4.2 19.8l2.1-2.1"></path>
					<path d="M17.7 6.3l2.1-2.1"></path>
					<circle cx="12" cy="12" r="3"></circle>
				</svg>
			</div>

			<h3 class="text-xl font-semibold mb-2">Voor Beheerders</h3>
			<p class="text-gray-600">
				Upload schoolplattegronden, beheer beschikbare objecten en houd overzicht
				over het gehele speelplaatsontwerpsysteem.
			</p>
		</div>
	</div>
</section>

<style>
	:global(body) {
		background: linear-gradient(180deg, #eef7ff 0%, #ffffff 50%);
		background-color: #eef7ff;
	}
</style>
