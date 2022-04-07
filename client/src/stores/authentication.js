import create from "zustand";
import { axios } from "../config/axios";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "../config/firebase";

export const useAuthStore = create((set) => ({
  currentUser: null,
  loading: true,
  register: (email, password, subscribed) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },

  login: (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },

  logout: () => {
    return auth.signOut();
  },

  resetPassword: (email) => {
    return sendPasswordResetEmail(auth, email);
  },

  updateEmail: (email) => {
    return updateEmail(auth.currentUser, email).then(async (response) => {
      await axios.put("/accounts/", {
        email: response.user.email,
      });
    });
  },

  updatePassword: (password) => {
    return updatePassword(auth.currentUser, password);
  },

  setLoading: (value = true) => set({ loading: value }),
}));

auth.onAuthStateChanged(async (user) => {
  if (user) {
    useAuthStore.setState({ currentUser: user });
  } else {
    useAuthStore.setState({ currentUser: null });
  }
  useAuthStore.setState({ loading: false });
});

export default useAuthStore;
