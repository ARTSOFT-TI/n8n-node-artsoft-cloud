import { IExecuteFunctions } from 'n8n-workflow';
import { executeCreateClient, executeDeleteClient, executeGetClient, executeUpdateClient } from './customer';
import { executeCreateSupplier, executeDeleteSupplier, executeGetSupplier, executeUpdateSupplier } from './fornecedor';
import { executeCreateProduct, executeDeleteProduct, executeGetProduct, executeUpdateProduct } from './produtos';
import { executeCreateDocument, executeDeleteDocument, executeGetDocument, executeSignDocument } from './documentos';
import { executeCreateWorkflow, executeGetWorkflow, executeGetWorkflows, executeUpdateWorkflow, executeWorkflowAction } from './workflow';
import { executeAddMessage, executeCreateEvent, executeDeleteEvent, executeGetEvent, executeListEvents, executeUpdateEvent } from './event';
import { cloudListCustomers, cloudGetCustomer, cloudCreateCustomer, cloudUpdateCustomer, cloudDeleteCustomer } from './artsoft-cloud/customers';
import { cloudListSuppliers, cloudGetSupplier, cloudCreateSupplier, cloudUpdateSupplier, cloudDeleteSupplier } from './artsoft-cloud/suppliers';
import { cloudListProducts, cloudGetProduct, cloudCreateProduct, cloudUpdateProduct, cloudDeleteProduct } from './artsoft-cloud/products';
import { cloudListBillings, cloudListBillingsBySaftType, cloudListPurchases, cloudListPurchasesBySaftType, cloudGetDocument, cloudCreateDocumentHeader, cloudUpdateDocument, cloudDeleteDocument } from './artsoft-cloud/documents';
import { cloudListDocumentLines, cloudGetDocumentLine, cloudCreateDocumentLine, cloudUpdateDocumentLine, cloudDeleteDocumentLine } from './artsoft-cloud/document-lines';
import { cloudListSalespersons, cloudGetSalesperson, cloudCreateSalesperson, cloudUpdateSalesperson, cloudDeleteSalesperson } from './artsoft-cloud/salespersons';
import { cloudListCustomerAccounts, cloudListSupplierAccounts, cloudGetCurrAccount, cloudCreateCurrAccountEntry, cloudCreateCurrAccountRegul, cloudUpdateCurrAccount, cloudDeleteCurrAccount } from './artsoft-cloud/curr-account';

export type OperationHandler = (
	this: IExecuteFunctions,
	i: number,
) => Promise<Record<string, unknown>>;

export const operations: Record<string, OperationHandler> = {
	// Customer
	createClient: executeCreateClient,
	getClient: executeGetClient,
	updateClient: executeUpdateClient,
	deleteClient: executeDeleteClient,

	// Suppliers
	createSupplier: executeCreateSupplier,
	getSupplier: executeGetSupplier,
	updateSupplier: executeUpdateSupplier,
	deleteSupplier: executeDeleteSupplier,

	// Produtos
	createProduct: executeCreateProduct,
	getProduct: executeGetProduct,
	updateProduct: executeUpdateProduct,
	deleteProduct: executeDeleteProduct,

	// Documents
	createDocument: executeCreateDocument,
	getDocument: executeGetDocument,
	signDocument: executeSignDocument,
	deleteDocument: executeDeleteDocument,

	// Workflow
	getWorkflows: executeGetWorkflows,
	getWorkflow: executeGetWorkflow,
	createWorkflow: executeCreateWorkflow,
	updateWorkflow: executeUpdateWorkflow,
	executeWorkflowAction: executeWorkflowAction,

	// Event (CRM)
	listEvents: executeListEvents,
	getEvent: executeGetEvent,
	createEvent: executeCreateEvent,
	updateEvent: executeUpdateEvent,
	addMessage: executeAddMessage,
	deleteEvent: executeDeleteEvent,

	// Cloud — Clientes
	cloudListCustomers,
	cloudGetCustomer,
	cloudCreateCustomer,
	cloudUpdateCustomer,
	cloudDeleteCustomer,

	// Cloud — Fornecedores
	cloudListSuppliers,
	cloudGetSupplier,
	cloudCreateSupplier,
	cloudUpdateSupplier,
	cloudDeleteSupplier,

	// Cloud — Produtos
	cloudListProducts,
	cloudGetProduct,
	cloudCreateProduct,
	cloudUpdateProduct,
	cloudDeleteProduct,

	// Cloud — Documentos
	cloudListBillings,
	cloudListBillingsBySaftType,
	cloudListPurchases,
	cloudListPurchasesBySaftType,
	cloudGetDocument,
	cloudCreateDocumentHeader,
	cloudUpdateDocument,
	cloudDeleteDocument,

	// Cloud — Linhas de Documento
	cloudListDocumentLines,
	cloudGetDocumentLine,
	cloudCreateDocumentLine,
	cloudUpdateDocumentLine,
	cloudDeleteDocumentLine,

	// Cloud — Vendedores
	cloudListSalespersons,
	cloudGetSalesperson,
	cloudCreateSalesperson,
	cloudUpdateSalesperson,
	cloudDeleteSalesperson,

	// Cloud — Conta Corrente
	cloudListCustomerAccounts,
	cloudListSupplierAccounts,
	cloudGetCurrAccount,
	cloudCreateCurrAccountEntry,
	cloudCreateCurrAccountRegul,
	cloudUpdateCurrAccount,
	cloudDeleteCurrAccount,
};
