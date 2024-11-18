import React from 'react';
import ReactDOM from 'react-dom';
import AttentionTag from '@attention_tag/attentiontag';

const renderAttentionTag = (containerId, props = {}) => {
    const container = document.getElementById(containerId);
    if (container) {
        ReactDOM.render("<AttentionTag {...props}></AttentionTag>", container);
    }
};

export default renderAttentionTag;