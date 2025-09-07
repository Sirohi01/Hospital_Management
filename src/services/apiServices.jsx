    import axios from "axios";

    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
    export const callApi = async ({ endpoint, method = "GET", body = null, headers = {} }) => {
    const url = `${BASE_URL}/${endpoint}`;

    try {
        const response = await axios({
        url,
        method,
        data: body,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        });

        return { data: response.data };
    } catch (error) {
        // Axios error handling
        if (error.response) {
        // Server responded with status code outside 2xx
        throw {
            response: {
            status: error.response.status,
            data: error.response.data,
            },
        };
        } else {
        // Network error or request not sent
        throw {
            response: {
            status: 500,
            data: { message: "Network error or server unavailable" },
            },
        };
        }
    }
    };
    export const message = {
    success: (msg) => {
        showNotification(msg, "success");
    },
    error: (msg) => {
        showNotification(msg, "error");
    },
    info: (msg) => {
        showNotification(msg, "info");
    },
    warning: (msg) => {
        showNotification(msg, "warning");
    },
    };
    const showNotification = (message, type) => {
    const notification = document.createElement("div");
    notification.className =
        "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full";

    const styles = {
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
        warning: "bg-yellow-500 text-black",
    };

    notification.className += ` ${styles[type]}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = "translateX(0)";
    }, 100);

    setTimeout(() => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
        }, 300);
    }, 3000);
    };
