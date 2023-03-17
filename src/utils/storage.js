import { USER_DATA_STORAGE, TOKEN_STORAGE } from '../config';

export function setUserData(value) {
  localStorage.setItem(USER_DATA_STORAGE, JSON.stringify(value));
}

export function getUserData() {
  return JSON.parse(localStorage.getItem(USER_DATA_STORAGE));
}

export function setToken(value) {
  localStorage.setItem(TOKEN_STORAGE, value);
}

export function getToken() {
  return localStorage.getItem(TOKEN_STORAGE);
}

export function clearLocalStorage() {
  localStorage.removeItem(USER_DATA_STORAGE);
  localStorage.removeItem(TOKEN_STORAGE);
}