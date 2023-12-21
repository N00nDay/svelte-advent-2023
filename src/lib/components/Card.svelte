<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	type CardProps = {
		className?: string;
	};

	const DEFAULT_CLASS = 'flex flex-col p-4 rounded-md shadow-md bg-white';

	const { className } = $props<CardProps>();

	const finalClass = twMerge(DEFAULT_CLASS, className);
</script>

<div class={finalClass}>
	<slot name="title" />
	<slot />
</div>
