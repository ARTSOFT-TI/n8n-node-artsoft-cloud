import { INodeType, INodeTypeDescription, IExecuteFunctions, INodeExecutionData, IDataObject, NodeApiError } from 'n8n-workflow';
import { NodesDescription } from './nodes-description';
import { ArtResolver } from './resolver';

export class ArtsoftCloud implements INodeType {
	description: INodeTypeDescription = NodesDescription;

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const artResolver = new ArtResolver(this);

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;

				let parsed: Record<string, unknown> = await artResolver.resolve(operation, i);

				const root =
					(parsed['message'] as IDataObject) ||
					(parsed['document'] as IDataObject) ||
					(parsed['Entity'] as IDataObject) ||
					{};
				const err = root['@_err'] as string | number | undefined;

				if (err !== undefined && err !== null && err !== '') {
					throw new NodeApiError(
						this.getNode(),
						{ message: `ARTSOFT error: ${err}` },
						{ itemIndex: i },
					);
				}

				returnData.push({ json: parsed as IDataObject, pairedItem: i });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: i,
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
