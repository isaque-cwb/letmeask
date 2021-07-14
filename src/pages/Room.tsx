import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
import { useParams } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../service/firebase';

type RoomParams = {
  id: string,
}

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)
  }, [roomId])


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
          <RoomCode code={roomId} />
        </div>
      </header>
      <main >
        <div className="room-title">
          <h1>Sala React</h1>
          <span> 4 Perguntas</span>

        </div>
        <form onSubmit={handleSendQuestion} >
          <textarea
            placeholder="o que vc quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className='user-info' >
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span >Para enviar uma pergunta, <button>faça seu login!</button></span>
            )}
            <Button type="submit" disabled={!user} >Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}