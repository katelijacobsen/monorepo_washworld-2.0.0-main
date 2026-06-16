"use client";

import { CarDialog } from "../types/types";
import CarForm from "./CarForm";

export default function FormDialog({id, onSuccess}: CarDialog){
    function close() {
        (document.getElementById(id) as HTMLDialogElement | null)?.close();
    }

    return (
        <dialog id={id} className="m-auto border-2 border-grey-100 rounded-4">
            <CarForm  onSuccess={() => {close(); onSuccess?.()}} onCancel={close}/>
        </dialog>
    )
}