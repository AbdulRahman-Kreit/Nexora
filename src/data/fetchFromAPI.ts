import postmanData from './Ananlysis Admin API.postman_collection.json';

const BASE_URL = 'https://analysis.laraveladvancedsayed101.cloud/api';

export async function fetchFromAPI(requestName: string) {
    let requestItem: any = null;

    if (requestName.includes('/')) {
        const [folderName, reqName] = requestName.split('/');
        const folder = postmanData.item.find(f => f.name.toLowerCase() === folderName.toLowerCase());
        requestItem = folder?.item?.find((req: any) => req.name.toLowerCase() === reqName.toLowerCase());
    } else {
        for (const folder of postmanData.item) {
            if (folder.item) {
                requestItem = folder.item.find((req: any) => req.name.toLowerCase() === requestName.toLowerCase());
                if (requestItem) break;
            }
        }
    }

    if (!requestItem) throw new Error(`Request "${requestName}" not found.`);

    const path = requestItem.request.url.path.join('/');

    const queryParams = requestItem.request.url.query
        ?.filter((q: any) => q.value !== null && !q.disabled)
        .map((q: any) => `${q.key}=${encodeURIComponent(q.value)}`)
        .join('&');

    const finalUrl = `${BASE_URL}/${path}${queryParams ? `?${queryParams}` : ''}`;

    console.log("🚀 Requesting:", finalUrl);

    const response = await fetch(finalUrl, {
        method: requestItem.request.method,
        headers: {
            'Accept': 'application/json',
        }
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    return response.json();
}