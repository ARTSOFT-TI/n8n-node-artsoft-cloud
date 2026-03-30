import { IExecuteFunctions } from 'n8n-workflow';
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

