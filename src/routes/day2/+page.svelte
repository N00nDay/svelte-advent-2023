<script lang="ts">
	import AddSubtractButton from '$lib/components/AddSubtractButton.svelte';
	import Card from '$lib/components/Card.svelte';
	import Input from '$lib/components/Input.svelte';
	import Portal from '$lib/components/Portal.svelte';
	import { scale } from 'svelte/transition';

	let cookieCounter = $state(0);
	let santasMood = $derived(santaMoodTracker());
	let cookieCounterGetsReset = $state(false);

	function incrementCookieCounter() {
		cookieCounter += 1;
	}

	function decrementCookieCounter() {
		if (cookieCounter <= 0) {
			return;
		}

		cookieCounter -= 1;
	}

	function resetCookieCounter() {
		cookieCounter = 0;

		cookieCounterGetsReset = true;

		setTimeout(() => {
			cookieCounterGetsReset = false;
		}, 1500);
	}

	function santaMoodTracker() {
		if (cookieCounter <= 0) {
			return '😡';
		} else if (cookieCounter <= 15) {
			return '😐';
		} else {
			return '😁';
		}
	}
</script>

<Card className="max-w-lg m-auto">
	<div slot="title" class="flex flex-row items-center justify-between mb-4">
		<h3>The Cookie Counter</h3>
		<div>
			{santasMood}
		</div>
	</div>

	<div class="flex flex-row items-center justify-between">
		<div class="flex flex-row items-center">
			<Input type="number" bind:value={cookieCounter} className="w-16" min={0} />
		</div>

		<div class="flex flex-row items-center gap-2">
			<AddSubtractButton type="subtract" on:click={decrementCookieCounter}>-</AddSubtractButton>
			<AddSubtractButton type="add" on:click={incrementCookieCounter}>+</AddSubtractButton>
			<button class="py-2 px-4 text-white bg-green-600 rounded-full" on:click={resetCookieCounter}>
				Reset
			</button>
		</div>
	</div></Card
>

{#if cookieCounterGetsReset}
	<Portal>
		<div transition:scale class="fixed inset-0 flex items-center justify-center text-9xl z-[1]">
			🤮
		</div>
	</Portal>
{/if}
