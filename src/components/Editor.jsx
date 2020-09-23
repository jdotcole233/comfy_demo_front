import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const Editor = ({ onChange, value }) => {
    return (
        <div>
            <CKEditor
                // style={{ height: 500, borderWidth: 3, borderColor: "red" }}
                height={500}
                editor={ClassicEditor}
                data={value || ""}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    // console.log({ event, editor, data });
                    onChange(data)
                }}
            />
        </div>

    )
}

export default Editor
