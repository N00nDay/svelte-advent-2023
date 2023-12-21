<script lang="ts">
	import { slide } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';

	type InputProps = {
		autocapitalize?: string;
		autocomplete?: string;
		name?: string;
		readonly?: boolean;
		tabindex?: number;
		disabled?: boolean;
		placeholder?: string;
		error?: boolean;
		value?: string | number;
		label?: string;
		min?: number;
		max?: number;
		type:
			| 'text'
			| 'number'
			| 'password'
			| 'email'
			| 'tel'
			| 'url'
			| 'search'
			| 'date'
			| 'time'
			| 'datetime-local'
			| 'month'
			| 'week'
			| 'color';
		className?: string;
	};

	let {
		autocapitalize,
		autocomplete,
		name,
		readonly,
		tabindex,
		disabled,
		placeholder,
		error,
		value,
		label,
		type,
		className,
		min,
		max
	} = $props<InputProps>();

	function useType(node: HTMLInputElement) {
		node.type = type;
	}

	const DEFAULT_CLASS = 'group';

	let finalClass = $derived(twMerge(DEFAULT_CLASS, className));
</script>

<div class={finalClass}>
	{#if label}
		<label
			for={name}
			class="block text-sm font-medium"
			class:text-red-600={error}
			class:text-gray-600={!error}>{label}</label
		>
	{/if}
	<div
		class="mt-1 relative rounded-md h-[2.5rem]"
		class:text-danger={error}
		class:opacity-75={disabled}
	>
		<input
			use:useType
			{autocapitalize}
			{autocomplete}
			{name}
			id={name}
			{readonly}
			{tabindex}
			{disabled}
			{min}
			{max}
			class="block h-[2.5rem] w-full px-3 border outline-none focus:outline-none sm:text-sm rounded-md bg-white outline-offset-0 placeholder-gray-300 placeholder-opacity-80"
			class:border-gray-300={!error}
			class:border-red-600={error}
			class:text-red-600={error}
			class:placeholder-red-600={error}
			class:focus:border-red-500={error}
			class:focus:border-blue-600={!error}
			class:group-focus-within:not(.disable-focus-active):border-red-500={error}
			class:group-focus-within:not(.disable-focus-active):border-blue-600={!error}
			class:group-active:not(.disable-focus-active):border-red-500={error}
			class:group-active:not(.disable-focus-active):border-blue-600={!error}
			class:bg-default={disabled}
			{placeholder}
			bind:value
			on:input
		/>
	</div>
	{#if error}
		<p transition:slide|local class="mt-2 text-sm text-red-600" id="{name}-error">
			{error}
		</p>
	{/if}
</div>
