onmessage = async function (e) {
    const { url, method, data, headers } = e.data;

    try {
        const response = await fetch(url, {
            method: method || 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        postMessage({ status: 'success', data: result });
    } catch (error) {
        postMessage({ status: 'error', error: error.message });
    }
};