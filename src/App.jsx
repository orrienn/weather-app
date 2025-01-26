import React from 'react'
import './App.css'
import { MapComponent } from './components'
import { mapConfig } from './config'

export const App = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <MapComponent {...mapConfig}/>
        </div>
    )
}