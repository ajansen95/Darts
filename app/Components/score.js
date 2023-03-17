"use client"

import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect} from "react";
import {setLastThrow} from "@/app/GlobalRedux/Features/score/scoreSlice";
import {
    decreasePlayerPoints,
    increaseThrows, showPlayerWonModal,
} from "@/app/GlobalRedux/Features/player/playerSlice";
import {SocketContext} from "@/app/GlobalRedux/provider";

export default function Score() {

    const lastThrow = useSelector(state => state.score.lastThrow)
    const throwsCurrentPlayer = useSelector(state => state.player.throwsCurrentPlayer)
    const gameFinished = useSelector(state => state.player.gameFinished)
    const dispatch = useDispatch();
    const [socketConn] = useContext(SocketContext)


    useEffect(() => {
        console.log("requesting score...")
        socketConn?.emit('request_random');
    }, [socketConn]);

    useEffect(() => {
        if (!gameFinished) {
            socketConn?.on('score', (newScore) => {
                console.log("newScore: " + JSON.stringify(newScore))
                console.log("throwsCurrentPlayer is: " + throwsCurrentPlayer)

                const num = newScore.number
                const multi = newScore.multiplier

                if (throwsCurrentPlayer < 3) {
                    dispatch(setLastThrow({
                        number: num,
                        multiplier: multi,
                    }))
                    dispatch(decreasePlayerPoints(num * multi))
                    dispatch(increaseThrows())
                }
            })

        } else {
            dispatch(showPlayerWonModal({player: 1}))
        }

        return () => {
            socketConn?.off('score');
        };
    }, [dispatch, socketConn, throwsCurrentPlayer, gameFinished]);

    
    return (
        <p className="text-4xl font-bold text-white">{lastThrow.multiplier + " x " + lastThrow.number}</p>
    );
}

