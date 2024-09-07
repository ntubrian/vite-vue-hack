import { Html5Qrcode } from 'html5-qrcode'

export const useHtml5QrCode = (domId) => {
  const html5QrCode = new Html5Qrcode(domId)

  const start = (qrCodeSuccessCallback) => {
    const brConfig = { fps: 10, qrbox: { width: 300, height: 150 } }
    
    html5QrCode.start(
      { facingMode: 'environment' },
      brConfig,
      qrCodeSuccessCallback,
      qrCodeErrorCallback
    )
  }

  const handleStop = () => {
    try {
      html5QrCode
        .stop()
        .then(() => {
          html5QrCode.clear()
        })
        .catch((error) => {
          console.log('danger', error.message)
        })
    } catch (error) {
      console.log('danger', error)
    }
  }

  const qrCodeErrorCallback = (error) => {
    console.log('qrCodeErrorCallback error', error)
  }

  return {
    start,
    handleStop
  }
} 