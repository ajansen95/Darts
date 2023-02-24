"use client"

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Score_old() {
    const [isConnected, setIsConnected] = useState(false);
    const [lastPong, setLastPong] = useState(null);
    const [score, setScore] = useState({
        number: null,
        multiplier: null
    });

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
            console.log("connect")
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
            console.log("disconnect")
        });

        socket.on('pong', () => {
            console.log("pong")
            setLastPong(new Date().toISOString());
        });

        socket.on('score', (newScore) => {
            console.log(newScore)
            setScore(newScore)
            console.log(score)
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
            socket.off('score');
        };
    }, [score]);


    const sendPing = () => {
        console.log("sending ping...")
        socket.emit('ping');
    }

    const requestScore = () => {
        console.log("requesting score...")
        socket.emit('score_request');
    }

    const stopScore = () => {
        console.log("stopping score...")
        socket.emit('score_stop');
    }

    return (
        <div>
            <p>Connected: { '' + isConnected }</p>
            <p>Last pong: { lastPong || '-' }</p>
            <button onClick={ sendPing }>Send ping</button>
            <button onClick={ requestScore }>Request scores</button>
            <button onClick={ stopScore }>Stop scores</button>
            <h1>{score.multiplier + " x " + score.number}</h1>
        </div>
    );
}

export default Score_old;
