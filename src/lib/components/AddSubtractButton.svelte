<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	type AddSubtractButtonProps = {
		type: 'add' | 'subtract';
		className?: string;
		disabled?: boolean;
	};

	let { type, className, disabled } = $props<AddSubtractButtonProps>();

	const DEFAULT_CLASS =
		'rounded-full text-white flex items-center justify-center min-w-10 min-h-10 text-2xl disabled:!scale-100 disabled:bg-gray-300 disabled:text-gray-600';

	const TYPE_CLASSES = {
		add: 'bg-blue-600 hover:bg-blue-700',
		subtract: 'bg-red-600 hover:bg-red-700'
	};

	let finalClass = $derived(twMerge(DEFAULT_CLASS, TYPE_CLASSES[type], className));
</script>

<button {disabled} class={finalClass} on:click><slot /></button>
