import { Page } from "../components/Page";
import { Main } from "../components/Page/Main";
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router";
import { useRoom } from "../hooks/useRoom";

type CreateRoom = {
    name: string;
    nick: string;
}

export function CreateRoom() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [nick, setNick] = useState('');

    const { createRoom } = useRoom()

    const handleCreateRoom = async (e: FormEvent) => {
        e.preventDefault()

        const params = {
            name: name,
            authorNick: nick
        }

        const roomKey = await createRoom(params)

        navigate(`/rooms/${roomKey}`)
    }

    return (
        <Page>
            <div className="h-full w-full grid-60-40 flex justify-around">
                <div className="h-full flex-center">
                    <img src="https://miro.medium.com/max/1400/1*UzlFgnkt2jCe9LbF7-DBTg.gif" width="700px" />
                </div>
                <div id="form" className="h-full flex-center">
                    <div className="flex flex-col gap-6">
                        <div className="flex-col-center gap-2">
                            <h2>Criar Nova Sala</h2>
                            <span>Insira um nome para a Sala</span>
                        </div>
                        <form onSubmit={(e) => handleCreateRoom(e)} className="flex-col-center">
                            <input onChange={(e) => { setName(e.target.value); }} type="text" id="name" value={name} placeholder="Digite o nome da sala" minLength={3} required className="w-full" />

                            <input onChange={(e) => { setNick(e.target.value); }} type="text" id="nick" value={nick} placeholder="Digite seu apelido" minLength={3} required className="w-full" />

                            <button type="submit" className="w-full btn btn-primary">Criar Sala</button>

                            <div className="separator">ou</div>

                            <span onClick={() => navigate('/rooms/sign-in')} className="link-span">Acessar sala existente</span>
                        </form>
                    </div>
                </div>
            </div>
        </Page>
    )
}