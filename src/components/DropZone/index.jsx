/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useMemo, useContext, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import PDF from '../../assets/pdf.png'
import { DrawerContext } from '../Drawer';

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


function DropZone({ onChange, clear }) {
    let filesD = []
    const { closed } = useContext(DrawerContext)



    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles)
        onChange(acceptedFiles);
        acceptedFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size)
            })
        );
    }, [onChange])
    const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop })
    useEffect(() => {
        if (closed) {
            acceptedFiles.splice(0, acceptedFiles.length)
        }
    }, [closed, acceptedFiles])

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

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    };

    filesD = acceptedFiles.map(file => (
        <li key={file.path}>
            <img src={PDF} style={{ height: 30, width: 30 }} className="m-2" />
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps({ accept: ".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" })} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                {filesD.length && !closed ? <h4>File(s)</h4> : null}
                <ul style={{ listStyle: 'none' }}>{filesD}</ul>
            </aside>
        </section>
    )
}

export default DropZone;