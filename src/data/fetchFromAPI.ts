import postmanData from './Ananlysis Admin API.postman_collection.json';

const BASE_URL = 'https://analysis.laraveladvancedsayed101.cloud/api';

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

export async function fetchFromAPI(requestName: string, category: string = '') {
    let requestItem: any = null;

    if (requestName.includes('/')) {
        const [folderName, reqName] = requestName.split('/');
        const folder = postmanData.item.find(f => f.name.toLowerCase() === folderName.trim().toLowerCase());
        requestItem = folder?.item?.find((req: any) => req.name.toLowerCase() === reqName.trim().toLowerCase());
    } else {
        requestItem = findRequestRecursive(postmanData.item, requestName.trim());
    }

    if (!requestItem) {
        throw new Error(`Request "${requestName}" not found in JSON collection.`);
    }

    const pathSegments = requestItem.request.url.path;
    const path = Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments;

    let finalUrl = `${BASE_URL}/${path}`.replace(/([^:]\/)\/+/g, "$1"); 
    
    if (category && category !== '') {
        finalUrl += `?category=${encodeURIComponent(category)}`;
    }
    
    console.log(`🚀 API Call: [${requestItem.request.method}] ${finalUrl}`);

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const response = await fetch(finalUrl, {
        method: requestItem.request.method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || `API Error: ${response.status}`);
    }

    return result;
}