import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		title: 'Day 2'
	};
}) satisfies PageLoad;
