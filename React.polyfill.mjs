const createElement = (tag, props, ...children) => {
    return {
        type: tag,
        props: {
            ...props,
            children: children.length > 0 ? children : undefined,
        },
    };
};

export default { createElement };