import { FormEvent, useState } from "react"
import { useRoom } from "../hooks/useRoom";

type CreateRoom = {
    name: string;
    nick: string;
  }

export function CreateRoom() {
    const [name, setName] = useState('');
    const [nick, setNick] = useState('');

    const { CreateRoom } = useRoom

    const handleCreateRoom = (e: FormEvent) => {
        e.preventDefault()

        const params = {
            name: name,
            nick: nick
        }
        CreateRoom(params)
    }

    return (
        <>
            <nav>
                <div className="logo">
                    <img></img>
                    <h2>Criar Sala</h2>
                </div>
                <div></div>
            </nav>
            <main className="flex-center" style={{height:"70%"}}>
                <div style={{width:"60%",height:"100%"}} className="flex-center">
                        <img src="https://miro.medium.com/max/1400/1*UzlFgnkt2jCe9LbF7-DBTg.gif" width="700px"></img>
                </div>
                <div id="form"style={{width:"40%",height:"100%"}} className="flex-center">
                    <div className="flex-down">
                        <form onSubmit={(e) => handleCreateRoom}>
                            <div className="title-form">
                                <h2>Criar Nova Sala</h2>
                            </div>
                            <label htmlFor="name">Insira um nome para a Sala</label>
                            <br />
                            <input onChange={(e) => {setName(e.target.value); }} type="text" id="name" value={name} placeholder="Digite o nome da sala" />
                            <br />
                            <label htmlFor="nick">Insira um apelido</label>
                            <br />
                            <input onChange={(e) => {setNick(e.target.value); }} type="text" id="nick" value={nick} placeholder="Digite seu apelido" />
                            <br />
                            <div className="buttons-form">
                                <button type="submit" className="btn-primary">Criar Sala</button>
                                <br/>
                                <a href="">Acessar sala existente</a>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </main>

        </>
    )
}