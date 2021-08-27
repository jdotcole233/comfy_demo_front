import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';

export function useNetworkStatus() {
    const [isOnline, setNetwork] = useState(window.navigator.onLine);

    useEffect(() => {
        window.addEventListener("offline",
            () => setNetwork(window.navigator.onLine)
        );
        window.addEventListener("online",
            () => setNetwork(window.navigator.onLine)
        );
    });

    return isOnline;
}

export function useCookies(key, initialvalue) {
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(() => {
        const jsonValue = Cookies.getJSON(prefixedKey);
        if (jsonValue !== null) return jsonValue;
        if (typeof initialvalue === "function") {
            return initialvalue()
        } else {
            return initialvalue
        }
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value]);

    return [value, setValue];
}

const PREFIX = "kek-system-vitals-";

export default function useLocalStorage(key, initialvalue) {
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(() => {
        const jsonValue = window.localStorage.getItem(prefixedKey);
        if (jsonValue != null) return JSON.parse(jsonValue)
        if (typeof initialvalue === "function") {
            return initialvalue();
        } else {
            return initialvalue;
        }
    })

    useEffect(() => {

        window.localStorage.setItem(prefixedKey, JSON.stringify(value))

    }, [prefixedKey, value]);

    return [value, setValue]
}