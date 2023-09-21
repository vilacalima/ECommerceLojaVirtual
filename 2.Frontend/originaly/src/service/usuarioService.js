import axios from 'axios';

const UsuarioService = {

    getLogin: async (UserDTO) => {
        try {
            const response = await axios.get('http://localhost:8080/api/login/getLogin', UserDTO);
            console.log('Dados enviados com sucesso: ', response.data);
            
            return response.data;
            
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    },

    // getUsers: () => {
    //     axios.get('http://localhost:8080/api/getUsuario')
    //     .then(response => {
    //         setUsers(response.data);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
    // }

};

export default UsuarioService;