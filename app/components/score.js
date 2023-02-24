"use client"

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Score_old() {
    const [score, setScore] = useState({
        number: null,
        multiplier: null
    });

    useEffect(() => {
        socket.on('score', (newScore) => {
            console.log(newScore)
            setScore(newScore)
            console.log(score)
        });

        return () => {
            socket.off('score');
        };
    }, [score]);

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
            {/*<button onClick={ requestScore }>Request scores</button>*/}
            {/*<button onClick={ stopScore }>Stop scores</button>*/}
            <p className="text-4xl">{score.multiplier + " x " + score.number}</p>
        </div>
    );
}

export default Score_old;
