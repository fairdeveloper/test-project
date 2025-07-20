import Link from 'next/link'
import { MotionDiv } from './ClientMotion'

interface PostForCard {
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
}

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

export default function FeaturedPostCard({ post }: { post: PostForCard }) {
  return (
    <MotionDiv whileHover="hover" variants={cardVariants}>
      <Link href={`/analizler/${post.slug.current}`} className="block group">
        <div className="bg-surface p-8 rounded-xl border border-subtle-border transition-all duration-300 hover:border-accent-start/50">
          <p className="text-sm text-secondary-text mb-3">
            ÖNE ÇIKAN ANALİZ • {new Date(post.publishedAt).toLocaleDateString('tr-TR', { month: 'long', day: 'numeric' })}
          </p>
          <h2 className="text-4xl font-bold text-primary-text leading-tight group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-accent-start to-accent-end transition-colors">
            {post.title}
          </h2>
        </div>
      </Link>
    </MotionDiv>
  )
}