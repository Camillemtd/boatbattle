// useKeyboard.js
import { useState, useEffect } from 'react'

export function useKeyboard() {
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'z' || e.key === 'w') {
        setKeys(keys => ({ ...keys, forward: true }))
      }
      if (e.key === 'ArrowDown' || e.key === 's') {
        setKeys(keys => ({ ...keys, backward: true }))
      }
      if (e.key === 'ArrowLeft' || e.key === 'q' || e.key === 'a') {
        setKeys(keys => ({ ...keys, left: true }))
      }
      if (e.key === 'ArrowRight' || e.key === 'd') {
        setKeys(keys => ({ ...keys, right: true }))
      }
    }

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'z' || e.key === 'w') {
        setKeys(keys => ({ ...keys, forward: false }))
      }
      if (e.key === 'ArrowDown' || e.key === 's') {
        setKeys(keys => ({ ...keys, backward: false }))
      }
      if (e.key === 'ArrowLeft' || e.key === 'q' || e.key === 'a') {
        setKeys(keys => ({ ...keys, left: false }))
      }
      if (e.key === 'ArrowRight' || e.key === 'd') {
        setKeys(keys => ({ ...keys, right: false }))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return keys
}