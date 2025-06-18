import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function Relatorios() {
    const [doacoesPorUsuario, setDoacoesPorUsuario] = useState([]);
    const [itensPorDescricao, setItensPorDescricao] = useState([]);
    const [itensPorCategoria, setItensPorCategoria] = useState([]);

    useEffect(() => {
        fetch("http://backend-25v2.onrender.com/relatorio/doacoes-por-usuario")
            .then(res => res.json())
            .then(data => setDoacoesPorUsuario(data));

        fetch("http://backend-25v2.onrender.com/relatorio/itens-por-descricao")
            .then(res => res.json())
            .then(data => setItensPorDescricao(data));

        fetch("http://backend-25v2.onrender.com/relatorio/itens-por-categoria")
            .then(res => res.json())
            .then(data => setItensPorCategoria(data));
    }, []);

    const cores = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
        '#9966FF', '#FF9F40', '#E7E9ED', '#8B0000',
        '#008080', '#FFD700', '#DC143C', '#20B2AA',
        '#4169E1', '#8A2BE2'
    ];

    // 🔹 Gráfico 1: Número de itens totais doados (total quantidade)
    const graficoDoacoesPorUsuario = {
        labels: doacoesPorUsuario.map(item => item.username),
        datasets: [{
            label: 'Total de itens doados',
            data: doacoesPorUsuario.map(item => item.totalDoacoes),
            backgroundColor: cores
        }]
    };

    // 🔹 Gráfico 2: Total de itens por descrição
    const graficoItensPorDescricao = {
        labels: itensPorDescricao.map(item => item.descricao),
        datasets: [{
            label: 'Total de Itens',
            data: itensPorDescricao.map(item => item.totalItens),
            backgroundColor: cores
        }]
    };

    // 🔹 Gráfico 3: Total de itens por categoria (Ex.: pode ser e-mail ou outra categorização)
    const graficoItensPorCategoria = {
        labels: itensPorCategoria.map(item => item.categoria),
        datasets: [{
            label: 'Total de Itens por usuário',
            data: itensPorCategoria.map(item => item.totalItens),
            backgroundColor: cores
        }]
    };

    // 🔹 Gráfico 4: Média de itens por doador (Ex.: pode ser e-mail ou outra categorização)
    const mediaItensPorCategoria = {
        labels: doacoesPorUsuario.map(item => item.username),
        datasets: [{
            label: 'média de itens doados',
            data: doacoesPorUsuario.map(item => item.mediaItensPorDoacao),
            backgroundColor: cores
        }]
    };

    return (
        <div
            className="container mt-5"
            style={{
                backgroundColor: '#f0f4f7',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)'
            }}
        >

        <h2 className="text-center mb-4">Relatórios de Doações</h2>

            {/* Gráfico 1 */}
            <div className="mb-5">
                <h4 className="text-center">Numero de doacoes por usuario</h4>
                <Bar data={graficoDoacoesPorUsuario} />
            </div>

            {/* Gráfico 2 */}
            <div className="mb-5">
                <h4 className="text-center">Total de Itens Doado por Descrição</h4>
                <Pie data={graficoItensPorDescricao} />
            </div>

            {/* Gráfico 3 */}
            <div className="mb-5">
                <h4 className="text-center">Total de Itens Doados por usuario</h4>
                <Bar data={graficoItensPorCategoria} />
            </div>
            {/* Gráfico 4*/}
            <div className="mb-5">
                <h4 className="text-center">Média de Itens Doados por usuario</h4>
                <Bar data={mediaItensPorCategoria} />
            </div>
        </div>
    );
}

export default Relatorios;
