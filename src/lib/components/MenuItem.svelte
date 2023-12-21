<script lang="ts">
	import { page } from '$app/stores';

	type MenuItemProps = {
		href: string;
		label: string;
	};

	let { href, label } = $props<MenuItemProps>();

	let id = $derived(href.split('/')[1] === '' ? 'home' : href.split('/')[1]);
</script>

<a
	{id}
	{href}
	class="block mb-2 rounded-md px-4 py-2 transition-colors text-gray-100 no-underline hover:no-underline"
	class:bg-gray-600={label === $page.data.title}
	class:hover:bg-gray-700={label !== $page.data.title}
	class:hover:bg-opacity-70={label !== $page.data.title}
	class:text-opacity-60={label !== $page.data.title}
	class:hover:text-opacity-90={label !== $page.data.title}
>
	{label}
</a>
