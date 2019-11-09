import "react"

declare module "react" {
  export function createContext<T>(): React.Context<T | undefined>
}
