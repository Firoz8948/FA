export interface Password {
  password: string
  hint: string
}

export interface Photo {
  id: number
  src: string
  alt: string
  caption: string
  date?: string
}

export interface Message {
  id: number
  text: string
  emoji: string
  color: string
}

export type AppState = "locked" | "unlocking" | "unlocked"
