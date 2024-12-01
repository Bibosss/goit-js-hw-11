const BASE_URL = "https://pixabay.com/api/";


export const pixabayApi = searchQuery => {
    const params = new URLSearchParams({
    key: "47362908-c1a65ba58d6ddf3afd8961379",
    q: searchQuery,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
})

return fetch(`${BASE_URL}?${params}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
})
}