export type ValueOf<O> = O extends readonly (infer V)[] ? V : O[keyof O]
