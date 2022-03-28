import create from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "../config/firebase";

export const useAuthStore = create((set) => ({
  currentUser: null,
  loading: true,
  register: (email, password) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        await axios.post("/accounts/", {
          uid: response.user.uid,
          email: response.user.email,
        });
      });
  },

  login: (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  },

  logout: () => {
    return auth.signOut();
  },

  resetPassword: (email) => {
    return auth.sendPasswordResetEmail(email);
  },

  updateEmail: (email) => {
    return currentUser.updateEmail(email).then(async (response) => {
      await axios.put("/accounts/", {
        email: response.user.email,
      });
    });
  },

  updatePassword: (password) => {
    return currentUser.updatePassword(password);
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
