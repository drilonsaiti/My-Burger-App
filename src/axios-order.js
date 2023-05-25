import axios from "axios";


const instance = axios.create({
    baseURL: 'https://my-burger-app-71958-default-rtdb.europe-west1.firebasedatabase.app/'
});


export default instance;