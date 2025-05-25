const Home = () => {
    return (
        <section className="bg-white text-gray-800">
            <section className="text-center py-16 bg-gradient-to-b from-blue-200 to-white">
                <h1 className="text-4xl font-serif font-bold text-blue-900 mb-2 tracking-wide">
                    Atlas Desenvolvimento
                </h1>
                <p className="italic text-xl text-gray-700 mb-4">
                    “O autoconhecimento é o princípio de toda sabedoria.” — Aristóteles
                </p>
                <h2 className="text-lg font-medium text-gray-800 mb-6">
                    Bem-vindo ao seu novo ciclo de crescimento
                </h2>
                <div className="flex justify-center gap-4">
                    <a href="/tarefas" className="bg-blue-900 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                        Começar agora
                    </a>
                    <a href="/relatorios" className="border border-blue-900 text-blue-900 px-6 py-2 rounded-lg hover:bg-blue-200 transition">
                        Ver Relatórios
                    </a>
                </div>
            </section>

            {/* cards */}
            <section className="py-16 px-4 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                    {
                        title: "Tarefas",
                        description: "Organize e acompanhe suas tarefas diárias.",
                        icon: "📋",
                        url: "/tarefas",
                    },
                    {
                        title: "Estudos",
                        description: "Monitore seu aprendizado e evolução.",
                        icon: "📚",
                        url: "/estudos",
                    },
                    {
                        title: "Relatórios",
                        description: "Visualize seu progresso em gráficos e dados.",
                        icon: "📊",
                        url: "/relatorios",
                    },
                ].map((card, index) => (
                    <a href={card.url} key={index} className="border rounded-xl p-6 shadow hover:shadow-lg transition text-center">
                        <div className="text-5xl mb-4">{card.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                        <p className="text-gray-600 mb-4">{card.description}</p>
                        <p className="text-blue-900 font-medium hover:underline">
                            Acessar {card.title}
                        </p>
                    </a>
                ))}
            </section>
        </section>
    );
}

export default Home;