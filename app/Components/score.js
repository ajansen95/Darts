"use client"

import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setLastThrow} from "@/app/GlobalRedux/Features/score/scoreSlice";
import {decreasePlayerPoints, increaseThrows} from "@/app/GlobalRedux/Features/player/playerSlice";

export default function Score() {

    const lastThrow = useSelector(state => state.score.lastThrow)
    const throwsCurrentPlayer = useSelector(state => state.player.throwsCurrentPlayer)
    const socket = useSelector(state => state.network.socketConnection)
    const dispatch = useDispatch();


    useEffect(() => {
        console.log("requesting score...")
        socket?.emit('score_request');
    }, [socket]);

    useEffect(() => {
        socket?.on('score', (newScore) => {
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
            socket?.off('score');
        };
    }, [dispatch, socket, throwsCurrentPlayer]);

    
    return (
        <p className="text-4xl font-bold text-white">{lastThrow.multiplier + " x " + lastThrow.number}</p>
    );
}

