import { db } from '@/lib/db';
// import { useActionState } from 'react';

export async function GET() {
  const dishes = await db.dish.findMany();

  if (dishes.length === 0) {
    return Response.json({ message: 'No dishes found' }, { status: 404 });
  }

  return Response.json({ dishes });
}

// "use server"
// function Hello(){
//   return "hello there"
// }

// from browser
// from server

// clint
// fetch
// route.js
// Response

// clint
// hello()
// server Action
// result

// <form action={hello}>
//   <button>send</button>
// </form>

// route Handler 
//  URL + fetch()  , response

// Server Action
// Function + 'use Server', return

// useActionState
// 3
//  sideeffect

// state = "hello there"
// formAction = function for the form
// pending = true while wating

// "use server"
// fucntion hello(){return "heloo there"}

// function add(num1, num2){
//   return num1 + num2
// }


// "use clint"

// import {useActiionState} = from 'react'
// import {hello} from "./actions"

// const [state, formAction, pending] = useActiionState(hello, null)
// const [state, formaction, pending] = useActiionState(add, nul)

