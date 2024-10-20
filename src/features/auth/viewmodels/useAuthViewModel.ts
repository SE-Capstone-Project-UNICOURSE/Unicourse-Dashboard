import { auth, googleProvider } from '@app/utils/firebase';
import { signInWithPopup } from 'firebase/auth';

const useAuthViewModel = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return { signInWithGoogle };
};

export default useAuthViewModel;
