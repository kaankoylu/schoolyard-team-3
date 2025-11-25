<script lang="ts">
	// 1) Define the asset type and some example assets
	type Asset = {
		id: string;
		label: string;
		color: string; // styling
		width: number; // how many cells wide
		height: number; // how many cells tall
	};

	const assets: Asset[] = [
		{ id: 'tree', label: 'Boom', color: '#4ade80', width: 2, height: 2 },
		{ id: 'bench', label: 'Bankje', color: '#facc15', width: 2, height: 1 },
		{ id: 'slide', label: 'Glijbaan', color: '#60a5fa', width: 1, height: 2 },
		{ id: 'sandbox', label: 'Zandbak', color: '#f97316', width: 2, height: 2 }
	];

	// 2) Grid setup: many rows/cols = smaller cells over same image
	const rows = 18;
	const cols = 22;

	// background image for the playground template
	let backgroundImage: string =
		'/the-top-view-from-above-is-a-map-of-the-city-with-town-infrastructure-vector.jpg';

	// Each cell either has an Asset or null
	let grid: (Asset | null)[] = Array(rows * cols).fill(null);

	// 3) Currently dragged asset
	let draggedAsset: Asset | null = null;

	function handleDragStart(asset: Asset) {
		draggedAsset = asset;
	}

	function handleDragEnd() {
		draggedAsset = null;
	}

	function handleDragOver(event: DragEvent) {
		// needed so drop will fire
		event.preventDefault();
	}

	// Drop: fill a block of cells based on asset width/height
	function handleDrop(index: number) {
		if (!draggedAsset) return;

		const startRow = Math.floor(index / cols);
		const startCol = index % cols;

		const newGrid = [...grid];

		for (let dy = 0; dy < draggedAsset.height; dy++) {
			for (let dx = 0; dx < draggedAsset.width; dx++) {
				const r = startRow + dy;
				const c = startCol + dx;

				if (r >= rows || c >= cols) continue; // stay in bounds

				const i = r * cols + c;
				newGrid[i] = draggedAsset;
			}
		}

		grid = newGrid;
	}

	function clearCell(index: number) {
		grid = grid.map((cell, i) => (i === index ? null : cell));
	}
</script>

<div class="designer-page">
	<!-- SIDEBAR: assets -->
	<aside class="sidebar">
		<h2 class="sidebar-title">Your Toolbox</h2>

		<div class="asset-list">
			{#each assets as asset}
				<div
					class="asset"
					draggable="true"
					on:dragstart={() => handleDragStart(asset)}
					on:dragend={handleDragEnd}
					style={`background-color: ${asset.color};`}
				>
					{asset.label}
				</div>
			{/each}
		</div>

		<div class="how-to">
			<h3>How to play</h3>
			<ul>
				<li>💡 Sleep een object naar het rooster</li>
				<li>🎯 Laat los om het te plaatsen</li>
				<li>🧽 Dubbelklik om een vakje leeg te maken</li>
			</ul>
		</div>
	</aside>

	<!-- MAIN: grid -->
	<main class="grid-wrapper">
		<h2 class="grid-title">Jouw ontwerp</h2>

		<div
			class="design-area"
			style={`--rows: ${rows}; --cols: ${cols}; background-image: url('${backgroundImage}')`}
		>
			<div class="grid">
				{#each grid as cell, index}
					<div
						class="grid-cell"
						on:dragover={handleDragOver}
						on:drop={() => handleDrop(index)}
					>
						{#if cell}
							<div
								class="cell-asset"
								style={`background-color: ${cell.color};`}
								title={cell.label}
								on:dblclick={() => clearCell(index)}
							>
								{cell.label}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<p class="hint">
			💡 Sleep een object naar een vakje. Dubbelklik op een vakje om het leeg te maken.
		</p>
	</main>
</div>

<style>
	.designer-page {
		display: grid;
		grid-template-columns: 260px 1fr;
		min-height: calc(100vh - 5rem);
		gap: 1.5rem;
		padding: 1.5rem 2rem;
		background: radial-gradient(circle at top left, #fdf2ff, #f1f5f9);
	}

	/* SIDEBAR */
	.sidebar {
		background: #f9fafb;
		border-radius: 1rem;
		padding: 1rem;
		border: 1px solid #e5e7eb;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.sidebar-title {
		font-weight: 600;
		font-size: 1.1rem;
		padding: 0.75rem 1rem;
		border-radius: 0.9rem;
		background: linear-gradient(to right, #f472b6, #fb923c);
		color: white;
		text-align: center;
	}

	.asset-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.asset {
		padding: 0.5rem 0.75rem;
		border-radius: 0.75rem;
		cursor: grab;
		color: #111827;
		font-weight: 500;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
		transition:
			transform 0.1s ease,
			box-shadow 0.1s ease;
		text-align: center;
		background-color: white;
	}

	.asset:active {
		cursor: grabbing;
		transform: scale(0.96);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
	}

	.how-to {
		margin-top: auto;
		margin-bottom: 0.25rem;
		padding: 0.75rem 0.9rem;
		background: #ecfdf5;
		border-radius: 0.75rem;
		border: 1px solid #a7f3d0;
	}

	.how-to h3 {
		font-size: 0.85rem;
		font-weight: 600;
		color: #059669;
		margin-bottom: 0.25rem;
	}

	.how-to ul {
		font-size: 0.75rem;
		color: #4b5563;
		padding-left: 1rem;
		list-style: disc;
	}

	/* GRID SIDE */
	.grid-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		align-items: center;
	}

	.grid-title {
		font-weight: 600;
		font-size: 1.2rem;
		align-self: flex-start;
		color: #111827;
	}

	/* Fixed-size image area – grid stretches to fill it */
	.design-area {
		position: relative;

		/* tweak these two values to match your background image ratio */
		width: 900px;
		height: 520px;

		max-width: 100%;
		overflow: hidden;

		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;

		border-radius: 1rem;
		border: 2px solid #22c55e;
		padding: 6px;
		box-shadow:
			0 20px 40px rgba(15, 23, 42, 0.08),
			inset 0 0 0 1px rgba(16, 185, 129, 0.25);
		background-color: #ecfdf5;
	}

	/* grid always fills the design-area */
	.grid {
		width: 100%;
		height: 100%;

		display: grid;
		grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
		grid-template-rows: repeat(var(--rows), minmax(0, 1fr));
		gap: 2px;
		background: transparent;
	}

	.grid-cell {
		background: rgba(249, 250, 251, 0.35);
		border-radius: 0.35rem;
		border: 1px solid rgba(34, 197, 94, 0.45);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.7rem;
		color: #9ca3af;
	}

	.grid-cell.drag-over {
		border-color: #3b82f6;
	}

	.cell-asset {
		width: 100%;
		height: 100%;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.7rem;
		color: #111827;
		cursor: pointer;
	}

	.hint {
		font-size: 0.8rem;
		color: #6b7280;
		margin-top: 0.75rem;
		align-self: flex-start;
	}

	@media (max-width: 900px) {
		.designer-page {
			grid-template-columns: 1fr;
		}

		.design-area {
			width: 100%;
			height: auto;
			aspect-ratio: 900 / 520;
		}
	}
</style>
