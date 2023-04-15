import type { NextRequest } from 'next/server';

export const config = {
    runtime: 'edge',
}

interface IHeaders {
    [key: string]: any
}

const prepareResponse=  (data: any, statusCode?: number|null, headers?: IHeaders|null) => {
    return new Response(
        JSON.stringify(data),
        {
            status: statusCode || 200,
            headers: {
                'content-type': 'application/json',
                ...headers || {}
            },
        }
    )
}

export default async function handler(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const movieTitle = searchParams.get('title');

    if (!movieTitle) {
        return prepareResponse(
            { success: false, message: 'Movie title is required' },
            400
        );
    }

    try {
        const response = await fetch(
            `https://${process.env.RAPID_API_HOST}?s=${movieTitle}&r=json&page=1`,
            {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
                    'X-RapidAPI-Host': `${process.env.RAPID_API_HOST}`
                }
            }
        );

        const data = await response.json();

        return prepareResponse({ success: true, data });
    } catch (exception) {

        console.log(exception);
        return prepareResponse({ success: false }, 503)
    }
}
