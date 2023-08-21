package com.lojavirtual.senac.repository;

import com.lojavirtual.senac.dto.AdministradorDTO;
import com.lojavirtual.senac.model.Administrador;
import java.sql.*;
import java.util.ArrayList;

public class AdministradorDao {

    /**
     * Url para consulta no banco de dados
     */
    public static String url = "jdbc:mysql://localhost:3306/??";

    /**
     * Login para acesso ao banco de dados
     */
    public static String login = "root";

    /**
     * Senha para acesso ao banco de dados Senha usada nos computadores do senac - > P@$$w0rd
     */
    public static String senha = "";

    /**
     * Método para salvar objetos do tipo Administrador no banco de dados
     * @param obj
     * @return
     * @throws SQLException
     */
    public static boolean salvar(AdministradorDTO obj)throws SQLException {
        Connection conexao = null;
        boolean retorno = false;

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");
            conexao = DriverManager.getConnection(url,login,senha);

            PreparedStatement comandoSQL = conexao.prepareStatement("INSERT INTO administrador (nome, cpf, email, telefone, ativo, cep, rua, bairro, grupo) VALUES(?,?,?,?,?,?,?,?,?)");
            comandoSQL.setString(1, obj.getNome());
            comandoSQL.setString(2, obj.getCpf());
            comandoSQL.setString(3, obj.getEmail());
            comandoSQL.setString(4, obj.getTelefone());
            comandoSQL.setBoolean(5, obj.getAtivo());
            comandoSQL.setString(6, obj.getCep());
            comandoSQL.setString(7, obj.getRua());
            comandoSQL.setString(8, obj.getBairro());
            comandoSQL.setString(9, obj.getGrupo());

            int linhasAfetadas = comandoSQL.executeUpdate();
            if(linhasAfetadas>0){
                retorno = true;
            }
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println(ex.getMessage());
        }
        return retorno;
    }

    /**
     * Método para listar objetos do tipo Administrador do banco de dados pelo cpf
     * @param obj
     * @return
     * @throws SQLException
     */
    public static ArrayList<Administrador> listarPorCpf(Administrador obj) throws SQLException{
        Connection conexao = null;
        ArrayList<Administrador> lista = new ArrayList<Administrador>();

        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexao = DriverManager.getConnection(url,login,senha);

            PreparedStatement comandoSQL =
                    conexao.prepareStatement("SELECT * FROM Administrador WHERE cpf=?");
            comandoSQL.setString(1, obj.getCpf());

            ResultSet rs = comandoSQL.executeQuery();

            if(rs!=null){
                while(rs.next()){
                    Administrador dto = new Administrador();
                    dto.setNome(rs.getString("nome"));
                    dto.setCpf(rs.getString("cpf"));
                    dto.setEmail(rs.getString("email"));
                    dto.setTelefone(rs.getString("telefone"));
                    dto.setAtivo(rs.getBoolean("ativo"));
                    dto.setCep(rs.getString("cep"));
                    dto.setRua(rs.getString("rua"));
                    dto.setBairro(rs.getString("bairro"));
                    dto.setGrupo(rs.getString("grupo"));

                    lista.add(dto);
                }
            }
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println(ex.getMessage());
        }
        return lista;
    }

    /**
     * Método para listar objetos do tipo Administrador do banco de dados
     * @param obj
     * @return
     * @throws SQLException
     */
    public static ArrayList<Administrador> listar(Administrador obj) throws SQLException{
        Connection conexao = null;
        ArrayList<Administrador> lista = new ArrayList<Administrador>();

        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexao = DriverManager.getConnection(url,login,senha);

            PreparedStatement comandoSQL =
                    conexao.prepareStatement("SELECT * FROM Administrador");

            ResultSet rs = comandoSQL.executeQuery();

            if(rs!=null){
                while(rs.next()){
                    Administrador dto = new Administrador();
                    dto.setNome(rs.getString("nome"));
                    dto.setCpf(rs.getString("cpf"));
                    dto.setEmail(rs.getString("email"));
                    dto.setTelefone(rs.getString("telefone"));
                    dto.setAtivo(rs.getBoolean("ativo"));
                    dto.setCep(rs.getString("cep"));
                    dto.setRua(rs.getString("rua"));
                    dto.setBairro(rs.getString("bairro"));
                    dto.setGrupo(rs.getString("grupo"));

                    lista.add(dto);
                }
            }
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println(ex.getMessage());
        }
        return lista;
    }

    /**
     * Método para atualizar um Administrador no banco de dados
     * @param obj
     * @return
     */
    public static boolean atualizar(Administrador obj){
        Connection conexao = null;
        boolean retorno = false;

        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexao = DriverManager.getConnection(url, login, senha);

            PreparedStatement comandoSQL = conexao.prepareStatement("UPDATE administrador SET nome=?, cpf=?, email=?, telefone=?, ativo=?, cep=?, rua=?, bairro=?, grupo=? WHERE id=?");
            comandoSQL.setString(1, obj.getNome());
            comandoSQL.setString(2, obj.getCep());
            comandoSQL.setString(3, obj.getEmail());
            comandoSQL.setString(4, obj.getTelefone());
            comandoSQL.setBoolean(5, obj.getAtivo());
            comandoSQL.setString(6, obj.getCep());
            comandoSQL.setString(7, obj.getRua());
            comandoSQL.setString(8, obj.getBairro());
            comandoSQL.setString(9, obj.getGrupo());
            comandoSQL.setInt(10, obj.getId());

            int linhasAfetadas = comandoSQL.executeUpdate();
            if(linhasAfetadas>0){
                retorno = true;
            }
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println(ex.getMessage());
        }
        return retorno;
    }

    /**
     * Método para excluir um Administrador no banco de dados
     * @param id
     * @return
     */
    public static boolean excluir(int id){

        Connection conexao = null;
        boolean retorno = false;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            conexao = DriverManager.getConnection(url,login,senha);

            PreparedStatement comandoSQL = conexao.prepareStatement("DELETE FROM Administrador WHERE id=?");
            comandoSQL.setInt(1,id);

            int linhasAfetadas = comandoSQL.executeUpdate();
            if(linhasAfetadas>0){
                retorno = true;
            }

        } catch (ClassNotFoundException ex) {
            System.out.println(ex.getMessage());
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }

        return retorno;
    }
}
