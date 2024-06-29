import axios from 'axios'
import { useContext } from 'react';
import AuthContext from './AuthProvider';
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";
import { toast } from 'react-toastify';


export default function useAxios(no_auth=false) {
    const baseUrl = "http://127.0.0.1:8000/api/v1";
    const { authTokens, setUser, setAuthTokens, user } = useContext(AuthContext);
    // const [instance, setInstance] = useState()
    const instance = axios.create({
        baseURL: baseUrl,
        timeout: 5000,
    });

    if(user !== null) {
        instance.interceptors.request.use(async req => {
            //check if acces token is expired
            const user = jwtDecode(authTokens.access);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
            if (!isExpired){
                console.log("token not expired")
                req.headers.Authorization = `Bearer ${authTokens.access}`;
                return req;
            }
            // gain new access token
            
            try {
                const isExpiredRefresh = dayjs.unix(jwtDecode(authTokens.refresh).exp).diff(dayjs()) < 1;
                if (!isExpiredRefresh){
                    const response = await axios.post(`${baseUrl}/token/refresh/`,{refresh: authTokens.refresh });
                    const token = { access: response.data.access, refresh:authTokens.refresh}
                    setAuthTokens(token);
                    localStorage.setItem("authTokens", JSON.stringify(token));
                    setUser(jwtDecode(token.access));
                    req.headers.Authorization = `Bearer ${response.data.access}`;
                }else{
                    toast.error("You need to login again")
                    window.location.href ="/login";
                }
            } catch (error) {
                console.log("error at useAxios")
                console.log(error)
                console.log(req)
            }
            return req;
        });
    }


  return instance;
}
