import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAykVuPVKmbxk7dUxV065nZhJsRCclEoNU',
  authDomain: 'get-tech-eco.firebaseapp.com',
  projectId: 'get-tech-eco',
  storageBucket: 'get-tech-eco.appspot.com',
  messagingSenderId: '658985312390',
  appId: '1:658985312390:web:0b0a0242f896000a917107',
  measurementId: 'G-Q1NSY0M5WG',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadImage = async (file) =>
  new Promise((resolve, reject) => {
    if (!file) {
      resolve(false);
      return;
    }

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
      },
      (error) => {
        console.error('Error uploading image:', error.message);
        reject(new Error('Promise rejected.'));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve(downloadURL);
          })
          .catch((error) => {
            console.error('Error getting download URL:', error.message);
            reject(new Error('Promise rejected.'));
          });
      }
    );
  });

export default uploadImage;
