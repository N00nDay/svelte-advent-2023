<script lang="ts">
	import AddSubtractButton from '$lib/components/AddSubtractButton.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Card from '$lib/components/Card.svelte';
	import Input from '$lib/components/Input.svelte';

	let { data } = $props();
	let theList = $state([...data.list]);

	function updatePerson(index: number, tally: number) {
		theList[index].tally = tally;
	}
</script>

<h2>The Naughty List</h2>

{#each theList as person, i}
	<Card className="max-w-lg m-auto mb-4 hover:shadow-xl transition-all hover:scale-[101%]">
		<div slot="title" class="flex flex-row items-center justify-between mb-4">
			<h3>{person.name}</h3>
			{#if person.tally <= 0}
				<Badge type="danger" label="Naughty" />
			{:else if person.tally <= 15}
				<Badge type="warning" label="Kind Of Naughty" />
			{:else}
				<Badge type="success" label="Nice" />
			{/if}
		</div>
		<div class="flex flex-row items-center justify-between gap-2 w-full mb-4">
			<Input
				type="number"
				label="Reason"
				value={person.tally}
				className="w-full"
				on:input={(e: Event) => {
                console.log(e);
                const { target } = e;
                if (target && target instanceof HTMLInputElement) {
                    updatePerson(i, parseInt(target.value))}}}
			/>
			<AddSubtractButton
				type="add"
				on:click={() => updatePerson(i, person.tally + 1)}
				className="mt-5">+</AddSubtractButton
			>
			<AddSubtractButton
				type="subtract"
				on:click={() => updatePerson(i, person.tally - 1)}
				className="mt-5">-</AddSubtractButton
			>
		</div>
	</Card>
{/each}
