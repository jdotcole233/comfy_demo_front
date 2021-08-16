import React from 'react'
import { TreatyProgramsProvider } from '../../context/TreatyProgramsProvider'
import TreatyPrograms from './TreatyPrograms'

export default function LKLOKK() {
    return (
        <TreatyProgramsProvider>
            <TreatyPrograms />
        </TreatyProgramsProvider>
    )
}
