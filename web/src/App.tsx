import { useEffect, useState } from 'react'
import './styles/main.css'
import { GameController, MagnifyingGlassPlus } from 'phosphor-react'
import logoimg from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>()

  useEffect(()=>{
    axios('http://localhost:3333/games')
    .then(response => {
      setGames(response.data)
    })

  },[])
  
  const animation = { duration: 50000, easing: (t: number) => t }
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
      slides: {
        perView: 6,
      },
      loop: true,
      renderMode: "precision",
      drag: true,
      created(s) {
        s.moveToIdx(5, true, animation)
      },
      updated(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      },
      animationEnded(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      },
      
    })

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
        <img src={logoimg} alt="Logo nlw eSports"/>
        <h1 className='text-6xl text-white font-black mt-20'>
          Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
        </h1>
        <div 
          className='grid grid-cols-6 gap-6 mt-16 keen-slider'
          ref={sliderRef}
        >
        
          {games && games.map( game => {
            return (
              <GameBanner 
              key={game.id}
              bannerUrl={game.bannerUrl} 
              title={game.title} 
              adsCount={game._count.ads} 
              />
            )
          })}
          
          
        </div>
        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal />
        </Dialog.Root>
    </div>
    )
}

export default App
