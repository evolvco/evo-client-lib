import { getAccessToken } from '../auth'
import { ModelRecord, ViewProps } from '../types'

export async function resolve({view, params = {}}: ViewProps): Promise<ModelRecord> {
    try {
        const query = new URLSearchParams({
            params: JSON.stringify(params),
            where: JSON.stringify({ _id: view }),
        }).toString();

        const response = await fetch(`/api/sys_view/resolve?${query}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`
            }
        })
        if (!response.ok) {
            const json = await response.json();
            throw new Error(json.message);
        }
        const json = await response.json();
        return json.record
    } catch (error) {
        console.error((error as Error).message)
        throw error
    }
}