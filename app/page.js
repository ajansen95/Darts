"use client"

import Score from "@/app/Components/score";
import {useDispatch, useSelector} from "react-redux";
import {nextPlayer, toggleGameModal} from "@/app/GlobalRedux/Features/player/playerSlice";
import SettingsModal from "@/app/Components/settingsModal";
import io from "socket.io-client";
import {toggleSettingsOpen} from "@/app/GlobalRedux/Features/settings/settingsSlice";
import {useContext, useEffect} from "react";
import {SocketContext} from "@/app/GlobalRedux/provider";
import GameModal from "@/app/Components/gameModal";
import PlayerWonModal from "@/app/Components/playerWonModal";

export default function Home() {

    const activePlayer = useSelector(state => state.player.activePlayer)
    const scores = useSelector(state => state.player.scores)
    const throwsCurrentPlayer = useSelector(state => state.player.throwsCurrentPlayer)
    const backendIp = useSelector(state => state.network.backendIp)
    const dispatch = useDispatch()
    const [socketConn, setSocketConn] = useContext(SocketContext)

    useEffect(() => {
        if (backendIp !== null){
            const backendServerURL = 'http://' + backendIp + ':5000'
            const socket_conn = io(backendServerURL)
            console.log(socket_conn)
            setSocketConn(socket_conn)
        }
    },[backendIp])



    return (
        <main className="flex flex-col h-screen">
            <nav className="h-10 bg-gray-900">
                <div className="w-full h-full flex justify-end items-center p-3">
                    {socketConn?.connected ? <div className="led-green"></div>
                                            : <div className="led-red"></div>}
                    {socketConn?.connected ? <p className="text-white font-bold pl-2">Connected to: {socketConn._opts.hostname}</p>
                                            : <p className="text-white font-bold pl-2">Not connected to server</p>}
                    <button className="pl-3" onClick={() => {dispatch(toggleSettingsOpen())}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth={2} stroke="currentColor" className="w-6 h-6 stroke-white hover:opacity-30">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
            </nav>

            <div className="bg-gray-700 flex items-center justify-center flex-1">
                <div id="leftSpacing" className="flex-1 h-full"></div>

                <div className="flex items-center justify-center" id="video">

                    {socketConn?.connected ?
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img className="ml-56" src={`http://${backendIp}:5000/manipulated_video`} alt="video" width="760"/> :
                        <div className="w-96">
                            <p className="text-4xl font-bold text-white">Not connected to Darts video server</p>
                            <p className="text-xl font-bold text-white">Press &quot;Open Settings&quot; or on the corresponding icon in the upper right corner</p>
                            <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 pl-2 pr-4 rounded" onClick={() => {dispatch(toggleSettingsOpen())}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth={2} stroke="currentColor" className="mr-2 w-6 h-6 stroke-white hover:opacity-30">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Open Settings
                            </button>
                        </div>
                    }

                </div>


                <div id="rightSpacing" className="flex-1 h-full"></div>


                <div id="rightMenu" className="flex flex-col items-end h-full bg-gray-900 ml-auto">

                    <div className="h-min ml-5 mt-5 mr-5">
                        <p className="text-4xl font-bold text-white">Last</p>
                        <div className="flex bg-red-500 h-20 w-44 border-4 border-red-500 rounded justify-center items-center">
                            <Score></Score>
                        </div>
                    </div>

                    <div className="h-min ml-5 mt-5 mr-5">
                        <p className="text-4xl font-bold text-white">Throws</p>
                        <div className="flex bg-red-500 h-20 w-44 border-4 border-red-500 rounded justify-center items-center">
                            <p className="text-4xl font-bold text-white">{throwsCurrentPlayer}</p>
                        </div>
                    </div>

                </div>
            </div>


            <div className="flex flex-row bg-gray-900 h-36 justify-center items-center">
                <div className="mr-auto ml-5">
                    <button className="h-20 w-44 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {dispatch(toggleGameModal())}}
                    >Game</button>
                </div>

                <div className={`m-5  ${activePlayer === 1 ? 'border-8 border-dashed border-green-500 rounded' : ''}`}>
                    <p className="text-4xl font-bold text-white">P1</p>
                    <div className="flex bg-red-500 h-20 w-44 border-4 border-red-500 rounded justify-center items-center">
                        <p className="text-4xl font-bold text-white">{scores.player1}</p>
                    </div>
                </div>
                <div className={`m-5 ${activePlayer === 2 ? 'border-8 border-dashed border-green-500 rounded' : ''}`}>
                    <p className="text-4xl font-bold text-white">P2</p>
                    <div className="flex bg-red-500 h-20 w-44 border-4 border-red-500 rounded justify-center items-center">
                        <p className="text-4xl font-bold text-white">{scores.player2}</p>
                    </div>
                </div>
                <div className={`m-5 ${activePlayer === 3 ? 'border-8 border-dashed border-green-500 rounded' : ''}`}>
                    <p className="text-4xl font-bold text-white">P3</p>
                    <div className="flex bg-red-500 h-20 w-44 border-4 border-red-500 rounded justify-center items-center">
                        <p className="text-4xl font-bold text-white">{scores.player3}</p>
                    </div>
                </div>
                <div className={`m-5 ${activePlayer === 4 ? 'border-8 border-dashed border-green-500 rounded' : ''}`}>
                    <p className="text-4xl font-bold text-white">P4</p>
                    <div className="flex bg-red-500 h-20 w-44 border-4 border-red-500 rounded justify-center items-center">
                        <p className="text-4xl font-bold text-white">{scores.player4}</p>
                    </div>
                </div>

                <div className="ml-auto mr-5">
                    <button className="h-20 w-44 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                dispatch(nextPlayer())
                                socketConn.emit("reset")
                            }}>
                        Player
                    </button>
                </div>
            </div>

            <SettingsModal></SettingsModal>
            <GameModal></GameModal>
            <PlayerWonModal></PlayerWonModal>

        </main>
  )
}
