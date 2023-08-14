import { useEffect, useState } from "react"
import ListHeader from "./components/ListHeader"
import ListItem from "./components/ListItem"
import Auth from "./components/Auth"
import { useCookies } from "react-cookie"

const App = () => {
  const [cookie, setCookie, removeCookie] = useCookies(null)
  const authToken = cookie.AuthToken
  const userEmail = cookie.Email
  const [tasks, setTasks] = useState(null)

  const getData = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      )
      const json = await res.json()

      setTasks(json)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }
  }, [])

  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader
            listName={`🥒 ${userEmail}'s TODO List`}
            getData={getData}
          />
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
