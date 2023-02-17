import { Header } from "./components/Header";
import { Post } from "./components/Post";
import "./global.css";
import styles from "./App.module.css";
import { Siderbar } from "./components/Sidebar";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/IagoAndrade16.png",
      name: "Iago Andrade",
      role: "Dev full stack"
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋"},
      { type: "paragraph", content: "Acabei de subir mais um projeto no meu portifólio. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀"},
      { type: "link", content: "jane.design/doctorcare"}       
    ],
    publishedAt: new Date("2023-02-14 20:00:00")
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Maik Brito",
      role: "Dev full stack"
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋"},
      { type: "paragraph", content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀"},
      { type: "link", content: "jane.design/doctorcare"}       
    ],
    publishedAt: new Date("2023-02-14 07:00:00")
  }
]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Siderbar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}  
              />
            )
          })}
        </main>

      </div>

    </div>
  )
}



