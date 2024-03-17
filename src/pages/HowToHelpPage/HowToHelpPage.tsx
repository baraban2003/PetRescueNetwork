import React, { useRef } from "react"
import s from "./HowToHelpPage.module.css"
import { AnimalDuringWar } from "./content/AnimalDuringWar"
import { AnimalLocked } from "./content/AnimalLocked"
import { PetOnTheStreet } from "./content/PetOnTheStreet"
import { PetAdoption } from "./content/PetAdoption"

interface Article {
  id: string
  title: string
  content: JSX.Element | null | string
  linkedId?: string // New property for the linked article ID
}

const articles: Article[] = [
  { id: "a1", title: "Animals during the war", content: <AnimalDuringWar /> },
  {
    id: "a2",
    title: "How to help an animal locked <br />in an apartment",
    content: <AnimalLocked />,
  },
  { id: "a3", title: "What not to do", content: "", linkedId: "a2" },
  {
    id: "a4",
    title: "What to do if the animal is injured",
    content: "",
    linkedId: "a2",
  },
  {
    id: "a5",
    title: "You found a pet on the street. <br /> What should you do?",
    content: <PetOnTheStreet />,
  },
  {
    id: "a6",
    title: "How to make an effective adoption <br />announcement",
    content: <PetAdoption />,
  },
  {
    id: "a7",
    title: "You lost your pet. <br /> What should you do?",
    content: "",
    linkedId: "a6",
  },
]

export const HowToHelpPage: React.FC = () => {
  const scrollToRef = (ref: HTMLDivElement | null) => {
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const executeScroll = (linkedId: string) => {
    const articleRef = refs.current[linkedId]
    scrollToRef(articleRef)
  }

  const refs = useRef<Record<string, HTMLDivElement | null>>({})

  return (
    <div className={s.page}>
      <div className={s.titles}>
        {articles.map((article) => (
          <h2 key={article.id} className={s.articleTitle}>
            <a
              className={s.articleLink}
              href={`#${article.linkedId || article.id}`}
              onClick={(e) => {
                e.preventDefault()
                executeScroll(article.linkedId || article.id)
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: article.title }} />
            </a>
          </h2>
        ))}
      </div>

      <div className={s.articles}>
        {articles.map((article) => (
          <div
            // className={s.articlesItem}
            key={article.id}
            id={article.id}
            ref={(el) => (refs.current[article.id] = el)}
          >
            {article.content}
          </div>
        ))}
      </div>
    </div>
  )
}
