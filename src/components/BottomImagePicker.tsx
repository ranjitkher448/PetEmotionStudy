const base = import.meta.env.BASE_URL

const PICKS = [
  {
    src: `${base}picks/pick-1.png`,
    alt: 'Young tabby kitten with white muzzle and chest, looking at the camera',
  },
  {
    src: `${base}picks/pick-2.png`,
    alt: 'Golden Retriever portrait outdoors, panting with tongue out',
  },
  {
    src: `${base}picks/pick-3.png`,
    alt: 'Young tortoise walking toward the camera on a neutral surface',
  },
  {
    src: `${base}picks/pick-4.png`,
    alt: 'Close-up of a palomino horse with a white mane and blaze, lying down and looking through a grey wooden fence',
  },
] as const

type BottomImagePickerProps = {
  selected: number | null
  onPick: (index: number) => void
}

export function BottomImagePicker({ selected, onPick }: BottomImagePickerProps) {
  return (
    <div
      className="bottom-image-picker"
      role="group"
      aria-label="Choose one picture"
    >
      {PICKS.map((pick, index) => (
        <button
          key={pick.src}
          type="button"
          className={
            'bottom-image-picker__btn' +
            (selected === index ? ' bottom-image-picker__btn--selected' : '')
          }
          onClick={() => onPick(index)}
          aria-pressed={selected === index}
        >
          <img
            className="bottom-image-picker__img"
            src={pick.src}
            alt={pick.alt}
            width={88}
            height={88}
            draggable={false}
          />
        </button>
      ))}
    </div>
  )
}
