import { FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button';
import { useState } from 'react'
import { database } from '../service/firebase'
import { useAuth } from '../hooks/useAuth';


export function NewRoom() {

  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function HandleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === '') {
      return;
    }
    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,

    })

    history.push(`/rooms/${firebaseRoom.key}`)

  }

  return (
    <div id='page-auth' >
      <aside>
        <img src={illustrationImg} alt=" Ilustração simbolizando perguntas e respostas " />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo real</p>
      </aside>
      <main  >
        <div className='main-content' >
          <img src={logoImg} alt=" LetMeASk " />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={HandleCreateRoom} >
            <input
              type="text"
              placeholder='Nome da sala'
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}