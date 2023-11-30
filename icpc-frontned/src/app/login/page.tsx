import LoginCardComponent from '../components/LoginCardComponent'

const cn =
  'block w-full rounded-md border-0 p-2 text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6'

const fields = [
  {
    id: 1,
    labelText: 'Nombre de usuario',
    type: 'username',
    tagId: 'username',
    name: 'username',
    autocomplete: 'username',
    placeholder: 'Juanito123',
    required: true
  },
  {
    id: 2,
    labelText: 'Contraseña',
    type: 'password',
    tagId: 'password',
    name: 'password',
    autocomplete: 'current-password',
    placeholder: 'Nada de 12345',
    required: true
  },
  {
    id: 3,
    labelText: 'Recuérdame',
    type: 'checkbox',
    tagId: 'rememberMe',
    name: 'rememberMe',
    autocomplete: '',
    placeholder: '',
    required: true
  },
  {
    id: 4,
    labelText: 'Enviar',
    type: 'submit',
    tagId: 'send',
    name: 'send',
    autocomplete: '',
    placeholder: '',
    required: true
  },
  {
    id: 5,
    labelText: 'Olvidé mi contraseña',
    type: 'forgot',
    tagId: '',
    name: '',
    autocomplete: '',
    placeholder: '#',
    required: false
  }
]

export default function Home() {
  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
      <LoginCardComponent />
    </main>
  )
}
