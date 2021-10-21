import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";
import React, {useEffect} from "react";

const JsonEditor = props => {
    const [placeholder, setPlaceholder] = React.useState(props.editorData?.jsObject);
    const onTextChange = (editorObj) => {
        if (!editorObj.error) {
            props.setEditorData(editorObj);
        } else {
            console.log('JSONEditor error');
        }
    };
    
    useEffect(() => {
        setPlaceholder(props.editorData?.jsObject)
    }, [props.editorData, props.editorData?.jsObject, props.editorData?.jsObject?.clientId]);

    return (
        <JSONInput
            placeholder={placeholder} // data to display
            theme="darktheme"
            locale={locale}
            colors={{
                string: "#DAA520" // overrides theme colors with whatever color value you want
            }}
            height="60vh"
            width="100%"
            onChange={onTextChange}
        />
    );
}

export default JsonEditor;
