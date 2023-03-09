'use client'

import SettingsModal from "@/app/Components/settingsModal";
import {useDispatch} from "react-redux";
import {toggleSettingsOpen} from "@/app/GlobalRedux/Features/settings/settingsSlice";

export default function ModalPage() {
    const dispatch = useDispatch();

    return (
        <div>
            <SettingsModal></SettingsModal>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {dispatch(toggleSettingsOpen())}}>Button</button>
        </div>
    )
}
