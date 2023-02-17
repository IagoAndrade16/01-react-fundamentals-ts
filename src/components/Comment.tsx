import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

interface ICommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment ({ content, onDeleteComment }: ICommentProps) {
  const [likeCount, setLikeCount ] = useState(0); 
  
  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleLikeComment() {
    /** Sempre que for alterar o valor de uma variável que depende do antigo valor dela, usa função anônima */

    // Isso funciona, porém não é melhor jeito, pois depende do valor anterior de like count
    setLikeCount(likeCount + 1);

    // Esse é o melhor jeito. (state é o valor anterior de like count)
    setLikeCount((state) => {
      return state + 1;
    })


  }


  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/IagoAndrade16.png" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Iago Alexandre</strong>
              <time title="11 de maio ás 08:13" dateTime="2022-05-11 00:13:30">Cerca de 1h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24}/>
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}