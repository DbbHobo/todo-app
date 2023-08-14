import { useState } from "react"
import TickIcon from "./TickIcon"
import ProgressBar from "./ProgressBar"
import Modal from "./Modal"

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false)

  const deleteItem = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        {
          method: "DELETE",
        }
      )
      if (res.status === 200) {
        getData()
        console.log(res)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="list-item">
      <div className="list-info-container">
        <TickIcon />
        <div className="list-content">
          <div className="list-title">{task.title}</div>
          <ProgressBar progress={task.progress} />
        </div>
      </div>
      <div className="btn-container">
        <button className="btn-edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="btn-del" onClick={deleteItem}>
          DELETE
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}
    </div>
  )
}

export default ListItem
