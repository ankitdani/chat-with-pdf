/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import useUpload, { StatusText } from "@/hooks/useUpload";
import { CircleArrowDown, RocketIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { JSX, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = () => {
  const { progress, status, fileId, handleUpload } = useUpload();
  const router = useRouter();

  useEffect(() => {
    if (fileId) {
      router.push(`/dashboard/files/${fileId}`);
    }
  }, [fileId, router]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      await handleUpload(file);
    } else {
      // TODO - notification
    }
  }, []);

  const statusIcons: {
    [key in StatusText]: JSX.Element;
  } = {
    [StatusText.UPLOADING]: (
      <RocketIcon className="h-20 w-20 text-indigo-600" />
    ),
    [StatusText.UPLOADED]: (
      <CircleArrowDown className="h-20 w-20 text-indigo-600" />
    ),
    [StatusText.SAVING]: <RocketIcon className="h-20 w-20 text-indigo-600" />,
    [StatusText.GENERATING]: (
      <RocketIcon className="h-20 w-20 text-purple-600" />
    ),
  };

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  const uploadInProgress = progress != null && progress >= 0 && progress <= 100;

  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
      {uploadInProgress && (
        <div className="mt-32 flex flex-col justify-center items-center gap-5">
          <div
            className={`radial-progress bg-indigo-300 text-white border-indigo-600 border-4 ${
              progress === 100 && "hidden"
            }`}
            role="progressbar"
            style={
              {
                "--value": `${progress}`,
                "--size": "12rem",
                "--thickness": "1.3rem",
              } as React.CSSProperties //TODO - check daisy ui doc
            }
          >
            {progress} %
          </div>
          {
            // @ts-ignore
            statusIcons[status!]
          }
          <p className="text-indigo-600 animate-pulse">{status}</p>
        </div>
      )}
      {!uploadInProgress && (
        <div
          {...getRootProps()}
          className={`p-10 border-2 border-dashed mt-10 w-[90%] 
          border-indigo-600 text-indigo-600 rounded-lg h-96 flex items-center text-center justify-center ${
            isFocused || isDragActive ? "bg-indigo-300" : "bg-indigo-100"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex items-center flex-col justify-center">
            {isDragActive ? (
              <>
                <RocketIcon className="h-20 w-20 animate-ping" />
                <p>Drop the files here ...</p>
              </>
            ) : (
              <>
                <CircleArrowDown className="h-20 w-20 animate-bounce" />
                <p>
                  Drag &apos;n&apos; drop some files here, or click to select
                  files
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
