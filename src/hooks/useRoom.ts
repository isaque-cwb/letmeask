import { useEffect } from "react";
import { useState } from "react";
import { database } from "../service/firebase";

type QuestionType = {
  id: string;
  author: {
    name: string,
    avatar: string,
  },
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;

}>


export function useRoom(roomId: string) {
  const [questions, setQuestion] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)
    roomRef.on('value', room => {

      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        }
      })
      setTitle(databaseRoom.title)
      setQuestion(parsedQuestions)

    })
  }, [roomId]);

  return { questions, title }

}