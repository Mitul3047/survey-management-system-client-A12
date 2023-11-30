import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://survey-api-three.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;