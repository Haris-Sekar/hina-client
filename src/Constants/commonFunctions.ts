/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";

export function currencyFormatter(number: number): string {
    return number.toLocaleString('en-IN');
}


const isDarkMode = localStorage.getItem('toolpad-mode') === "dark"

export const toastPromise = (promise: Promise<any>, responseActions: { loading: any; success: any; error: any }) => {
    return toast.promise(promise, responseActions, {
        duration: 5000,
        style: {
            borderRadius: '10px',
            background: isDarkMode ? '#333' : '#fff',
            color: isDarkMode ? '#fff' : '#333',
        }
    })
}

export const customToast = (type: string = "success", message: string) => {
    if (type === "error") {
        return toast.error(message, {
            duration: 5000,
            style: {
                borderRadius: '10px',
                background: isDarkMode ? '#333' : '#fff',
                color: isDarkMode ? '#fff' : '#333',
            }
        });
    } else if (type === "success") {
        return toast.success(message, {
            duration: 5000,
            style: {
                borderRadius: '10px',
                background: isDarkMode ? '#333' : '#fff',
                color: isDarkMode ? '#fff' : '#333',
            }
        });
    } else if (type === "warning") {
        return toast.loading(message, {
            duration: 5000,
            style: {
                borderRadius: '10px',
                background: isDarkMode ? '#333' : '#fff',
                color: isDarkMode ? '#fff' : '#333',
            }
        });
    }

}

export const formatINR = (str: string): string => {
    return !isNaN(parseFloat(str))
        ? new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(parseFloat(str))
        : 'Invalid amount';
}