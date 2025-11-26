<script lang="ts">
	// Asset type
	type Asset = {
		id: string;
		label: string;
		color: string;
		width: number;
		height: number;
		image: string;
	};

	const assets: Asset[] = [
		{ id: 'tree', label: 'Boom',     color: '#4ade80', width: 2, height: 2, image: '/placeholder.png' },
		{ id: 'bench', label: 'Bankje',  color: '#facc15', width: 2, height: 1, image: '/placeholder.png' },
		{ id: 'slide', label: 'Glijbaan',color: '#60a5fa', width: 1, height: 2, image: '/placeholder.png' },
		{ id: 'sandbox', label: 'Zandbak', color: '#f97316', width: 2, height: 2, image: '/placeholder.png' }
	];

	const rows = 18;
	const cols = 22;

	let backgroundImage: string =
		'/the-top-view-from-above-is-a-map-of-the-city-with-town-infrastructure-vector.jpg';

	type PlacedAsset = {
		instanceId: number;
		asset: Asset;
		row: number;      // 0-based
		col: number;      // 0-based
		rotation: number; // 0, 90, 180, 270
	};

	let placedAssets: PlacedAsset[] = [];
	let nextInstanceId = 1;

	// history for undo
	let history: PlacedAsset[][] = [];

	// delete mode toggle
	let deleteMode = false;

	// track drag source: from palette or from already placed asset
	let dragSource:
		| { type: 'palette'; asset: Asset }
		| { type: 'placed'; instanceId: number }
		| null = null;

	// ===== helpers =====

	function pushHistory() {
		const snapshot = placedAssets.map((p) => ({ ...p }));
		history = [...history, snapshot];
	}

	function clampPosition(row: number, col: number, asset: Asset) {
		const maxRow = rows - asset.height;
		const maxCol = cols - asset.width;
		return {
			row: Math.max(0, Math.min(row, maxRow)),
			col: Math.max(0, Math.min(col, maxCol))
		};
	}

	function countPlaced(assetId: string): number {
		return placedAssets.filter((p) => p.asset.id === assetId).length;
	}

	// ===== drag from palette =====
	function handlePaletteDragStart(asset: Asset) {
		dragSource = { type: 'palette', asset };
	}

	// ===== drag existing placed asset =====
	function handlePlacedDragStart(instanceId: number) {
		dragSource = { type: 'placed', instanceId };
	}

	function handleDragEnd() {
		dragSource = null;
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}

	// Drop: either create new (palette) or move existing (placed)
	function handleDrop(index: number) {
		if (!dragSource) return;

		const baseRow = Math.floor(index / cols);
		const baseCol = index % cols;

		pushHistory(); // save state before change

		if (dragSource.type === 'palette') {
			const asset = dragSource.asset;
			const { row, col } = clampPosition(baseRow, baseCol, asset);

			const placed: PlacedAsset = {
				instanceId: nextInstanceId++,
				asset,
				row,
				col,
				rotation: 0
			};

			placedAssets = [...placedAssets, placed];
		} else if (dragSource.type === 'placed') {
			placedAssets = placedAssets.map((p) => {
				if (p.instanceId !== dragSource.instanceId) return p;
				const { row, col } = clampPosition(baseRow, baseCol, p.asset);
				return { ...p, row, col };
			});
		}
	}

	// click on an asset when delete mode is on
	function handleAssetClick(instanceId: number) {
		if (!deleteMode) return;

		pushHistory();
		placedAssets = placedAssets.filter((p) => p.instanceId !== instanceId);
	}

	// double-click asset to rotate 90°
	function rotateAsset(instanceId: number) {
		pushHistory();

		placedAssets = placedAssets.map((p) =>
			p.instanceId === instanceId
				? { ...p, rotation: (p.rotation + 90) % 360 }
				: p
		);
	}

	// buttons
	function resetGrid() {
		if (placedAssets.length === 0) return;
		pushHistory();
		placedAssets = [];
	}

	function undo() {
		if (history.length === 0) return;
		const prev = history[history.length - 1];
		history = history.slice(0, -1);
		placedAssets = prev;
	}

	function toggleDeleteMode() {
		deleteMode = !deleteMode;
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
					on:dragstart={() => handlePaletteDragStart(asset)}
					on:dragend={handleDragEnd}
				>
					<div class="asset-main">
						<img src={asset.image} alt={asset.label} class="asset-icon" />
						<span class="asset-label">{asset.label}</span>
					</div>
					<span class="asset-count">{countPlaced(asset.id)}</span>
				</div>
			{/each}
		</div>

		<div class="how-to">
			<h3>How to play</h3>
			<ul>
				<li>💡 Sleep een object naar het rooster</li>
				<li>🎯 Laat los om het te plaatsen</li>
				<li>✋ Sleep een geplaatst object om het te verplaatsen</li>
				<li>🔁 Dubbelklik op een object om te roteren</li>
				<li>🗑 Delete-modus + klik om te verwijderen</li>
			</ul>
		</div>
	</aside>

	<!-- MAIN: grid -->
	<main class="grid-wrapper">
		<h2 class="grid-title">Jouw ontwerp</h2>

		<!-- control buttons -->
		<div class="toolbar">
			<button class="btn secondary" type="button" on:click={resetGrid}>
				🧹 Reset grid
			</button>
			<button class="btn secondary" type="button" on:click={undo} disabled={history.length === 0}>
				↩️ Undo
			</button>
			<button
				type="button"
				class="btn secondary"
				on:click={toggleDeleteMode}
				class:active={deleteMode}
			>
				{deleteMode ? '❌ Exit delete mode' : '🗑 Delete mode'}
			</button>
		</div>

		<div
			class="design-area"
			style={`--rows: ${rows}; --cols: ${cols}; background-image: url('${backgroundImage}')`}
		>
			<div class="grid">
				<!-- grid cells as background / drop targets -->
				{#each Array(rows * cols) as _, index}
					<div
						class="grid-cell"
						on:dragover={handleDragOver}
						on:drop={() => handleDrop(index)}
					/>
				{/each}

				<!-- placed assets as ONE block spanning multiple cells -->
				{#each placedAssets as placed}
					<div
						class="placed-asset"
						draggable="true"
						on:dragstart={() => handlePlacedDragStart(placed.instanceId)}
						on:dragend={handleDragEnd}
						style={`grid-column: ${placed.col + 1} / span ${placed.asset.width}; grid-row: ${placed.row + 1} / span ${
							placed.asset.height
						}; background-image: url('${placed.asset.image}'); transform: rotate(${placed.rotation}deg);`}
						title={placed.asset.label}
						on:click={() => handleAssetClick(placed.instanceId)}
						on:dblclick|stopPropagation={() => rotateAsset(placed.instanceId)}
					/>
				{/each}
			</div>
		</div>

		<p class="hint">
			💡 Sleep een object naar een vakje. Sleep om te verplaatsen, dubbelklik om te roteren. Delete-modus + klik
			verwijdert.
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
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0.75rem;
		border-radius: 0.75rem;
		cursor: grab;
		color: #111827;
		font-weight: 500;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
		transition:
			transform 0.1s ease,
			box-shadow 0.1s ease;
		background-color: white;
	}

	.asset-main {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.asset-icon {
		width: 32px;
		height: 32px;
		border-radius: 0.5rem;
		object-fit: cover;
	}

	.asset-label {
		font-size: 0.9rem;
	}

	.asset-count {
		min-width: 1.5rem;
		text-align: center;
		font-size: 0.75rem;
		background: #e5e7eb;
		border-radius: 9999px;
		padding: 0.1rem 0.45rem;
		color: #374151;
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

	.toolbar {
		display: flex;
		gap: 0.5rem;
		align-self: flex-start;
		margin-bottom: 0.5rem;
	}

	.btn {
		border-radius: 0.75rem;
		padding: 0.4rem 0.9rem;
		font-size: 0.85rem;
		border: none;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.btn.secondary {
		background: #e5e7eb;
		color: #111827;
	}

	.btn.secondary:hover:enabled {
		background: #d1d5db;
	}

	.btn.secondary:disabled {
		opacity: 0.4;
		cursor: default;
	}

	.btn.active {
		background: #fecaca;
		color: #991b1b;
	}

	/* Fixed-size image area – grid stretches to fill it */
	.design-area {
		position: relative;
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

	.grid {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
		grid-template-rows: repeat(var(--rows), minmax(0, 1fr));
		gap: 2px;
		background: transparent;
		position: relative;
	}

	.grid-cell {
		background: rgba(249, 250, 251, 0.35);
		border-radius: 0.35rem;
		border: 1px solid rgba(34, 197, 94, 0.45);
	}

	.placed-asset {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		border-radius: 0.35rem;
		box-shadow: 0 4px 10px rgba(15, 23, 42, 0.25);
		transition: transform 0.15s ease;
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
