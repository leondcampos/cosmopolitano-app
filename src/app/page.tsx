import { useState, useEffect } from 'react'

interface Player {
    id: number
    name: string
    age: number
    position: string
    entryDate: string
}

export default function Home() {
    const [players, setPlayers] = useState<Player[]>([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch('/api/players')
            .then(res => res.json())
            .then(data => setPlayers(data))
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-semibold text-green-700 mb-4 text-center">
                🎯 Dashboard de Jogadores
            </h1>

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <input 
                    type="text"
                    placeholder="🔍 Pesquisar jogador..."
                    className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-green-500 text-white">
                            <th className="border border-gray-300 p-3 text-left">Nome</th>
                            <th className="border border-gray-300 p-3 text-left">Idade</th>
                            <th className="border border-gray-300 p-3 text-left">Posição</th>
                            <th className="border border-gray-300 p-3 text-left">Data de Entrada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.filter(player => 
                            player.name.toLowerCase().includes(search.toLowerCase())
                        ).map(player => (
                            <tr key={player.id} className="hover:bg-gray-100 transition">
                                <td className="border border-gray-300 p-3">{player.name}</td>
                                <td className="border border-gray-300 p-3">{player.age}</td>
                                <td className="border border-gray-300 p-3">{player.position}</td>
                                <td className="border border-gray-300 p-3">{new Date(player.entryDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
