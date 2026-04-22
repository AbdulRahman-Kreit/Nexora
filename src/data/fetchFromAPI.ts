import postmanData from './Ananlysis Admin API.postman_collection.json';

const BASE_URL = "https://analysis.gproject.space/api";

function findRequestRecursive(items: any[], targetName: string): any {
    for (const item of items) {
        if (item.request && item.name.toLowerCase() === targetName.toLowerCase()) {
            return item;
        }
        if (item.item) {
            const found = findRequestRecursive(item.item, targetName);
            if (found) return found;
        }
    }
    return null;
}

export async function fetchFromAPI(requestName: string, payload: any = null, paramsObj: Record<string, string> = {}) {
    let requestItem: any = null;

    if (requestName.includes('/')) {
        const [folderName, reqName] = requestName.split('/');
        const folder = postmanData.item.find(f => f.name.toLowerCase() === folderName.trim().toLowerCase());
        requestItem = folder?.item?.find((req: any) => req.name.toLowerCase() === reqName.trim().toLowerCase());
    } else {
        requestItem = findRequestRecursive(postmanData.item, requestName.trim());
    }

    if (!requestItem) throw new Error(`Request "${requestName}" not found in Postman JSON.`);

    const pathSegments = requestItem.request.url.path;
    let path = Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments;
    
    path = path.replace(/^api\//, "");

    let finalUrl = `${BASE_URL}/${path}`.replace(/([^:]\/)\/+/g, "$1"); 
    
    const urlParams = new URLSearchParams();
    Object.entries(paramsObj).forEach(([key, value]) => {
        if (value) urlParams.append(key, value);
    });
    
    const queryString = urlParams.toString();
    if (queryString) finalUrl += `?${queryString}`;

    console.log(`Fetching from: ${finalUrl}`);

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const method = requestItem.request.method;

    const response = await fetch(finalUrl, {
        method: method,
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', 
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: (method !== 'GET' && payload) ? JSON.stringify(payload) : undefined,
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        const textError = await response.text();
        console.error("Server returned non-JSON:", textError);
        throw new Error(`Server Error: Received HTML instead of JSON. Check the network tab.`);
    }

    const result = await response.json();
    
    if (response.status === 401) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login'; 
        }
        throw new Error("Session expired");
    }

    if (!response.ok) throw new Error(result.message || `Error: ${response.status}`);

    return result;
}