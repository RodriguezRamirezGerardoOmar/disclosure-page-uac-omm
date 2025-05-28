'use client'
import { useEffect } from 'react'
import useAuthStore from '@/store/useStore'
import useExcerciseStore from '@/store/useExcerciseStore'
import useNoteStore from '@/store/useNoteStore'

interface HeartbeatComponentProps {
  itemId: string
  itemType: 'exercise' | 'note'
}

/*
Input: itemId (identifier of the item to log), itemType ('exercise' or 'note')
Output: no visible UI, but logs a heartbeat for the specified item at regular intervals
Return value: a component used to periodically log activity for an exercise or note
Function: sets up a timer to send a heartbeat log for the item after 30 seconds, then every 5 minutes, only if the user is not logged in
Variables: itemId, itemType, isLoggedIn, logExercise, logNote, intervalId, timeoutId
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export default function HeartbeatComponent({ itemId, itemType }: Readonly<HeartbeatComponentProps>) {
  const isLoggedIn = useAuthStore(state => state.isLogged)
  const logExercise = useExcerciseStore(state => state.log)
  const logNote = useNoteStore(state => state.log)
  useEffect(() => {
    let intervalId: NodeJS.Timeout
    const sendHeartbeat = () => {
      // Condition: Only log if the user is not logged in
      if (!isLoggedIn) {
        // Condition: Log exercise or note based on itemType
        if (itemType === 'exercise') {
          logExercise(itemId)
        }
        else if (itemType === 'note') {
          logNote(itemId)
        }
      }
    }
    const timeoutId = setTimeout(() => {
      sendHeartbeat() 
      intervalId = setInterval(sendHeartbeat, 300000) 
    }, 30000)
    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [])
  return null
}
