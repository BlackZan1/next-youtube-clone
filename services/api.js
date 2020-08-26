const instance = async (url, method = 'GET', body = {}, headers = {}) => {
    const options = {
        method,
        headers
    }

    if(method === 'POST') {
        options.body = JSON.stringify(body);
    }

    const res = await fetch(`/api/${url}`, {
        ...options
    })

    return res.json();
}

export const videosAPI = {
    async getItems() {
        const res = await instance('videos', 'GET');

        console.log(res);

        return res;
    },
    async getById(id) {
        const res = await instance(`videos/${id}`, 'GET');

        console.log(res);

        return res;
    },
    async getRelatedVideosById(id) {
        const res = await instance(`videos/related/${id}`, 'GET');

        console.log(res);

        return res;
    }
}

export const channelAPI = {
    async getById(id) {
        const res = await instance(`channels/${id}`, 'GET');

        console.log(res);

        return res;
    }
}

export const searchAPI = {
    async find(title) {
        const res = await instance(`search/${title}`);

        console.log(res);

        return res;
    }
}