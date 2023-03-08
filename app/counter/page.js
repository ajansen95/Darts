'use client'

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "@/app/GlobalRedux/Features/counter/counterSlice";

export default function Counter() {
    const count = useSelector(state => state.counter)
    const dispatch = useDispatch();

    return (
        <main>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => dispatch(increment())}>Increment</button>
            <span>{count.value}</span>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => dispatch(decrement())}>Decrement</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => dispatch(incrementByAmount(2))}>Increment by 2</button>
        </main>
    )
}