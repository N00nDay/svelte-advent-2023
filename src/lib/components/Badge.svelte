<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	type BadgeProps = {
		type: 'danger' | 'warning' | 'success' | 'info';
		label: string;
		className?: string;
	};

	let { type = 'info', label, className } = $props<BadgeProps>();

	const DEFAULT_CLASS =
		'flex items-center justify-center py-0.5 font-medium rounded-full px-2 text-xs text-white';

	const TYPE_CLASSES = {
		danger: 'bg-red-600',
		warning: 'bg-yellow-600',
		success: 'bg-green-600',
		info: 'bg-blue-600'
	};

	let finalClass = $derived(twMerge(DEFAULT_CLASS, TYPE_CLASSES[type], className));
</script>

<div
	class={finalClass}
	class:bg-red-600={type === 'danger'}
	class:bg-yellow-600={type === 'warning'}
	class:bg-green-600={type === 'success'}
	class:bg-blue-600={type === 'info'}
>
	{label}
</div>
