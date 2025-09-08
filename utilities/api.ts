
const API_BASE_URL = 'https://api.launchspark.in/api';

interface ApiResponse<T = any> {
    code: 0 | 1;
    success: boolean;
    message: string;
    data?: T;
}

interface ContactPayload {
    fullName: string;
    email: string;
    mobileNumber: string;
    serviceOfInterest: string;
    projectDescription: string;
}

interface QuotePayload {
    fullName: string;
    email: string;
    mobileNumber: string;
    numberOfPages: string;
    budgetRange: string;
    projectDescription: string;
}

interface ReplicatePayload {
    projectName: string;
    estimatedPrice: string;
    fullName: string;
    email: string;
    mobileNumber: string;
    additionalNotes: string;
}

async function post<T>(endpoint: string, body: T): Promise<ApiResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        
        if (!response.ok) {
            // Handle non-2xx responses
            return {
                code: 1,
                success: false,
                message: `Server responded with status: ${response.status}`,
            };
        }
        
        return await response.json();
    } catch (error) {
        // Handle network errors
        return {
            code: 1,
            success: false,
            message: 'A network error occurred. Please try again later.',
        };
    }
}

export const submitContactForm = (payload: ContactPayload): Promise<ApiResponse> => {
    return post('/contact-us', payload);
};

export const submitQuoteRequest = (payload: QuotePayload): Promise<ApiResponse> => {
    return post('/get-quote', payload);
};

export const submitReplicationRequest = (payload: ReplicatePayload): Promise<ApiResponse> => {
    return post('/replicate-website', payload);
};
