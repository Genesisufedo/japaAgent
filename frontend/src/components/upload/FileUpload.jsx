import { useDropzone } from 'react-dropzone';
import { FileText, File } from "lucide-react";

export default function FileUpload({ onFilesSelected }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length >= 2) {
        onFilesSelected(acceptedFiles[0], acceptedFiles[1]);
      } else {
        alert("Please upload at least 2 files (CV and Transcript)");
      }
    }
  });

  return (
    <div {...getRootProps()} className={`
      border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all
      ${isDragActive ? 'border-primary bg-emerald-50' : 'border-emerald-200 bg-white'}
      hover:border-primary hover:bg-emerald-50
    `}>
      <input {...getInputProps()} />
      <div className="flex justify-center gap-3 mb-4">
        <FileText className="text-primary" size={40} />
        <File className="text-emerald-400" size={40} />
      </div>
      <p className="text-slate-700 font-medium">Drag CV & Transcript here</p>
      <p className="text-slate-400 text-xs mt-1">or click to browse</p>
    </div>
  );
}