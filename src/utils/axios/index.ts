import axios from "axios";

export const instanceAuth = axios.create({
    baseURL: `https://api-v1.nzt-team.com/`,
    timeout: 1000,
    headers: {
        "X-Custom-Header": "foobar",
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TELEGRAM_API_TOKEN}`,
    },
});

