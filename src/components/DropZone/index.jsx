/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import PDF from '../../assets/pdf.png'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'grey',
    borderStyle: 'dashed',
    backgroundColor: '#2E3548',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

function DropZone({ onChange, closed }) {
    const [files, setFiles] = useState([])
    useEffect(() => {
        if (!closed) {
            setFiles([])
        }
    }, [closed])
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles)
        setFiles(prev => [...prev, ...acceptedFiles])
        acceptedFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size)
            })
        );
        onChange(files);
    }, [onChange])
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop })


    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);


    const removeFile = (id) => {
        const newFiles = files.filter((_, key) => key !== id);
        setFiles(newFiles);
        onChange(newFiles)
    }



    return (
        <section className="">
            <div {...getRootProps({ style })}>
                <input {...getInputProps({ accept: ".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" })} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <li style={{ listStyle: "none" }}>
                <div >{
                    files.map((file, id) => (
                        <div key={id} className="d-flex justify-content-between">
                            <div>
                                <img src={PDF} style={{ height: 30, width: 30 }} className="m-2" />
                                {file.path} - {file.size} bytes
                            </div>
                            <div className="d-flex align-items-center">
                                <button onClick={() => removeFile(id)} type="button" className="ml-2 btn  btn-danger btn-sm ">Remove</button>
                            </div>
                        </div>
                    ))
                }</div>
            </li>
        </section>
    )
}

export default DropZone;