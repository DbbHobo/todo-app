import { useState } from "react"
import { useCookies } from "react-cookie"

const Modal = ({ mode, setShowModal, getData, task }) => {
  const [cookie, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === "edit" ? true : false
  const now = new Date()
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookie.Email,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
  })

  const handelChange = (e) => {
    console.log(e)
    const { name, value } = e.target
    setData((data) => ({
      ...data,
      [name]: value,
    }))
  }

  const postData = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.status === 200) {
        setShowModal(false)
        getData()
        console.log(res)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const editData = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        }
      )
      if (res.status === 200) {
        setShowModal(false)
        getData()
        console.log(res)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title">
          <h3>Lets {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            onChange={handelChange}
          />
          <br />
          <label for="range">Drag to select your current progress</label>
          <input
            id="range"
            required
            type="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handelChange}
          />
          <br />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  )
}

export default Modal
