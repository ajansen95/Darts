"use client"

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';


const socket = io('http://localhost:5000');

function Socket() {
    const [isConnected, setIsConnected] = useState(false);
    const [lastPong, setLastPong] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('pong', () => {
            console.log("pong")
            setLastPong(new Date().toISOString());
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    const sendPing = () => {
        console.log("sending ping...")
        socket.emit('ping');
    }

    return (
        <div>
            <p>Connected: { '' + isConnected }</p>
            <p>Last pong: { lastPong || '-' }</p>
            <button onClick={ sendPing }>Send ping</button>
        </div>
    );
}

export default Socket;
