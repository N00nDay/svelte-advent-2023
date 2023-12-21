import type { PageLoad } from './$types';

type ListItem = {
	name: string;
	tally: number;
};

export const load = (async ({ fetch }) => {
	async function getTheList() {
		const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
		const data = await response.json();
		return data as ListItem[];
	}

	return {
		title: 'Day 1',
		list: await getTheList()
	};
}) satisfies PageLoad;
