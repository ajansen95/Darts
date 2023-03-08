"use client"

import io from 'socket.io-client';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setLastThrow} from "@/app/GlobalRedux/Features/score/scoreSlice";
import {decreasePlayerPoints, increaseThrows} from "@/app/GlobalRedux/Features/player/playerSlice";

const socket = io('http://localhost:5000');

export default function Score() {

    const lastThrow = useSelector(state => state.score.lastThrow)
    const throwsCurrentPlayer = useSelector(state => state.player.throwsCurrentPlayer)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("requesting score...")
        requestScore()
    }, []);

    useEffect(() => {
        socket.on('score', (newScore) => {
            console.log("newScore: " + JSON.stringify(newScore))
            console.log("throwsCurrentPlayer is: " + throwsCurrentPlayer)
            if (throwsCurrentPlayer < 3) {
                dispatch(setLastThrow({
                    number: newScore.number,
                    multiplier: newScore.multiplier,
                }));
                dispatch(decreasePlayerPoints(newScore.number * newScore.multiplier))
                dispatch(increaseThrows())
            }
        });

        return () => {
            socket.off('score');
        };
    }, [dispatch, throwsCurrentPlayer]);


    const requestScore = () => {
        socket.emit('score_request');
    }


    return (
        <p className="text-4xl font-bold text-white">{lastThrow.multiplier + " x " + lastThrow.number}</p>
    );
}

