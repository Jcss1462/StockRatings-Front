import axios from "axios";
import type { TokenResponse } from "../models/tokenResponseModel";
import { jwtDecode } from "jwt-decode";
import type { TokenDecode } from "../models/tokenDeocdeModel";

const API_URL =  import.meta.env.VITE_TOKEN_API_URL;
const USER = import.meta.env.VITE_TOKEN_API_USER;
const PASSWORD = import.meta.env.VITE_TOKEN_API_PASSWORD;

function getStoredToken(): string | null {
    return localStorage.getItem("auth_token");
}

//Verifica si el token es válido (estructura correcta y no expirado).
function isTokenValid(token: string): boolean {
    try {
        const decoded: TokenDecode = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        return decoded.exp > currentTime; // Retorna `true` si el token es válido
    } catch (error) {
        console.error("Token inválido o malformado:", error);
        return false;
    }
}


export async function fetchToken(): Promise<string> {
    const storedToken = getStoredToken();

    // Si el token existe y es válido, lo usamos
    if (storedToken && isTokenValid(storedToken)) {
        console.log("Usando token almacenado.");
        return storedToken;
    }

    console.log("Token no encontrado o inválido, solicitando nuevo token...");

    // Hacemos la solicitud para obtener un nuevo token
    const response = await axios.post<TokenResponse>(API_URL+"/production/swechallenge/login?", {
        username: USER,
        password: PASSWORD,
    });

    const tokenRecived = response.data.auth_token;

    if (tokenRecived && isTokenValid(tokenRecived)) {
        localStorage.setItem("auth_token", tokenRecived);
        console.log("Nuevo token almacenado.");
        return tokenRecived;
    }

    throw new Error("No se pudo obtener el token.");
}
