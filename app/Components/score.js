"use client"

import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect} from "react";
import {setLastThrow} from "@/app/GlobalRedux/Features/score/scoreSlice";
import {decreasePlayerPoints, increaseThrows} from "@/app/GlobalRedux/Features/player/playerSlice";
import {SocketContext} from "@/app/GlobalRedux/provider";

export default function Score() {

    const lastThrow = useSelector(state => state.score.lastThrow)
    const throwsCurrentPlayer = useSelector(state => state.player.throwsCurrentPlayer)
    const dispatch = useDispatch();
    const [socketConn] = useContext(SocketContext)


    useEffect(() => {
        console.log("requesting score...")
        socketConn?.emit('score_request');
    }, [socketConn]);

    useEffect(() => {
        socketConn?.on('score', (newScore) => {
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
            socketConn?.off('score');
        };
    }, [dispatch, socketConn, throwsCurrentPlayer]);

    
    return (
        <p className="text-4xl font-bold text-white">{lastThrow.multiplier + " x " + lastThrow.number}</p>
    );
}

