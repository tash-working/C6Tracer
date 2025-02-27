import React, { useState, useEffect } from 'react';

const UnorganizedOtherHalfNeonKeyboard = () => {
    const layout = [
        ['`', '2', '4', '6', '8', '0'],
        ['p', '[', ']', '\\', ';', "'"],
        ['m', ',', '.', '/', '=', '-'],
        ['j', 'k', 'l', 'u', 'i', 'o'],
        ['Shift', 'Enter', 'Space', 'Backspace', 'Tab', 'CapsLock'],
    ];

    const [activeKeys, setActiveKeys] = useState({});

    const handleKeyDown = (event) => {
        let key = event.key;
        if (key === ' ') {
            key = 'Space';
        } else if (key === 'Backspace' || key === 'Tab' || key === 'CapsLock' || key === 'Shift' || key === 'Enter') {
            // Keep the key as is
        } else {
            key = key.toLowerCase();
        }

        setActiveKeys((prevKeys) => ({
            ...prevKeys,
            [key]: true,
        }));
    };

    const handleKeyUp = (event) => {
        let key = event.key;
        if (key === ' ') {
            key = 'Space';
        } else if (key === 'Backspace' || key === 'Tab' || key === 'CapsLock' || key === 'Shift' || key === 'Enter') {
            // Keep the key as is
        } else {
            key = key.toLowerCase();
        }

        setActiveKeys((prevKeys) => {
            const newKeys = { ...prevKeys };
            delete newKeys[key];
            return newKeys;
        });
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const keyboardStyle = {
        backgroundColor: '#222',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        display: 'inline-block',
    };

    const rowStyle = {
        display: 'flex',
        marginBottom: '10px',
    };

    const keyStyle = {
        backgroundColor: '#333',
        color: 'cyan',
        border: 'none',
        padding: '15px 20px',
        margin: '5px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
        transition: 'boxShadow 0.2s ease-in-out, background-color 0.2s ease-in-out',
        minWidth: '20px',
        textAlign: 'center',
    };

    const specialKeyStyle = {
        padding: '15px 30px',
    };

    const spaceKeyStyle = {
        padding: '15px 150px',
    };

    const activeKeyStyle = {
        backgroundColor: 'cyan',
        color: '#111',
        boxShadow: '0 0 20px cyan',
    };

    const bodyStyle = {
        backgroundColor: '#111',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        margin: '0',
    };

    return (
        <div style={bodyStyle}>
            <div style={keyboardStyle}>
                {layout.map((row, rowIndex) => (
                    <div style={rowStyle} key={rowIndex}>
                        {row.map((key) => {
                            let currentKeyStyle = { ...keyStyle };
                            if (activeKeys[key.toLowerCase()] || activeKeys[key]) {
                                currentKeyStyle = { ...currentKeyStyle, ...activeKeyStyle };
                            }
                            if (key === 'Backspace' || key === 'Tab' || key === 'CapsLock' || key === 'Shift' || key === 'Enter') {
                                currentKeyStyle = { ...currentKeyStyle, ...specialKeyStyle };
                            }
                            if (key === 'Space') {
                                currentKeyStyle = { ...currentKeyStyle, ...spaceKeyStyle };
                            }
                            return (
                                <div style={currentKeyStyle} key={key} data-key={key}>
                                    {key}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UnorganizedOtherHalfNeonKeyboard;