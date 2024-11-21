import { storage } from '@app/utils/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useCallback } from 'react';

const useUploadFileToFirebase = () => {
  const uploadFileToFirebase = useCallback(async (file: File, folder: string): Promise<string> => {
    try {
      const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Theo dõi tiến trình upload
      const uploadSnapshot = await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot1) => {
            const progress = (snapshot1.bytesTransferred / snapshot1.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => reject(error), // Bắt lỗi
          () => resolve(uploadTask.snapshot)
        );
      });

      // Lấy URL sau khi upload thành công
      const downloadURL = await getDownloadURL((uploadSnapshot as any).ref);
      console.log('File available at', downloadURL);

      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }, []);

  // Function xóa file
  const deleteFileFromFirebase = useCallback(async (fileUrl: string): Promise<void> => {
    try {
      // Tạo reference tới file cần xóa
      const fileRef = ref(storage, fileUrl);

      // Xóa file
      await deleteObject(fileRef);
      console.log(`File at ${fileUrl} deleted successfully`);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }, []);

  return { uploadFileToFirebase, deleteFileFromFirebase };
};

export default useUploadFileToFirebase;
