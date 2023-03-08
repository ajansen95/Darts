"use client"

import io from 'socket.io-client';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setLastThrow} from "@/app/GlobalRedux/Features/score/scoreSlice";

const socket = io('http://localhost:5000');

export default function Score() {

    const lastThrow = useSelector(state => state.score.lastThrow)
    const dispatch = useDispatch();


    useEffect(() => {
        socket.on('score', (newScore) => {
            console.log("newScore: " + JSON.stringify(newScore))
            dispatch(setLastThrow({
                number: newScore.number,
                multiplier: newScore.multiplier,
            }));
        });


        return () => {
            socket.off('score');
        };
    }, [dispatch]);


    useEffect(() => {
        requestScore()
    }, []);


    const requestScore = () => {
        console.log("requesting score...")
        socket.emit('score_request');
    }


    return (
        <p className="text-4xl font-bold text-white">{lastThrow.multiplier + " x " + lastThrow.number}</p>
    );
}

