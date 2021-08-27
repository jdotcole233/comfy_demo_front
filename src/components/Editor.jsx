import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const Editor = ({ onChange, value, name = "" }) => {
    return (
        <div>
            <CKEditor
                height={500}
                editor={ClassicEditor}
                data={value?.length > 0 ? value : ""}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data)
                }}
            />
        </div>

    )
}

export default Editor
