import React, { useEffect, useRef, useState } from 'react'
import bwipjs from 'bwip-js'
import { TOTP } from 'totp-generator'
import { bytes_to_base_32, hex_to_bytes } from 'src/@core/utils/jsutils'

export default function BarcodeComponent({ barcodeData }) {
  const canvasRef = useRef(null)
  const [error, setError] = useState(null)
  const [barcode_refresh_interval, setBarcodeRefreshInterval] = useState(null)

  const doGenerateBarcode = text => {
    bwipjs.toCanvas(canvasRef.current, {
      bcid: 'pdf417',
      text,
      includetext: false,
      textxalign: 'center'
    })
  }

  useEffect(() => {
    if (canvasRef.current && barcodeData) {
      clearInterval(barcode_refresh_interval)
      try {
        const { t, ck, ek } = JSON.parse(atob(barcodeData))
        const period = 15

        const refresh_barcode = () => {
          const _ek = TOTP.generate(bytes_to_base_32(hex_to_bytes(ek)), { period })
          const _ck = TOTP.generate(bytes_to_base_32(hex_to_bytes(ck)), { period })
          const text = `${t}::${_ek.otp}::${_ck.otp}::${Math.floor(new Date().getTime() / 1000)}`
          doGenerateBarcode(text)
        }
        const interval = setInterval(refresh_barcode, 15000)
        refresh_barcode()
        setBarcodeRefreshInterval(interval)
      } catch (error) {
        console.error(error)
        setError(error)
      }
    }
    // eslint-disable-next-line
  }, [barcodeData])

  return (
    <>
      {error && <div>Invalid Barcode Provided</div>}
      {!error && <canvas className='h-[60px] w-[250px]' ref={canvasRef} />}
    </>
  )
}
