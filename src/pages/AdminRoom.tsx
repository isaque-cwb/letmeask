import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
import { useParams } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../service/firebase';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';




type RoomParams = {
  id: string,
}

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const { questions, title } = useRoom(roomId);


  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }
    if (!user) {
      throw new Error('Você precisa estar logado!')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,

      },
      isHighlighted: false,
      isAnswered: false,
    }
    await database.ref(`rooms/${roomId}/questions`).push(question)
    setNewQuestion('')
  };


  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letMeAsk" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined >Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main >
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span> {questions.length} Perguntas</span>}

        </div>


        <div className="question-list">
          {questions.map(question => {
            console.log(question);
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}


              />
            )


          })}
        </div>

      </main>
    </div>
  )
}