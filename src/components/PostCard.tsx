import Link from 'next/link'
import { MotionDiv } from './ClientMotion'

interface PostForCard {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
}

// Animasyon varyantlarımızı 'as const' ile tanımlayarak tipleri sabitliyoruz
const cardVariants = {
  hover: {
    y: -8,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  },
} as const; // DEĞİŞİKLİK BURADA

export default function PostCard({ post }: { post: PostForCard }) {
  return (
    <MotionDiv whileHover="hover" variants={cardVariants} className="h-full">
      <Link href={`/analizler/${post.slug.current}`} className="block group h-full">
        <div className="bg-surface rounded-lg p-6 h-full flex flex-col border border-subtle-border group-hover:border-accent-start/50 transition-all duration-300">
          <p className="text-sm text-secondary-text mb-2">
            {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <h3 className="flex-grow text-2xl font-bold text-primary-text group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-accent-start to-accent-end transition-colors">
            {post.title}
          </h3>
        </div>
      </Link>
    </MotionDiv>
  )
}