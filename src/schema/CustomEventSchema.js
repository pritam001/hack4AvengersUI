import { SchemaTypes } from 'object-editor-react';

const CustomEventSchema = {
    foo: SchemaTypes.string({ required: true }),

    bar: {
        baz: SchemaTypes.arrayOf({
            nested: SchemaTypes.string(),
        }),
    },
}

export default CustomEventSchema;