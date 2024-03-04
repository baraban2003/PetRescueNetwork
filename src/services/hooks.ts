import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../redux/store"
import { useEffect, useState } from "react"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function useImagePreview(imageFile: File | null) {
  const [previewSrc, setPreviewSrc] = useState("")
  useEffect(() => {
    if (!imageFile) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewSrc(reader.result as string)
    }
    reader.readAsDataURL(imageFile)
    return () => {
      reader.abort()
    }
  }, [imageFile])
  return previewSrc
}
