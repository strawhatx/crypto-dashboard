import create from "zustand";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  updateProfile,
  storage,
  getDownloadURL,
  uploadBytes,
  ref,
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

  updateDisplayName: (name) => {
    return updateProfile(auth.currentUser, { displayName: name });
  },

  updateImage: async (img) => {
    const imgRef = ref(storage, `profiles/${auth.currentUser.uid}.png`);

    await uploadBytes(imgRef, img);

    const photoURL = await getDownloadURL(imgRef);

    return updateProfile(auth.currentUser, { photoURL });
  },

  updateEmail: (email) => {
    return updateEmail(auth.currentUser, email);
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
