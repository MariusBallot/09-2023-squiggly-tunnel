'use client'

import React, { useEffect, useRef } from 'react'
import styles from "./ThreeScene.module.css"
import MainThreeScene from "./webgl-scripts/MainThreeScene"

export default function ThreeScene() {
    const threeContainerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (threeContainerRef.current) {
            MainThreeScene.init(threeContainerRef.current)
        }
    }, [threeContainerRef])

    return (
        <>

            <div className={styles.three_scene_container} ref={threeContainerRef}>
            </div>
        </>
    )
}