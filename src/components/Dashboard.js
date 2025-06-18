import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis, CartesianGrid } from "recharts";

const Dashboard = () => {
    const [doacoesUsuario, setDoacoesUsuario] = useState([]);
    const [doacoesCategoria, setDoacoesCategoria] = useState([]);
    const [itensUsuario, setItensUsuario] = useState([]);
    const [itensCategoria, setItensCategoria] = useState([]);

    const cores = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57", "#ffc0cb"];

    useEffect(() => {
        axios.get("https://backend-25v2.onrender.com/dashboard/doacoes-por-usuario")
            .then(res => setDoacoesUsuario(res.data));


        axios.get("https://backend-25v2.onrender.com0/dashboard/itens-por-usuario")
            .then(res => setItensUsuario(res.data));


    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Dashboard de Doações</h1>

            <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
                {/* Número de Doações por Usuário */}
                <div>
                    <h3>Doações por Usuário</h3>
                    <BarChart width={500} height={300} data={doacoesUsuario}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="usuario" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalDoacoes" fill="#8884d8" />
                    </BarChart>
                </div>

                {/* Número de Doações por Categoria */}
                <div>
                    <h3>Doações por Categoria</h3>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={doacoesCategoria}
                            dataKey="totalDoacoes"
                            nameKey="categoria"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {doacoesCategoria.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>

                {/* Total de Itens por Usuário */}
                <div>
                    <h3>Total de Itens Doado por Usuário</h3>
                    <BarChart width={500} height={300} data={itensUsuario}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="usuario" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalItens" fill="#82ca9d" />
                    </BarChart>
                </div>

                {/* Total de Itens por Categoria */}
                <div>
                    <h3>Total de Itens por Categoria</h3>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={itensCategoria}
                            dataKey="totalItens"
                            nameKey="categoria"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {itensCategoria.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
