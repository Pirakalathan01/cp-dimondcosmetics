import axios from "axios";
import env from "../config/env"

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = env.url;