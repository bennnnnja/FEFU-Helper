import { useState } from 'react'

interface AvatarProps {
  /** Size in pixels (square). */
  size?: number
  className?: string
}

/**
 * Student avatar. Loads /avatar.jpg from the public folder and falls
 * back to an emoji if the image is missing, so the UI never breaks.
 * Drop the photo at public/avatar.jpg to use a real picture.
 */
export default function Avatar({ size = 56, className = '' }: AvatarProps) {
  const [error, setError] = useState(false)

  return (
    <div
      className={
        'rounded-full overflow-hidden bg-brand/10 grid place-items-center shrink-0 ' + className
      }
      style={{ width: size, height: size }}
    >
      {error ? (
        <span style={{ fontSize: size * 0.5 }}>🧑‍🎓</span>
      ) : (
        <img
          src="/avatar.jpg"
          alt="avatar"
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}
