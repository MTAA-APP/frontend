import { storage } from 'config/firebase'

type UseFirebase = {
  upload: (uri: string, name: string, func: (url: string) => void) => void
}

export default (folder: string): UseFirebase => {
  const upload = async (
    uri: string,
    name: string,
    func: (url: string) => void
  ) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    const uploadTask = storage.ref(`/${folder}/${name}`).put(blob)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log('snapshot', snapshot)
      },
      (err) => {
        console.log('error', err)
      },
      () => {
        storage
          .ref(folder)
          .child(name)
          .getDownloadURL()
          .then((url) => func(url))
      }
    )
  }

  return { upload }
}
