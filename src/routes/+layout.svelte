<script>
	import { page } from '$app/stores';
	import MenuItem from '$lib/components/MenuItem.svelte';
	import '../app.css';
</script>

<div class="flex flex-col h-full">
	<header
		class="h-12 w-full shadow-md sticky top-0 z-[1] bg-blue-600 text-white flex items-center justify-start px-2 sm:px-4 text-2xl font-bold"
	>
		Svelte Advent of Code
	</header>

	<div class="flex flex-grow flex-row h-[calc(100%-48px)]">
		<div class="w-48 border-r h-full p-2 overflow-y-auto bg-gray-800">
			<MenuItem href="/" label="Home" />
			<MenuItem href="/day1" label="Day 1" />
			<MenuItem href="/day2" label="Day 2" />
			<MenuItem href="/day3" label="Day 3" />
			<MenuItem href="/day4" label="Day 4" />
			<MenuItem href="/day5" label="Day 5" />
			<MenuItem href="/day6" label="Day 6" />
			<MenuItem href="/day7" label="Day 7" />
			<MenuItem href="/day8" label="Day 8" />
			<MenuItem href="/day9" label="Day 9" />
			<MenuItem href="/day10" label="Day 10" />
			<MenuItem href="/day11" label="Day 11" />
			<MenuItem href="/day12" label="Day 12" />
			<MenuItem href="/day13" label="Day 13" />
			<MenuItem href="/day14" label="Day 14" />
			<MenuItem href="/day15" label="Day 15" />
			<MenuItem href="/day16" label="Day 16" />
			<MenuItem href="/day17" label="Day 17" />
			<MenuItem href="/day18" label="Day 18" />
			<MenuItem href="/day19" label="Day 19" />
			<MenuItem href="/day20" label="Day 20" />
			<MenuItem href="/day21" label="Day 21" />
			<MenuItem href="/day22" label="Day 22" />
			<MenuItem href="/day23" label="Day 23" />
			<MenuItem href="/day24" label="Day 24" />
			<MenuItem href="/day25" label="Day 25" />
		</div>

		<div class="flex-grow h-full overflow-y-auto px-2 sm:px-4">
			<h1 class="text-3xl font-bold py-2">{$page.data.title}</h1>
			<slot />
		</div>
	</div>
</div>
