import { API_INVOICES_ROUTE, API_INVOICE_PDF_ROUTE, API_INVOICE_ROUTE } from '@travel-tailor/constants';
import { useFetch } from '@travel-tailor/hooks'
import { TokenService } from './token.service';

const findAll = async (api_url: string, customer_id: string, setError: any) => {
    const response = await useFetch.protectedGet(`${api_url}${API_INVOICES_ROUTE}/${customer_id}`, `${TokenService.getAccessToken()}`, setError);
    return response;
};

const findOne = async (api_url: string, invoice_id: string, setError: any) => {
    const response = await useFetch.protectedGet(`${api_url}${API_INVOICE_ROUTE}/${invoice_id}`, `${TokenService.getAccessToken()}`, setError);
    return response;
};

const findOnePdf = async (api_url: string, invoice_id: string, setError: any) => {
    const response = await useFetch.protectedGetPdf(`${api_url}${API_INVOICE_PDF_ROUTE}/${invoice_id}`, `${TokenService.getAccessToken()}`, setError);
    const pdfBlob = await response!.blob();
    const buffer = await new Response(pdfBlob).arrayBuffer();
    return buffer;
};

export const InvoiceService = {
    findAll,
    findOne,
    findOnePdf,
};