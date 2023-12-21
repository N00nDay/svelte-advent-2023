<script lang="ts">
	type BadgeProps = {
		type: 'danger' | 'warning' | 'success' | 'info';
		label: string;
		className?: string;
	};

	let { type = 'info', label, className } = $props<BadgeProps>();
</script>

<div
	class="flex items-center justify-center py-0.5 font-medium rounded-full px-2 text-xs text-white{className
		? ` ${className}`
		: ''}"
	class:bg-red-600={type === 'danger'}
	class:bg-yellow-600={type === 'warning'}
	class:bg-green-600={type === 'success'}
	class:bg-blue-600={type === 'info'}
>
	{label}
</div>
