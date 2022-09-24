interface GameBannerProps {
  bannerUrl: string
  title: string
  adsCount: number

}

export function GameBanner(props: GameBannerProps ){
  return (
    <a className='relative rounded-lg overflow-hidden keen-slider__slide' href=''>
            <img src={props.bannerUrl} alt={props.title} />
            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0 left-0'>
              <strong className='text-bold text-white block'>{props.title}</strong>
              <span className='text-zinc-300 text-s block mt-1'>{props.adsCount} anúncio(s)</span>
            </div>
    </a>
  )
}