"use client"

import { api } from "~/trpc/react";
import React, { useState } from "react";
import QRCode from "qrcode"
import Selector from "~/app/_components/selector";

export default function Home() {

  const [qr, setQr] = useState("")
  const { data: cityList, isLoading } = api.location.getCities.useQuery()
  const reservationMutation = api.locker.makeReservation.useMutation({
    onSuccess(data) {
      QRCode.toDataURL(data).then(setQr)
    }
  })

  return (
    <>
      {qr ? (
        <div className="bg-white p-4">
          <img src={qr} />
        </div>) :
        (<button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          onClick={() => reservationMutation.mutate()}
        >
          Recibir paquete
        </button>)
      }
      {isLoading ?
        <div> Cargando </div> :
        <Selector placeholder="Seleccione su ciudad" options={cityList!} />
      }
    </>
  );
}
