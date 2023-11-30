import EmailCardComponent from "../components/cards/EmailCardComponent";


export default function Home() {
  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
      <EmailCardComponent label='Recuperar contraseña'/>
    </main>
  )
}
