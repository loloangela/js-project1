import axios from 'axios';
import { environment } from '../environment';

export const ersContext = axios.create({
  baseURL: environment.ersContext,
  withCredentials: true
});
