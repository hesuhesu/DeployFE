const AUTH: string | undefined = process.env.REACT_APP_ADMIN_AUTH;

export type AuthCheckFunction = () => number;

export const authCheck = (): number => {
    if (localStorage.length === 0) { // LocalStorage가 깨끗하면 종료
        return 0;
    }

    const admin:string = localStorage.getItem('auth') as string;
    if (admin && (admin === AUTH)) {
        return 1;
    }

    const token:string = localStorage.getItem('accessToken') as string;
    if (token) {
        return 2;
    }
    
    return 0;
}