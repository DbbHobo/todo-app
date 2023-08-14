import { useState } from "react"
import Modal from "./Modal"
import { useCookies } from "react-cookie"

const ListHeader = ({ listName, getData }) => {
  const [cookie, setCookie, removeCookie] = useCookies(null)
  const [showModal, setShowModal] = useState(false)
  const signOut = () => {
    removeCookie("Email")
    removeCookie("AuthToken")
    window.location.reload()
    console.log("Im gonna signout...")
  }
  return (
    <div className="list-header">
      <h3>{listName}</h3>
      <div className="btn-container">
        <button className="btn-add" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>
        <button className="btn-sign" onClick={signOut}>
          SIGN OUT
        </button>
      </div>
      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  )
}

export default ListHeader
