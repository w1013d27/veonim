import { connect as connectToServerOn, Server } from './channel'
import { spawn } from 'child_process'

const servers = new Map<string, (port: number) => Server>()

servers.set('javascript', port => {
  spawn('node', [
    require.resolve('js-langs'),
    port + ''
  ])

  return connectToServerOn(port)
})

// TODO: soon. TS server sends requests for files from workspace that need to be fulfilled
//servers.set('typescript', port => {
  //spawn('node', [
    //'node_modules/javascript-typescript-langserver/lib/language-server.js',
    //'-p',
    //port + ''
  //])

  //return connectToServerOn(port)
//})


export const hasServerFor = (language: string) => servers.has(language)
export const startServerFor = (language: string, port: number) => servers.get(language)!(port)