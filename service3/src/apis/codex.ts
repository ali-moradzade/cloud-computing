export interface CodexResponse {
    timeStamp: string;
    status: number;
    output: string;
    error: string;
    language: string;
    info: string;
}

export async function executeCode(urlEncoded: string) {
    const url = 'https://api.codex.jaagrav.in'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncoded
    });

    return await response.json() as CodexResponse;
}
