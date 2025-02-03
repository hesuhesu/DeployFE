import axios from 'axios';
import { HOST, PORT } from '../utils/Variable.tsx';

const AxiosInstance = axios.create({
  baseURL: `${HOST}:${PORT}`, // 백엔드 서버 주소
});

export default AxiosInstance;