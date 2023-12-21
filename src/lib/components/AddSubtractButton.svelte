<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	type AddSubtractButtonProps = {
		type: 'add' | 'subtract';
		className?: string;
	};

	let { type, className } = $props<AddSubtractButtonProps>();

	const DEFAULT_CLASS =
		'rounded-full text-white flex items-center justify-center min-w-10 min-h-10 text-2xl';

	const TYPE_CLASSES = {
		add: 'bg-blue-600 hover:bg-blue-700',
		subtract: 'bg-red-600 hover:bg-red-700'
	};

	let finalClass = $derived(twMerge(DEFAULT_CLASS, TYPE_CLASSES[type], className));
</script>

<button class={finalClass} on:click><slot /></button>
