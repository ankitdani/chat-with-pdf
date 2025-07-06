/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useUser } from "@clerk/nextjs";
import { db, storage } from "@/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";
import { Percent } from "lucide-react";

export enum StatusText {
  UPLOADING = "Uploading file...",
  UPLOADED = "File uploaded successfully.",
  SAVING = "Saving file to database...",
  GENERATING = "Generating AI Embeddings...",
}

export type Status = StatusText[keyof StatusText];

const useUpload = () => {
  const [progress, setProgress] = useState<number | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const { user } = useUser();
  const router = useRouter;

  const handleUpload = async (file: File) => {
    if (!File || !user) return;
    // TODO - free plan limitations
    const fileIdToUploadTo = uuidv4();

    const storageRef = ref(
      storage,
      `users/${user.id}/files/${fileIdToUploadTo}`
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setStatus(StatusText.UPLOADING);
        setProgress(percent);
      },
      (error) => {
        console.error("Error uploading file", error);
      },
      async () => {
        setStatus(StatusText.UPLOADED);
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setStatus(StatusText.SAVING);
        await setDoc(doc(db, "users", user.id, "files", fileIdToUploadTo), {
          name: file.name,
          size: file.size,
          type: file.type,
          downloadUrl: downloadUrl,
          ref: uploadTask.snapshot.ref.fullPath,
          createdAt: new Date(),
        });
        setStatus(StatusText.GENERATING);
        //TODO - generate AI embedding
        setFileId(fileIdToUploadTo);
      }
    );
  };
  return { progress, status, fileId, handleUpload };
};

export default useUpload;
