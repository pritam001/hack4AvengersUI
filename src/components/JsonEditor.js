import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";

const JsonEditor = props => {
    const onTextChange = (editorObj) => {
        if (!editorObj.error) {
            props.setEditorData(editorObj);
        } else {
            console.log('JSONEditor error');
        }
    };

    return (
        <JSONInput
            placeholder={props.editorData} // data to display
            theme="darktheme"
            locale={locale}
            colors={{
                string: "#DAA520" // overrides theme colors with whatever color value you want
            }}
            height="550px"
            onChange={onTextChange}
        />
    );
}

export default JsonEditor;
