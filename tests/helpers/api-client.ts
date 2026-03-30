import * as dotenv from 'dotenv';
import * as http from 'http';
import * as https from 'https';

dotenv.config();

const NIF = process.env.ARTSOFT_NIF!;
const API_KEY = process.env.ARTSOFT_API_KEY!;
const BASE_URL = `http://${NIF}.local.artsoft.cloud:3000/api`;

export interface ApiResponse {
	status: number;
	data: Record<string, unknown>;
}

export async function apiRequest(
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	path: string,
	body?: Record<string, unknown>,
	qs?: Record<string, unknown>,
): Promise<ApiResponse> {
	let fullUrl = `${BASE_URL}${path}`;

	if (qs && Object.keys(qs).length > 0) {
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(qs)) {
			params.append(key, String(value));
		}
		fullUrl += `?${params.toString()}`;
	}

	const parsed = new URL(fullUrl);
	const isHttps = parsed.protocol === 'https:';
	const lib = isHttps ? https : http;

	const bodyStr = body ? JSON.stringify(body) : undefined;

	return new Promise((resolve, reject) => {
		const req = lib.request(
			{
				hostname: parsed.hostname,
				port: parsed.port || (isHttps ? 443 : 80),
				path: parsed.pathname + parsed.search,
				method,
				headers: {
					'x-api-key': API_KEY,
					'Content-Type': 'application/json',
					Accept: 'application/json',
					...(bodyStr ? { 'Content-Length': Buffer.byteLength(bodyStr) } : {}),
				},
			},
			(res) => {
				let data = '';
				res.on('data', (chunk) => (data += chunk));
				res.on('end', () => {
					let parsed: Record<string, unknown>;
					try {
						parsed = JSON.parse(data);
					} catch {
						parsed = { raw: data };
					}

					if (res.statusCode && res.statusCode >= 400) {
						console.warn(
							`[${method} ${path}] Status ${res.statusCode}:`,
							JSON.stringify(parsed, null, 2),
						);
					}

					resolve({ status: res.statusCode ?? 0, data: parsed });
				});
			},
		);

		req.on('error', reject);
		if (bodyStr) req.write(bodyStr);
		req.end();
	});
}
