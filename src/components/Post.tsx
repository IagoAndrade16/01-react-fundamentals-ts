import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState, FormEvent, ChangeEvent, InvalidEvent } from "react";

// estado são variáveis que eu quero que o react monitore

interface IAuthor {
  name: string;
  role: string;
  avatarUrl: string;
}

interface IPostProps {
  author: IAuthor;
  publishedAt: Date;
  content: IContent[];
}

interface IContent {
  type: 'paragraph' | 'link';
  content: string;
}

export function Post({ author, content, publishedAt }: IPostProps) {
  const [comments, setComments] = useState(
    [
      'post muito bacana hein!'
    ]
  )

  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'ás' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })

    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length == 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>
              {author.name}
            </strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormated} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(paragraph => {
          if(paragraph.type === 'link') {
            return (
              <a href="#">
                <p key={paragraph.content}>{paragraph.content}</p>
              </a>
            )
          }
          return (
            <p key={paragraph.content}>{paragraph.content}</p>
          )
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea 
        name="comment"
        placeholder="Deixe um comentário"
        value={newCommentText}
        onChange={handleNewCommentChange}
        onInvalid={handleNewCommentInvalid}
        required
        ></textarea>

        <footer>
          <button 
          type="submit" 
          disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment key={comment} 
            content={comment} 
            onDeleteComment={deleteComment}/>
          )
        })}
      </div>
    </article>
  )
}