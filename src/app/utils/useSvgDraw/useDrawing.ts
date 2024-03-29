import { useRef, useEffect, useCallback, MutableRefObject } from "react"
import { SvgDrawing, DrawingOption } from "../svg-draw";

interface UseSvgDrawing {
  instance: SvgDrawing | null
  clear: () => void
  undo: () => void
  changePenColor: (penColor: DrawingOption["penColor"]) => void
  changePenWidth: (penwidth: DrawingOption["penWidth"]) => void
  changeFill: (penColor: DrawingOption["fill"]) => void
  changeClose: (penwidth: DrawingOption["close"]) => void
  changeDelay: (penColor: DrawingOption["delay"]) => void
  changeCurve: (penwidth: DrawingOption["curve"]) => void
  getSvgXML: () => string | null
  download: (ext: "svg" | "png" | "jpg") => void
}
export const useSvgDrawing = (
  option?: Partial<DrawingOption>
): [MutableRefObject<HTMLDivElement | null>, UseSvgDrawing] => {
  const renderRef = useRef<HTMLDivElement | null>(null)
  const drawingRef = useRef<SvgDrawing | null>(null)
  const getSvgXML = useCallback(() => {
    if (!drawingRef.current) return null
    return drawingRef.current.toElement().outerHTML
  }, [])
  const download = useCallback((ext: "svg" | "png" | "jpg" = "svg") => {
    if (!drawingRef.current) return
    drawingRef.current.download(ext)
  }, [])
  const changePenColor = useCallback((param: DrawingOption["penColor"]) => {
    if (!drawingRef.current || !param) return
    drawingRef.current.penColor = param
  }, [])
  const changeFill = useCallback((param: DrawingOption["fill"]) => {
    if (!drawingRef.current || !param) return
    drawingRef.current.fill = param
  }, [])
  const changeDelay = useCallback((param: DrawingOption["delay"]) => {
    if (!drawingRef.current || !param) return
    drawingRef.current.changeDelay(param)
  }, [])
  const changePenWidth = useCallback((param: DrawingOption["penWidth"]) => {
    if (!drawingRef.current) return
    drawingRef.current.penWidth = Number(param)
  }, [])
  const changeClose = useCallback((param: DrawingOption["close"]) => {
    if (!drawingRef.current) return
    drawingRef.current.close = param ?? false
  }, [])
  const changeCurve = useCallback((param: DrawingOption["curve"]) => {
    if (!drawingRef.current) return
    drawingRef.current.curve = param ?? true
  }, [])
  const clear = useCallback(() => {
    if (!drawingRef.current) return
    drawingRef.current.clear()
  }, [])
  const undo = useCallback(() => {
    if (!drawingRef.current) return
    drawingRef.current.undo()
  }, [])

  useEffect(() => {
    if (drawingRef.current) return
    if (!renderRef.current) return
    drawingRef.current = new SvgDrawing(renderRef.current, {
      ...option,
    })
  })

  return [
    renderRef,
    {
      instance: drawingRef.current,
      changePenWidth,
      changePenColor,
      changeFill,
      changeDelay,
      changeClose,
      changeCurve,
      clear,
      undo,
      getSvgXML,
      download,
    },
  ]
}
