import postmanData from './Ananlysis Admin API.postman_collection.json';

const BASE_URL = 'https://analysis.laraveladvancedsayed101.cloud/api';

export async function fetchFromAPI(requestName: string) {
    let requestItem: any = null;

    if (requestName.includes('/')) {
        const [folderName, reqName] = requestName.split('/');
        
        const folder = postmanData.item.find(
            (f: any) => f.name.toLowerCase() === folderName.toLowerCase()
        );
        
        if (folder && folder.item) {
            requestItem = folder.item.find(
                (req: any) => req.name.toLowerCase() === reqName.toLowerCase()
            );
        }
    }

    if (!requestItem) {
        for (const folder of postmanData.item) {
            if (folder.item) {
                requestItem = folder.item.find((req: any) => req.name === requestName);
            }
            if (requestItem) break;
        }
    }

    if (!requestItem) {
        requestItem = postmanData.item.find((req: any) => req.name === requestName);
    }

    if (!requestItem) throw new Error(`Request "${requestName}" not found in Postman collection.`);

    const path = requestItem.request.url.path.join('/');
    
    const response = await fetch(`${BASE_URL}/${path}`);
    if (!response.ok) throw new Error('Network response is not ok');

    return response.json();
}