"use client"

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Score() {
    const [score, setScore] = useState({
        number: null,
        multiplier: null
    });

    useEffect(() => {
        socket.on('score', (newScore) => {
            //console.log(newScore)
            setScore(newScore)
            //console.log(score)
        });


        return () => {
            socket.off('score');
        };
    }, [score]);


    useEffect(() => {
        requestScore()
    }, []);


    const requestScore = () => {
        console.log("requesting score...")
        socket.emit('score_request');
    }


    const stopScore = () => {
        console.log("stopping score...")
        socket.emit('score_stop');
    }


    return (
        <p className="text-4xl font-bold text-white">{score.multiplier + " x " + score.number}</p>
    );
}

export default Score;
