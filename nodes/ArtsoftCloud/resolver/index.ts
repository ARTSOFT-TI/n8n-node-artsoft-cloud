import { IDataObject, IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { operations } from './handler';

export class ArtResolver {
	private context: IExecuteFunctions;
	constructor(_rootctx: IExecuteFunctions) {
		this.context = _rootctx;
	}

	async resolve(op: string, i: number): Promise<Record<string, unknown> | IDataObject[]> {
		const handler = operations[op];
		if (!handler) {
			throw new NodeOperationError(this.context.getNode(), `Unknown operation: ${op}`, {
				itemIndex: i,
			});
		}
		return handler.call(this.context, i);
	}
}
