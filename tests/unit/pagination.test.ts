/* eslint-disable */
import { cloudApiRequestAllItems } from '../../nodes/ArtsoftCloud/resolver/artsoft-cloud/GenericFunctions';

type Page = { value: object[]; nextToken?: string };

function makeContext(params: Record<string, unknown>, pages: Page[]) {
	const requests: any[] = [];
	const context = {
		getNodeParameter: (name: string, _i: number, fallback?: unknown) =>
			name in params ? params[name] : fallback,
		getCredentials: async () => ({ nif: '999999999', apiKey: 'k', development: false }),
		getNode: () => ({ name: 'ARTSOFT' }),
		helpers: {
			httpRequestWithAuthentication: async (_cred: string, options: any) => {
				requests.push(options.qs);
				return pages[requests.length - 1] ?? { value: [] };
			},
		},
	};
	return { context: context as any, requests };
}

const rows = (from: number, to: number) =>
	Array.from({ length: to - from }, (_, k) => ({ id: from + k }));

describe('cloudApiRequestAllItems', () => {
	it('follows nextToken until it is absent when Return All is on', async () => {
		const { context, requests } = makeContext({ returnAll: true }, [
			{ value: rows(0, 200), nextToken: 'a' },
			{ value: rows(200, 400), nextToken: 'b' },
			{ value: rows(400, 450) },
		]);

		const result = await cloudApiRequestAllItems.call(context, '/customers/', 0);

		expect(result).toHaveLength(450);
		expect(requests.map((qs) => qs.$cursor)).toEqual([undefined, 'a', 'b']);
		expect(requests.every((qs) => qs.$size === 200)).toBe(true);
	});

	it('stops at the limit and requests only what is missing', async () => {
		const { context, requests } = makeContext({ returnAll: false, limit: 250 }, [
			{ value: rows(0, 200), nextToken: 'a' },
			{ value: rows(200, 250), nextToken: 'b' },
		]);

		const result = await cloudApiRequestAllItems.call(context, '/customers/', 0);

		expect(result).toHaveLength(250);
		expect(requests).toHaveLength(2);
		expect(requests.map((qs) => qs.$size)).toEqual([200, 50]);
	});

	it('uses a single request when the limit fits in one page', async () => {
		const { context, requests } = makeContext({ returnAll: false, limit: 10 }, [
			{ value: rows(0, 10), nextToken: 'a' },
		]);

		const result = await cloudApiRequestAllItems.call(context, '/customers/', 0);

		expect(result).toHaveLength(10);
		expect(requests).toHaveLength(1);
		expect(requests[0].$size).toBe(10);
	});

	it('returns an empty list when there are no results', async () => {
		const { context } = makeContext({ returnAll: true }, [{ value: [] }]);

		await expect(cloudApiRequestAllItems.call(context, '/customers/', 0)).resolves.toEqual([]);
	});

	it('forwards search, filter and sort params on every page', async () => {
		const { context, requests } = makeContext(
			{ returnAll: true, filters: { search: 'abc', sort: 'name', direction: 'desc' } },
			[{ value: rows(0, 1), nextToken: 'a' }, { value: rows(1, 2) }],
		);

		await cloudApiRequestAllItems.call(context, '/customers/', 0);

		for (const qs of requests) {
			expect(qs).toMatchObject({ $search: 'abc', $sort: 'name', $direction: 'desc' });
		}
	});
});
