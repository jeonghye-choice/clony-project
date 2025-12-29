import React from 'react';

import ReactDOM from 'react-dom/client';

const SimpleApp = () => {
    return (
        <div style={{ color: 'red', fontSize: '50px' }}>
            DEBUG MODE: V3 WORKS
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <SimpleApp />
    </React.StrictMode>
);
