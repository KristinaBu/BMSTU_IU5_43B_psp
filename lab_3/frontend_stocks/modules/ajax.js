class Ajax {
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseJson = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return responseJson
        } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
        }
    }

    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
        }
    }

    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // сервер м не возвращать тело респонса и тогда нам придется возвращать null
            return response.headers.get("content-type")?.includes("json") ? await response.json() : null;
        } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
        }
    }
}

export const ajax = new Ajax();