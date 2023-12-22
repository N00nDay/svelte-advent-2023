<script lang="ts">
	import Card from '$lib/components/Card.svelte';

	type HeartRate = {
		heartRate: number;
	};

	let heartRateIcon: SVGElement | undefined = $state();

	async function getTheBeat() {
		const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-four.json');
		const data = await response.json();
		return data as HeartRate;
	}

	let heartRate = $state(68);
	let animationDuration = $derived(60 / heartRate);

	$effect(() => {
		if (heartRateIcon) {
			heartRateIcon.style.animationDuration = `${animationDuration}s`;
		}
	});

	$effect(() => {
		const interval = setInterval(async () => {
			const data = await getTheBeat();
			heartRate = data.heartRate;
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<h2>Santa's Heart Rate</h2>

<Card className="w-full flex flex-col gap-4 items-center justify-center">
	<svg
		bind:this={heartRateIcon}
		class="heart-icon"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="240px"
		height="240px"
		fill="#ff0000"
		><title>heart</title><path
			d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
		/></svg
	>
	<h3 class="text-2xl font-bold">{heartRate} bpm</h3>
</Card>

<style>
	@keyframes pulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}

	.heart-icon {
		animation: pulse 1s infinite;
	}
</style>
