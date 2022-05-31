import { TaskSideBar } from "../components/TaskSideBar"
import { Page } from "../components/Page"
import { Table } from "../components/Table"
import { Deck } from "../components/Deck"
import { Spinner } from "../components/Spinner"
import { VotingResult } from "../components/VotingResult"
import { UserRoom } from "../components/UserRoom"
import { useRoom } from "../hooks/useRoom"

import cx from 'classnames';
import { useNavigate } from "react-router"

export function Room() {
  const navigate = useNavigate();
  // const { setShowModal } = useModals()
  const { loadRoom, code, currentUserRoom, usersRoom } = useRoom()
  const taskToVote = undefined

  console.log(currentUserRoom)

  if (loadRoom) {
    return (
      <Spinner />
    )
  } else if (!code) {
    return (
      <div className="w-full h-full px-10 flex-center">
        <h2>404 - Sala não encontrada 🤔</h2>
      </div>
    )
  } else if (code && !currentUserRoom) {
    return (
      <div className="w-full h-full px-10 flex-col-center gap-4">
        <h2>403 - Não Autorizado 🤔</h2>
        <h3>Parece que essa sala existe mas você está tentando acessá-la de forma incorreta.</h3>
        <span>Tente entrar <a href={`/rooms/sign-in/${code}`} className="link-span">clicando aqui</a>.</span>
      </div>
    )
  }

  return (
    <>
      <TaskSideBar />
      <VotingResult />
      <Page>
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-full flex flex-col items-center justify-between">
            <div className="w-full flex-center gap-8">
              {usersRoom.map((userRoom) => {
                if (userRoom.id == currentUserRoom?.id) return

                return (
                  <UserRoom key={userRoom.id} user={userRoom} />
                )
              })}
            </div>
            <Table>
              <div className="w-full flex-center mb-5">
                <span className="text-center">Nenhuma tarefa sendo votada no momento</span>
              </div>
              <button
                type="submit"
                className={cx(
                  { 'btn btn-primary': taskToVote },
                  { 'btn btn-secondary border-3 text-gray-500 hover:cursor-no-drop': !taskToVote },
                )}
              >Encerrar a rodada</button>
            </Table>
            <UserRoom key={currentUserRoom?.id} user={currentUserRoom} />
            <Deck />
          </div>
        </div>
      </Page>
    </>
  )
}