import React from 'react';

export default function LoadingSpinner() {
    return (
        <div style={styles.overlay}>
            <div style={styles.spinner}></div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.7)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    spinner: {
        border: '4px solid #ccc',
        borderTop: '4px solid #000',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite'
    }
};
