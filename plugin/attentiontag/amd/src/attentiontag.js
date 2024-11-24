import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18+
import { AttentionTag } from '@attention_tag/attentiontag'; // Use named import

// Function to render the AttentionTag component
const renderAttentionTag = (containerId, props = {}) => {
    const container = document.getElementById(containerId);
    if (container) {
        // Use ReactDOM.createRoot for rendering
        const root = ReactDOM.createRoot(container);
        root.render(<AttentionTag {...props} />);
    } else {
        console.error(`Container with id '${containerId}' not found.`);
    }
};

export default renderAttentionTag;