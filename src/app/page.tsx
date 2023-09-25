import Image from 'next/image'
import styles from './page.module.css'
import ThreeScene from '@/components/three-scene/ThreeScene'

export default function Home() {
  return (
    <main className={styles.main}>
     <ThreeScene></ThreeScene>
    </main>
  )
}
