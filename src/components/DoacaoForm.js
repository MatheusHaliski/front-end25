import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header2 from "./Header2";

const DoacaoForm = () => {
    const [emailUsuario, setEmailUsuario] = useState(null);
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [imagemObjeto, setImagemObjeto] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const email = sessionStorage.getItem("emailUsuario");
        if (!email) {
            navigate('/login');
        } else {
            setEmailUsuario(email);
            setIsLoading(false);
        }
    }, [navigate]);

    if (isLoading) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = sessionStorage.getItem("emailUsuario");

        if (!email) {
            navigate('/login');
            return;
        }

        setEmailUsuario(email);
        setIsLoading(false);

        const formData = new FormData();
        formData.append("descricao", descricao);
        formData.append("quantidade", quantidade);
        formData.append("email", email);

        if (imagemObjeto) {
            formData.append("imagemObjeto", imagemObjeto);
        }

        try {
            const response = await fetch("http://localhost:8080/realizar-doacao2", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Doação Enviada!',
                    text: 'Sua doação foi registrada com sucesso.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    setDescricao('');
                    setQuantidade('');
                    setImagemObjeto(null);
                    const tipoUsuario = sessionStorage.getItem("tipoUsuario");
                    if (tipoUsuario === 'USUARIO_COMUM') {
                        navigate("/MenuInicial");
                    } else if (tipoUsuario === 'USUARIO_ADM') {
                        navigate("/MenuInicial2");
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Não foi possível enviar a doação.'
                });
            }
        } catch (error) {
            console.error("Erro:", error);
            await Swal.fire({
                icon: 'error',
                title: 'Erro na requisição',
                text: 'Houve um problema ao enviar a doação.'
            });
        }
    };

    return (
        <div>
            <div style={styles.container}>
                <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
                    <h2 style={{ color: 'black' }}>Fazer uma Doação</h2>

                    <label style={styles.label}>Descrição:</label>
                    <input
                        type="text"
                        name="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <label style={styles.label}>Quantidade:</label>
                    <input
                        type="number"
                        name="quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <label style={styles.label}>Imagem do Objeto:</label>
                    <input
                        type="file"
                        name="imagemObjeto"
                        accept="image/*"
                        onChange={(e) => setImagemObjeto(e.target.files[0])}
                        style={styles.input}
                    />

                    <button type="submit" style={styles.button}>Enviar Doação</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        background: 'linear-gradient(to right, #a1c4fd, #c2e9fb)',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0
    },
    form: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        textAlign: 'center',
        width: '300px'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
        color: '#333'
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '14px'
    },
    button: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        fontSize: '16px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    }
};

export default DoacaoForm;
