<script lang="ts">
	import AddSubtractButton from '$lib/components/AddSubtractButton.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Card from '$lib/components/Card.svelte';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { crossfade, fly, scale } from 'svelte/transition';

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	type ListItem = {
		index: number;
		name: string;
		weight: number;
	};

	type SleighLoad = {
		presentsCount: number;
		weight: number;
	};

	const SLEIGH_MAX_WEIGHT = 100;

	let { data } = $props();
	let presents = $state<ListItem[]>([...data.presents]);
	let sleighPacking = $state<ListItem[]>([]);
	let delivered = $state<SleighLoad[]>([]);

	let presentsWeight = $derived(calculateWeight(presents));
	let sleighPackingWeight = $derived(calculateWeight(sleighPacking));
	let deliveredWeight = $derived(calculateWeight(delivered));

	function sleighLoaderAI() {
		const sortedItems = [...presents].sort((a, b) => b.value / b.weight - a.value / a.weight);

		let currentGroupWeight = 0;

		for (const item of sortedItems) {
			if (currentGroupWeight + item.weight <= SLEIGH_MAX_WEIGHT) {
				sleighPacking = [...sleighPacking, item];
				currentGroupWeight += item.weight;
				presents = presents.filter((present) => present.index !== item.index);
			} else {
				deliverThePackedSleigh();
				sleighPacking = [item];
				currentGroupWeight = item.weight;
				presents = presents.filter((present) => present.index !== item.index);
			}
		}

		if (sleighPacking.length > 0) {
			deliverThePackedSleigh();
		}
	}

	function calculateWeight(items: ListItem[] | SleighLoad[]) {
		return items.reduce((acc, item) => acc + item.weight, 0).toFixed(2);
	}

	function packPresent(index: number) {
		const present = presents[index];
		sleighPacking = [...sleighPacking, present];
		presents = presents.filter((_, i) => i !== index);
	}

	function unPackPresent(index: number) {
		const present = sleighPacking[index];
		presents = [...presents, present];
		sleighPacking = sleighPacking.filter((_, i) => i !== index);
	}

	function deliverThePackedSleigh() {
		const sleighLoad = {
			presentsCount: sleighPacking.length,
			weight: parseFloat(sleighPackingWeight)
		};

		delivered = [...delivered, sleighLoad];
		sleighPacking = [];
	}

	function releaseTheGrinch() {
		presents = [...data.presents];
		sleighPacking = [];
		delivered = [];
	}
</script>

<div class="flex flex-row items-center justify-between mb-4">
	<h2 class="w-full flex-grwo">Jingle Bell Balancer</h2>
	<div class="flex flex-row items-center justify-between gap-2">
		<button
			disabled={sleighPacking.length === 0 && delivered.length === 0}
			class="rounded-full bg-red-600 text-white px-4 py-2 whitespace-nowrap disabled:!scale-100 disabled:bg-gray-300 disabled:text-gray-600"
			on:click={releaseTheGrinch}
		>
			Release the Grinch
		</button>
		<button
			disabled={sleighPacking.length === 0}
			class="rounded-full bg-green-600 text-white px-4 py-2 whitespace-nowrap disabled:!scale-100 disabled:bg-gray-300 disabled:text-gray-600"
			on:click={deliverThePackedSleigh}
		>
			Deliver The Sleigh
		</button>
		<button
			disabled={presents.length === 0}
			class="rounded-full bg-blue-600 text-white px-4 py-2 whitespace-nowrap disabled:!scale-100 disabled:bg-gray-300 disabled:text-gray-600"
			on:click={sleighLoaderAI}
		>
			Use Sleigh Loader AI
		</button>
	</div>
</div>

<div class="flex flex-row items-start justify-between gap-2">
	<div class="w-full flex flex-row items-center justify-between">
		<h2 class="w-full text-center">Presents</h2>
		<Badge type="info">{presentsWeight}</Badge>
	</div>
	<div class="w-full flex flex-row items-center justify-between">
		<h2 class="w-full text-center">Packing the Sleigh</h2>
		<Badge type="info">{sleighPackingWeight}</Badge>
	</div>
	<div class="w-full flex flex-row items-center justify-between">
		<h2 class="w-full text-center">Sleighs Delivered</h2>
		<Badge type="info">{deliveredWeight}</Badge>
	</div>
</div>

<div class="flex flex-row items-start justify-between gap-2 h-[calc(100%-44px-44px-16px-52px)]">
	<div class="flex flex-col gap-2 h-full overflow-y-auto w-full">
		{#each presents as present, i (present.index)}
			<div class="w-full" animate:flip transition:scale>
				<Card className="w-full">
					<div class="flex flex-row items-center justify-between">
						<h3 class="w-full flex-grow">{present.name}</h3>
						<Badge type="success" className="flex-shrink">{present.weight}</Badge>
					</div>
					<div class="w-full mt-4">
						<AddSubtractButton
							disabled={parseFloat(sleighPackingWeight) + present.weight > SLEIGH_MAX_WEIGHT}
							type="add"
							className="w-full text-sm py-2"
							on:click={() => {
								packPresent(i);
							}}
						>
							Pack It!
						</AddSubtractButton>
					</div>
				</Card>
			</div>
		{/each}
	</div>

	<div class="flex flex-col gap-2 h-full overflow-y-auto w-full">
		{#each sleighPacking as present, i (present.index)}
			<div class="w-full" animate:flip transition:scale>
				<Card className="w-full">
					<div class="flex flex-row items-center justify-between">
						<h3 class="w-full flex-grow">{present.name}</h3>
						<Badge type="success" className="flex-shrink">{present.weight}</Badge>
					</div>
					<div class="w-full mt-4">
						<AddSubtractButton
							type="subtract"
							className="px-4 w-full text-sm"
							on:click={() => {
								unPackPresent(i);
							}}
						>
							Unpack It!
						</AddSubtractButton>
					</div>
				</Card>
			</div>
		{/each}
	</div>

	<div class="flex flex-col gap-2 w-full">
		{#each delivered as sleighLoad, i (sleighLoad.weight)}
			<div class="w-full" animate:flip transition:scale>
				<Card className="w-full">
					<div class="flex flex-row items-center justify-between">
						<h3 class="w-full flex-grow">Sleigh #{i + 1}</h3>
						<Badge type="success" className="flex-shrink">{sleighLoad.weight}</Badge>
					</div>
				</Card>
			</div>
		{/each}
	</div>
</div>
