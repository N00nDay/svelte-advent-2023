import type { PageLoad } from './$types';

type ListItem = {
	index: number;
	name: string;
	weight: number;
};

function addIdToPresents(presents: ListItem[]) {
	return presents.map((present, i) => ({ ...present, index: i }));
}

export const load = (async ({ fetch }) => {
	async function getThePresents() {
		const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json');
		const data = await response.json();
		return data as ListItem[];
	}

	let presents = await getThePresents();
	presents = addIdToPresents(presents);

	return {
		title: 'Day 3',
		presents
	};
}) satisfies PageLoad;
