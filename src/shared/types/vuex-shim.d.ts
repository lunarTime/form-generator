declare module 'vuex' {
    export * from 'vuex/types/index.d.ts'
    export * from 'vuex/types/helpers.d.ts'
    export * from 'vuex/types/vue.d.ts'
    export * from 'vuex/types/logger.d.ts'

    export interface Module<S, R> {}
    export function Store<S = any>(): any
}
