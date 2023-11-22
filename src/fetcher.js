const BASE_URL = "http://localhost:3001" 

//catch any errors that may occur in the request to the server
//like it is not running or working slowly
const fetcher = async (url) => {
    let responseObject = {errorMessage: "", data: []}
    
    try {
        const response = await fetch(BASE_URL+url);
        //show an error message with the request status
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }
        const responseData = await response.json();
        responseObject.errorMessage = "";
        responseObject.data = responseData;

        return responseObject;
    } catch (err) {
        responseObject.errorMessage = err.message;
        return responseObject;
    }

}

// make a reference to the request from the fetcher for each request to make it general
export const getCategories = () => {
    return fetcher("/categorias");
}

export const getProducts = id => {
    return fetcher("/productos?catId="+id);
}