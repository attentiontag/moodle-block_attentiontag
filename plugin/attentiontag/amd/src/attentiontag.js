import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18+
import { AttentionTag } from '@attention_tag/attentiontag'; // Use named import

// Function to render the AttentionTag component
const renderAttentionTag = (containerId, props = {}) => {
    // console.log("AttentionTag", AttentionTag)
    console.log("PROPS ", props);
    const at = new AttentionTag(null, { 'id': 12 }, 'arvind+testviewer1@attentiontag.com', {'id': 200}, 1, null, null);
    console.log("Attention Tag object ", at);
    const container = document.getElementById(containerId);
    // console.log("Attentiontag container ", container)
    if (container) {
        // Use ReactDOM.createRoot for rendering
        // const root = ReactDOM.createRoot(container);
        // root.render(<div>HELLO ROOT</div>);
        at.initVisualPrompt(container)
        // console.log("ROOT ", root);
    } else {
        console.error(`Container with id '${containerId}' not found.`);
    }
};

export default renderAttentionTag;